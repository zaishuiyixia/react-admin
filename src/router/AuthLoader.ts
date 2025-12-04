import api from '../api';
import { getMenuPath } from '../utils';
export default async function AuthLoader() {
    const data = await api.getPermissionList();
    const { menuList } = data;
    const menuPathList = getMenuPath(menuList);
    console.log(menuList, 'menuList');
    // [ '/dashboard', '/dashboard/analysis' ]
    return {
        menuList,
        menuPathList,
        buttonList: data.buttonList,
    };
}
