import api from '@/api'

export default {
    namespaced: true,
    state: {
        employee: []
    },
    actions: {
        async findAllEmployee({ state, dispatch },data) {
            const res = await api.SYS_EMPLOYEE_PAGE(data)
            console.log(res)
            this.state.employee = res
            return res;
        },
    },
    mutations: {}
}
