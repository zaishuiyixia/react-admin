import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import styles from './index.module.less';
import { useStore } from '../store';
import NavHeader from './header';
import Footer from './footer';
import SiderMenu from './menu';


const {  Sider } = Layout;
export default function LayoutCon() {
    const { collapsed } = useStore();
   
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <SiderMenu />
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
    );
}
