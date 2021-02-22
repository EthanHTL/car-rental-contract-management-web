import api from '@/api'

export default {
    namespaced: true,
    state: {
        roles: [],
        rolePermissions:[]
    },
    actions: {
        // 字典增删改查
        async insertRole({ commit, dispatch }, data = {}) {
            const res = await api.SYS_Role_INSERT(data)
            return res;
        },
        async updateRole({ commit, dispatch }, data = {}) {
            const res = await api.SYS_Role_UPDATE(data)
            return res;
        },
        async deleteRole({ commit, dispatch }, data = {}) {
            const res = await api.SYS_Role_DELETE(data)
            return res;
        },
        async showRole({ commit, dispatch }, data = {}) {
            const res = await api.SYS_ROLE_ALL(data)
            this.state.roles = res
            return res;
        },
        async getRolePermission({ state, dispatch }, data = {}) {
            const res = await api.SYS_ROLE_PERMISSION(data)
            state.rolePermissions = res
            return res;
        }
    },
    mutations: {}
}