import api from '@/api'

export default {
    namespaced: true,
    state: {
        apiList: []
    },
    actions: {
        // 接口增删改查
        async showApis({ commit, dispatch }, data = {}) {
            console.log(data);
            const res = await api.SYS_API_FIND_PAGE(data)
            this.state.apiList = res
            return res;
        },
        async createApi({ commit, dispatch }, data = {}) {
            const res = await api.SYS_API_CREATE(data)
            return res;
        },
        async updateApi({ commit, dispatch }, data = {}) {
            const res = await api.SYS_API_UPDATE(data)
            return res;
        },
        async deleteApi({ commit, dispatch }, data = {}) {
            const res = await api.SYS_API_DELETE(data)
            return res;
        },
        // 树
        async showApisTree({ commit, dispatch }, data = {}) {
            const res = await api.SYS_API_FIND_TREE(data)
            this.state.apiList = res
            return res;
        },

    },
    mutations: {}
}