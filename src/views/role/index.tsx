import { useRef } from "react";
import {
  Button,
  Table,
  Space,
  Form,
  Input,
  Modal,
  message,
  type TableColumnsType,
} from "antd";
import { useAntdTable } from "ahooks";
import api from "../../api/roleApi";
import type { IRole, IRoleSearchParams } from "../../types/api";
import { formatDateToChinese } from "../../utils";
import CreateRole from './CreateRole';
import SetPermission from "./SetPermission";

const Dashboard = () => {
  const roleRef = useRef<{
        openModal: (type: string, data?: IRole | { parentId: string }) => void;
    }>(null);
  const permissionRef = useRef<{
        openModal: (data?: IRole) => void;
    }>(null);
  const [form] = Form.useForm();

  const columns: TableColumnsType<IRole> = [
    { title: "角色名称", dataIndex: "roleName", key: "roleName" },
    { title: "备注", dataIndex: "remark", key: "remark" },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      render: (text) => {
        return formatDateToChinese(text);
      },
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      render: (text) => {
        return formatDateToChinese(text);
      },
    },
    {
      title: "操作",
      key: "action",
      width: "200",
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                handleEdit(record);
              }}
            >
              编辑
            </Button>
            <Button
              type="primary"
              onClick={() => {
                handleSetPermission(record);
              }}
            >
              设置权限
            </Button>
            <Button
              danger
              onClick={() => {
                handleDel(record._id);
              }}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  // 封装数据获取逻辑，添加 loading 状态
  const getRoleData = (
    { current, pageSize }: { current: number; pageSize: number },
    formData: IRoleSearchParams
  ) => {
    return api
      .getRoleList({ ...formData, pageNum: current, pageSize: pageSize })
      .then((data) => {
        console.log(data);
        return {
          list: data.list,
          total: data.page.total,
        };
      });
  };

  const { tableProps, search } = useAntdTable(getRoleData, {
    form, // 绑定 Ant Design Form
    defaultPageSize: 5,
  });
  
   const handleCreate = () => {
      roleRef.current?.openModal('create');
    };

  const handleEdit = (record: IRole) => {
    console.log("编辑", record);
    roleRef.current?.openModal('edit', record);
  };
  

  const handleSetPermission = (record: IRole) => {
    console.log("设置权限", record);
    permissionRef.current?.openModal(record);
  };

  const handleDel = (id: string) => {
    console.log("删除", id);
    Modal.confirm({
            title: '删除角色',
            content: '确定删除该角色吗？',
            okText: '确定',
            cancelText: '取消',
            async onOk() {
                await api.deleteRole({ _id: id });
                message.success('删除成功');
                search.submit();
            },
        });
  };

  return (
    <div className="protable-wrap role-wrap">
      <Form form={form} className="search-form" layout="inline">
        <Form.Item name="roleName" label="角色名称">
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" onClick={search.submit}>
              查询
            </Button>
            <Button type="primary" htmlType="reset" onClick={search.reset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className="wrap-table">
        <div className="header">
          <div className="title">角色列表</div>
          <div className="action">
            <Button onClick={handleCreate}>新增</Button>
          </div>
        </div>
        <Table bordered rowKey="_id" columns={columns} {...tableProps} />
      </div>
      {/* 创建角色组件 */}
      <CreateRole ref={roleRef} update={search.submit} />
      {/* 设置权限组件 */}
      <SetPermission ref={permissionRef} update={search.submit} />
    </div>
  );
};

export default Dashboard;
