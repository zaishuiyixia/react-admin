import { useLocation, useRouteLoaderData } from 'react-router-dom';
import { useState, useEffect, type ReactNode } from 'react';
import { Breadcrumb } from 'antd';
import { findTreeNode } from '../../utils';

export default function BreadCrumb() {
    const { pathname } = useLocation();
    const [breadList, setBreadList] = useState<(string | ReactNode)[]>([]);
    const data = useRouteLoaderData('layout');

    useEffect(() => {
        const updateBreadCrumb = async () => {
            const list = findTreeNode(data.menuList, pathname, []);
            console.log("updateBreadCrumb", list);
            setBreadList([<a href="/welcome">首页</a>, ...list]);
        };
        updateBreadCrumb();
    }, [data.menuList, pathname]);
    
    return <Breadcrumb items={breadList.map((item) => ({ title: item }))} />;
}
