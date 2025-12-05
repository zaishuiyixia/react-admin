import { useRouteLoaderData } from 'react-router-dom';
import { Button, type ButtonProps } from 'antd';

interface AuthButtonProps extends ButtonProps {
    auth?: string;
    children: React.ReactNode;
}

export default function AuthButton(props: AuthButtonProps) {
    const data = useRouteLoaderData('layout');
    const { buttonList } = data as { buttonList: string[] };
    
    if (!props.auth) {
        return null;
    }
    
    if (buttonList.includes(props.auth)) {
        return <Button {...props}>{props.children}</Button>;
    }
    
    return null;
}
