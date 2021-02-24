import api from '@/api'

export default {
    namespaced: true,
    state: {
        employee: [],
        userList: [],
    },
    actions: {
        async findAllEmployee({ state, dispatch },data) {
            const res = await api.SYS_EMPLOYEE_PAGE(data)
            this.state.employee = res
            return res;
        },
        async findUserPage({ state, dispatch },data) {
            const res = await api.SYS_USER_PAGE(data)
            this.state.userList = res
            return res;
        },
    },
    mutations: {}
}
