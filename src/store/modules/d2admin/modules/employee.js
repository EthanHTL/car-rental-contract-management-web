import api from '@/api'

export default {
    namespaced: true,
    state: {
        dict: []
    },
    actions: {
        async findAllEmployee({ state, dispatch }) {
            const res = await api.SYS_EMPLOYEE_PAGE()
            console.log(res)
            return res;
        },
    },
    mutations: {}
}
