import { useState, forwardRef, useImperativeHandle } from "react";
import { Form, Modal, Input, message } from "antd";
import type { IRole } from "../../types/api";
import api from '../../api/roleApi';

// 定义 ref 暴露的 API 类型（单独提取，更清晰）
export interface CreateRoleRef {
  openModal: (type: string, data?: IRole | { parentId: string }) => void;
}

// 组件 props 不再包含 ref，改为通过 forwardRef 接收 ref
interface IProps {
  update: () => void;
}

const CreateRole = forwardRef<CreateRoleRef, IProps>((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<string>("create");
  const [form] = Form.useForm();

  const openModal = (type: string, data?: IRole | { parentId: string }) => {
    setAction(type);
    setIsModalOpen(true);
    if (data) {
      form.setFieldsValue(data);
    }
  };

  // 自定义 ref 暴露的方法，父组件只能通过这些方法操作 DOM
  useImperativeHandle(ref, () => ({
    openModal,
  }));

  const handleOk = async () => {
        const valid = await form.validateFields();
        if (!valid) return;
        if (action === 'create') {
            await api.createRole(form.getFieldsValue());
            message.success('创建成功');
        } else if (action === 'edit') {
            await api.updateRole(form.getFieldsValue());
            message.success('编辑成功');
        }
        handleCancel();
        props.update();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

  return (
    <>
      <Modal
        title={action === "create" ? "新增角色" : "编辑角色"}
        open={isModalOpen}
        width={800}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} labelAlign="right" labelCol={{ span: 4 }}>
          <Form.Item hidden name="_id">
            <Input />
          </Form.Item>
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[{ required: true, message: "请输入角色名称" }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default CreateRole;
