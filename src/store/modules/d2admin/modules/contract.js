import api from '@/api'

export default {
    namespaced: true,
    state: {
    },
    actions: {
        async createContract({ state, dispatch },data) {
            const res = await api.SYS_CONTRACT_CREATE(data)
            return res;
        },
        async getAll({ state, dispatch },) {
            const res = await api.SYS_CON_FIND_ALL()
            return res;
        },
        async myTaskList({ state, dispatch },) {
            const res = await api.SYS_CON_TASKS()
            return res;
        },
        
        async completeTask({ dispatch },{
            taskId="",
            state='',
            remark=''
        } = {}) {
            const res = await api.SYS_CON_COMPLETE({taskId,state,remark})
            return res;
        },
        async myHistory({ state, dispatch },) {
            const res = await api.SYS_CON_HIS_ALL()
            return res;
        },
        async myStart({ state, dispatch },) {
            const res = await api.SYS_CON_MYSTART()
            return res;
        },
    },
    mutations: {}
}
