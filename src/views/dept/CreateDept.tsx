import { useEffect, useCallback } from "react";
import { Form, Modal, Input, Select, TreeSelect, message } from "antd";
import { useState, forwardRef, useImperativeHandle } from "react";
import type { IDept, IUser } from "../../types/api";
import api from "../../api";

// 定义 ref 暴露的 API 类型（单独提取，更清晰）
export interface CreateDeptRef {
  openModal: (type: string, data?: IDept | { parentId: string }) => void;
}

// 组件 props 不再包含 mref，改为通过 forwardRef 接收 ref
interface IProps {
  update: () => void;
}

const CreateDept = forwardRef<CreateDeptRef, IProps>((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deptList, setDeptList] = useState<IDept[]>([]);
  const [userList, setUserList] = useState<IUser[]>([]);
  const [action, setAction] = useState<string>("create");
  const [form] = Form.useForm();

  // 获取部门列表
  const getDepthData = useCallback(async () => {
    try {
      const data = await api.getDeptList();
      setDeptList(data); // 异步更新状态
    } catch (error) {
      console.error("获取部门列表失败：", error);
    }
  }, []);

  useEffect(() => {
    // 获取用户列表
    const fetchUserList = async () => {
      try {
        const result = await api.getAllUserList();
        setUserList(result);
      } catch (error) {
        console.error("获取部门列表失败：", error);
      }
    };
    
    fetchUserList();
  }, []);

  const handleOk = async () => {
    const valid = await form.validateFields();
    if (!valid) return;
    if (action === "create") {
      await api.createDept(form.getFieldsValue());
      message.success("创建成功");
    } else if (action === "edit") {
      await api.updateDept(form.getFieldsValue());
      message.success("编辑成功");
    }
    handleCancel();
    props.update();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const openModal = (type: string, data?: IDept | { parentId: string }) => {
    setAction(type);
    setIsModalOpen(true);
    getDepthData();
    if (data) {
      form.setFieldsValue(data);
    }
  };

  // 自定义 ref 暴露的方法，父组件只能通过这些方法操作 DOM
  useImperativeHandle(ref, () => ({
    openModal,
  }));

  return (
    <>
      <Modal
        title="创建部门"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} labelCol={{ span: 4 }}>
          <Form.Item label="上级部门" name="parentId">
            <TreeSelect
              showSearch
              placeholder="请选择上级部门"
              allowClear
              treeDefaultExpandAll
              treeData={deptList}
              fieldNames={{ label: "deptName", value: "_id" }}
            />
          </Form.Item>

          <Form.Item
            label="部门名称"
            name="deptName"
            rules={[{ required: true, message: "请输入部门名称" }]}
          >
            <Input placeholder="请输入部门名称" />
          </Form.Item>

          <Form.Item
            label="负责人"
            name="userName"
            rules={[{ required: true, message: "请选择负责人" }]}
          >
            <Select
              options={userList.map((item: IUser) => ({
                value: item._id,
                label: item.userName,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default CreateDept;
