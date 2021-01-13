import api from '@/api'

export default {
    namespaced: true,
    state: {
        apiList: []
    },
    actions: {
        // 接口增删改查
        async showApis({ commit, dispatch }, data = {}) {
            const res = await api.SYS_API_FIND_PAGE(data)
            this.state.apiList = res
            return res;
        },

    },
    mutations: {}
}