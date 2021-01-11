import api from '@/api'

export default {
    namespaced: true,
    state:{
        sexList:{}
    },
    actions:{
        async getSexs ({ state }) {
            const res = await api.SYS_USER_ALL_SEX()
            state.sexList = res
        },
        async checkUserName({ commit }, {
            username = '' } = {}) {
             const res = await api.SYS_USER_CHECK({ username })
             
             return res;
         },
         async register({ commit }, data){
            console.log("data",data);
            const res = await api.SYS_USER_REGISTER(data)
            console.log(res);
         }
    }
    
}