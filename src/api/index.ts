import request from '../utils/request';
import type {
    ILoginParams,
    IDeptSearchParams,
    IDept,
    ICreateMenuParams,
    IUpdateMenuParams,
    IMenu,
    IUser,
    ISearchParams
} from '../types/api';

export default {
    // 登录
    login(params: ILoginParams) {
        return request.post('/users/login', params);
    },

    // 获取部门列表
    getDeptList(params?: IDeptSearchParams) {
        return request.get<IDept[]>('/dept/list', params);
    },

    // 添加部门
    createDept(params: IDept) {
        return request.post('/dept/create', params);
    },
    // 修改部门
    updateDept(params: IDept) {
        return request.post('/dept/edit', params);
    },
    // 删除部门
    deleteDept(params: { _id: string }) {
        return request.post('/dept/delete', params);
    },
    // 获取用户
    getUserList() {
        return request.get('/users/list');
    },
    getAllUserList() {
        return request.get<IUser[]>('/users/all/list');
    },
    // 获取角色
    getRoleList() {
        return request.get('/roles/list');
    },
    // 创建菜单参数
    createMenu(params: ICreateMenuParams) {
        return request.post('/menu/create', params);
    },
    // 更新菜单参数
    updateMenu(params: IUpdateMenuParams) {
        return request.post('/menu/edit', params);
    },
    // 菜单list
    getMenuList(params?: ISearchParams) {
        return request.get<IMenu[]>('/menu/list', params);
    },
    // 删除菜单
    deleteMenu(params: { _id: string }) {
        return request.post('/menu/delete', params);
    },
};
