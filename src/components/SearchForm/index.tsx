import { Form, Space, Button } from 'antd';
import type { FormInstance } from 'antd/es/form';

interface SearchFormProps {
    form: FormInstance;
    initialValues?: Record<string, string | number | boolean>;
    submit: () => void;
    reset: () => void;
    children: React.ReactNode;
    layout: 'horizontal' | 'vertical' | 'inline';
}

export default function SearchForm(props: SearchFormProps) {
    return (
        <Form className="search-form" form={props.form} initialValues={props.initialValues} layout={props.layout}>
            {props.children}
            <Form.Item>
                <Space>
                    <Button type="primary" onClick={props.submit}>
                        搜索
                    </Button>
                    <Button type="default" onClick={props.reset}>
                        重置
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}
