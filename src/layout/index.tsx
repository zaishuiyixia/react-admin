import { Layout, Watermark } from 'antd';
import { Navigate, Outlet, useLocation, useRouteLoaderData } from 'react-router-dom';
const { Sider } = Layout;
import api from '../api/index';
import styles from './index.module.less';
import NavHeader from './header';
import Footer from './footer';
import SiberMenu from './menu';
import { useStore } from '../store';
import { router } from '../router';
import { searchRoute } from '../utils';
import { useEffect } from 'react';

export default function LayoutCon() {
    const { collapsed, updateUserInfo } = useStore();
    const { pathname } = useLocation();
    console.log(useLocation(), 'useLocation');
    const getUserInfoData = async () => {
        const data = await api.getUserInfo();
        updateUserInfo(data);
    };
    useEffect(() => {
        getUserInfoData();
    }, []);
    const data = useRouteLoaderData('layout');
    console.log(data, 'data-----');
    const staticPathList = ['/welcome', '/403', '/404'];

    const route = searchRoute(pathname, router);
    console.log(route, '-----');
    // pathname
    if (route && route.meta?.auth) {
        // 需要鉴权 处理自己的逻辑
    }
    // 判断当前路由是否在菜单中
    if (!data.menuPathList.includes(pathname) && !staticPathList.includes(pathname)) {
        return <Navigate to="/403" />;
    }
    return (
        <Watermark content="React 19">
            <Layout style={{ minHeight: '100vh' }}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <SiberMenu />
                </Sider>
                <Layout>
                    <NavHeader />
                    <div className={styles.content}>
                        <div className={styles.wrapper}>
                            <Outlet />
                        </div>
                        <Footer></Footer>
                    </div>
                </Layout>
            </Layout>
        </Watermark>
    );
}
