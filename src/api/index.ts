import reuquest from '../utils/request';
import type { ILoginParams, IDeptSearchParams, IDept, IUser } from '../types/api';

export default {
    // 登录
    login(params: ILoginParams) {
        return reuquest.post('/users/login', params);
    },

    // 获取部门列表
    getDeptList(params?: IDeptSearchParams) {
        return reuquest.get<IDept[]>('/dept/list', params);
    },

    // 添加部门
    createDept(params: IDept) {
        return reuquest.post('/dept/create', params);
    },
    // 修改部门
    updateDept(params: IDept) {
        return reuquest.post('/dept/edit', params);
    },
    // 删除部门
    deleteDept(params: { _id: string }) {
        return reuquest.post('/dept/delete', params);
    },
    // 获取用户
    getUserList() {
        return reuquest.get('/users/list');
    },
    getAllUserList() {
        return reuquest.get<IUser[]>('/users/all/list');
    },
    // 获取角色
    getRoleList() {
        return reuquest.get('/roles/list');
    },
};
