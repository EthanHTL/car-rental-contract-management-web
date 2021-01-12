import api from '@/api'

export default {
    namespaced: true,
    state: {
        dict: []
    },
    actions: {
        async showDict({ commit, dispatch }, data = {}) {
            // console.log(data);
            const res = await api.SYS_DICT_FIND_PAGE(data)
            return res;
        }
    },
    mutations: {}
}