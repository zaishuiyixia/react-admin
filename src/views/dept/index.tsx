import { useState, useRef, useEffect, useCallback } from "react";
import {
  Button,
  Table,
  Space,
  Form,
  Input,
  Modal,
  type TableColumnsType,
} from "antd";
import type { IDept } from "../../types/api";
import api from "../../api";
import { formatDateToChinese } from "../../utils";
import CreateDept, { type CreateDeptRef } from './CreateDept';

const DepList = () => {
  const deptRef = useRef<CreateDeptRef>(null);
  const [data, setData] = useState<IDept[]>([]);
  const [loading, setLoading] = useState(false); // 新增：加载状态
  const [form] = Form.useForm();

  // 封装数据获取逻辑，添加 loading 状态
  const getDepthData = useCallback(async (searchParams = {}) => {
    setLoading(true);
    try {
      const result = await api.getDeptList(searchParams);
      setData(result); // 异步更新状态，避免同步触发渲染
    } catch (error) {
      console.error("获取部门列表失败：", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDepthData();
  }, []);

  const handleSubCreate = (id: string) => {
    console.log(id);
    deptRef.current?.openModal("create", { parentId: id });
  };

  const handleEdit = (record: IDept) => {
    console.log(record);
    deptRef.current?.openModal("edit", record);
  };

  const handleDel = (id: string) => {
    Modal.confirm({
      title: "删除部门",
      content: "确定删除该部门吗？",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        handleDelOk(id);
      },
    });
  };

  const handleDelOk = async (id: string) => {
    await api.deleteDept({ _id: id });
    getDepthData();
  };

  const handleReset = () => {
    form.resetFields();
    getDepthData();
  };

  const handleCreate = () => {
    console.log("新增");
    deptRef.current?.openModal("create");
  };
  
  const columns: TableColumnsType<IDept> = [
    {
      title: "部门名称",
      dataIndex: "deptName",
      key: "deptName",
      width: "200",
    },
    {
      title: "负责人",
      dataIndex: "userName",
      key: "userName",
      width: "150",
    },
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
                handleSubCreate(record._id);
              }}
            >
              新增
            </Button>
            <Button
              type="primary"
              onClick={() => {
                handleEdit(record);
              }}
            >
              编辑
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
  return (
    <div className="protable-wrap">
      <Form className="search-form" layout="inline" form={form}>
        <Form.Item name="deptName" label="部门名称">
          <Input placeholder="请输入部门名称" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="mr10" onClick={getDepthData}>
            查询
          </Button>
          <Button type="primary" htmlType="reset" onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className="wrap-table">
        <div className="header">
          <div className="title">部门列表</div>
          <div className="action">
            <Button onClick={handleCreate}>新增</Button>
          </div>
        </div>
        <Table rowKey="_id" columns={columns} dataSource={data} loading={loading} />
      </div>
      <CreateDept ref={deptRef} update={getDepthData} />
    </div>
  );
};

export default DepList;
