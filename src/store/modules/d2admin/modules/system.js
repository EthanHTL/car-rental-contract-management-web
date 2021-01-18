import api from '@/api'

export default {
    namespaced: true,
    state: {
        myEditor: ""
    },
    actions: {
        // 字典增删改查
    },
    mutations: {
        UPDATE_EDITOR(state,ue){
            state.myEditor = ue
        }
    }
}