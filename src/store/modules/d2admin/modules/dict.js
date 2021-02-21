import api from '@/api'

export default {
    namespaced: true,
    state: {
        dict: []
    },
    actions: {
        // 字典增删改查
        async insertDict({ commit, dispatch }, data = {}) {
            const res = await api.SYS_DICT_INSERT(data)
            return res;
        },
        async updateDict({ commit, dispatch }, data = {}) {
            const res = await api.SYS_DICT_UPDATE(data)
            return res;
        },
        async deleteDict({ commit, dispatch }, data = {}) {
            const res = await api.SYS_DICT_DELETE(data)
            return res;
        },
        async showDict({ state, dispatch }, data = {}) {
            const res = await api.SYS_DICT_FIND_PAGE(data)
            state.dict = res
            return res;
        },
        // 选项操作
        async showDictDetail({ commit, dispatch }, data = {}) {
            const res = await api.SYS_DICT_SHOW_DETAIL(data)
            return res;
        },
        async insertDetail({ commit, dispatch }, data = {}) {
            const res = await api.SYS_DICT_DETAIL_INSERT(data)
            return res;
        },
        async updateDetail({ commit, dispatch }, data = {}) {
            const res = await api.SYS_DICT_DETAIL_UPDATE(data)
            return res;
        },
        async deleteDetail({ commit, dispatch }, data = {}) {
            const res = await api.SYS_DICT_DETAIL_DELETE(data)
            return res;
        },
        async getDict({ commit, dispatch }, data = {}) {
            const res = await api.SYS_DICT_DETAIL_GET(data)
            return res;
        },
    },
    mutations: {}
}