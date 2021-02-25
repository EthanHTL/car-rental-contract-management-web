import api from '@/api'

export default {
    namespaced: true,
    state: {
        deployList: []
    },
    actions: {
        // 接口增删改查
        async showDeploies({ commit, dispatch }, data = {}) {
            const res = await api.SYS_ACTIVITI_DEPLOYLIST(data)
            this.state.deployList = res
            return res;
        },async deleteDeploy({ commit, dispatch }, data = {}) {
            const res = await api.SYS_ACTIVITI_DEPLOY_DELETE(data)
            return res;
        },

    },
    mutations: {}
}