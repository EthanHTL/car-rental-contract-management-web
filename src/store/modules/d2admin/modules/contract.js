import api from '@/api'

export default {
    namespaced: true,
    state: {
    },
    actions: {
        async createContract({ state, dispatch },data) {
            const res = await api.SYS_CONTRACT_CREATE2(data)
            return res;
        },
        async getAll({ state, dispatch },) {
            const res = await api.SYS_CON_FIND_ALL()
            console.log(res);
            return res;
        },
    },
    mutations: {}
}
