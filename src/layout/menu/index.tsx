import { Menu } from "antd";
import type { MenuProps } from "antd";
import * as Icons from "@ant-design/icons";
import { useStore } from "../../store";
import styles from "./index.module.less";
import { useLocation, useNavigate, useRouteLoaderData } from "react-router-dom";
import React, { useState, useEffect } from "react";
import type { IMenu } from "../../types/api";
import logo from "../../assets/images/logo.png";

type MenuItem = Required<MenuProps>["items"][number];
type IconNames = keyof typeof Icons;

const SiberMenu = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [menuList, setMenuList] = useState<MenuItem[]>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { collapsed, isDark } = useStore();
  const data = useRouteLoaderData("layout");
  const menuClick = ({ key }: { key: string }) => {
    navigate(key);
    setSelectedKeys([key]);
  };

  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children,
    } as MenuItem;
  }

  function createIcon(name?: IconNames): React.ReactNode {
    if (!name) return null;
    const IconComponent = Icons[name] as React.ComponentType;
    if (!IconComponent) return null;
    return <IconComponent />;
  }

  const getTreeMenu = (menuList: IMenu[], treeList: MenuItem[] = []) => {
    menuList.forEach((item) => {
      if (item.menuType === 1 && item.menuState === 1) {
        if (item.buttons) {
          const icon =
            item.icon && Icons[item.icon as IconNames]
              ? createIcon(item.icon as IconNames)
              : undefined;
          treeList.push(getItem(item.menuName, item.path, icon));
        } else {
          const icon =
            item.icon && Icons[item.icon as IconNames]
              ? createIcon(item.icon as IconNames)
              : undefined;
          treeList.push(
            getItem(
              item.menuName,
              item.path,
              icon,
              getTreeMenu(item.children || [])
            )
          );
        }
      }
    });
    return treeList;
  };

  useEffect(() => {
    const updateMenuState = async () => {
      const treeMenuList = getTreeMenu(data.menuList);
      setMenuList(treeMenuList);
      setSelectedKeys([pathname]);
    };
    updateMenuState();
  }, [data.menuList, pathname]);

  return (
    <div className={styles.navHeader}>
      <div className={styles.logo}>
        <img src={logo} className={styles.logo} alt="" />
        {collapsed ? "" : <span>企业中台</span>}
      </div>
      <Menu
        mode="inline"
        theme={isDark ? "light" : "dark"}
        onClick={menuClick}
        inlineCollapsed={collapsed}
        selectedKeys={selectedKeys}
        items={menuList}
      />
    </div>
  );
};

export default SiberMenu;
