import api from '@/api'

export default {
    namespaced: true,
    state: {
        menuTree: []
    },
    actions: {
        // 字典增删改查
        async showMenuTree({ commit, dispatch }, data = {}) {
            const res = await api.SYS_MENU_TREE()
            this.state.menuTree = res
            return res;
        },
        async updateMenu({ commit, dispatch }, data = {}) {
            const res = await api.SYS_ROLE_UPDATE(data)
            return res;
        },
        async createMenu({ commit, dispatch }, data = {}) {
            const res = await api.SYS_ROLE_CREATE(data)
            return res;
        },
        async deleteMenu({ commit, dispatch }, data = {}) {
            const res = await api.SYS_ROLE_DELETE(data)
            return res;
        }

    },
    mutations: {}
}