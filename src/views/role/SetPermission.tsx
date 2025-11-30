import { useState, useImperativeHandle, useEffect } from "react";
import { Form, Modal, Tree, message } from "antd";
import type { TreeProps } from "antd";
import type { IMenu, IPermission, IRole } from "../../types/api";
import api from "../../api";
import roleApi from "../../api/roleApi";

// 定义 ref 暴露的 API 类型
export interface SetPermissionRef {
  openModal: (data?: IRole) => void;
}

// 定义组件 props 类型
interface IProps {
  ref?: React.Ref<SetPermissionRef>;
  update: () => void;
}

const SetPermission = ({ ref, update }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [treeData, setTreeData] = useState<IMenu[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [permission, setPermission] = useState<IPermission>();
  const [roleInfo, setRoleInfo] = useState<IRole>();

  // 初始化数据
  useEffect(() => {
    const initMenuList = async () => {
      try {
        const data = await api.getMenuList();
        setTreeData(data);
      } catch (error) {
        console.error("获取菜单列表失败：", error);
      }
    };
    initMenuList();
  }, []);

  const openModal = (data?: IRole) => {
    console.log("data", data);
    setRoleInfo(data);
    setIsModalOpen(true);
    setCheckedKeys(data?.permissionList.checkedKeys || []);
    if (data) {
      setPermission({
        _id: data?._id || "",
        permissionList: {
          checkedKeys: data?.permissionList.checkedKeys || [],
          halfCheckedKeys: data?.permissionList.halfCheckedKeys || []
        }
      });
    }
  };

  // 自定义 ref 暴露的方法，父组件只能通过这些方法操作 DOM
  useImperativeHandle(ref, () => ({
    openModal,
  }));

  const handleCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    setCheckedKeys(checkedKeys as React.Key[]);
    console.log("onCheck", checkedKeys, info);
    const checkedKeysTemp: string[] = [];
    const halfCheckedKeysTemp: string[] = [];
    (info.checkedNodes as IMenu[]).forEach((node) => {
      if (node.menuType === 2) {
        checkedKeysTemp.push(node._id);
      } else {
        halfCheckedKeysTemp.push(node._id);
      }
    });
    setPermission({
      _id: roleInfo?._id || "",
      permissionList: {
        checkedKeys: checkedKeysTemp,
        halfCheckedKeys: halfCheckedKeysTemp.concat(
          (info.halfCheckedKeys || []).map((key) => String(key))
        ),
      },
    });
  };

  const handleOk = async () => {
    if (permission) {
      await roleApi.updatePermission(permission);
      message.success("设置成功");
    }
    update();
    handleCancel();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title="设置权限"
      width={600}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign="right" labelCol={{ span: 4 }}>
        <Form.Item label="角色名称"></Form.Item>
        <Form.Item label="权限">
          <Tree
            checkable
            defaultExpandAll
            onCheck={handleCheck}
            checkedKeys={checkedKeys}
            treeData={treeData}
            fieldNames={{
              key: "_id",
              children: "children",
              title: "menuName",
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SetPermission;
