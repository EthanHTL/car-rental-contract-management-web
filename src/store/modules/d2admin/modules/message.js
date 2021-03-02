import api from '@/api'

export default {
    namespaced: true,
    state: {
        messageList: [],
    },
    actions: {
        async findPage({ state, dispatch },data) {
            const res = await api.SYS_MESSAGE_PAGE(data)
            this.state.messageList = res
            return res;
        },
    },
    mutations: {}
}
