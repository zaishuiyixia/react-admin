import { useEffect } from 'react';
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import styles from "./index.module.less";
import api from "../api/index";
import { useStore } from "../store";
import NavHeader from "./header";
import Footer from "./footer";
import SiderMenu from "./menu";

const { Sider } = Layout;
export default function LayoutCon() {
  const { collapsed, updateUserInfo } = useStore();

  useEffect(() => {
    const getUserInfoData = async () => {
      const data = await api.getUserInfo();
      updateUserInfo(data);
    };
    getUserInfoData();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
