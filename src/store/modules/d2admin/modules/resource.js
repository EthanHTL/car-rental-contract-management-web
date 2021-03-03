import store from "@/store/index";

import api from '@/api'

export default {
  namespaced: true,
  state: {
    // 用户信息
    contractTempalteList: {},
   
  },
  actions: {
    async findContractPage({state, dispatch}, data) {
      const res =  await api.SYS_RESOURCE_CONTRACT_PAGE(data)
      this.state.contractTempalteList = res
      return res;
    },
    async findContractWholePage({state, dispatch}, data) {
      const res =  await api.SYS_RESOURCE_CONTRACT_WHOLE_PAGE(data)
      return res;
    },
    async saveContractTemplate({state, dispatch}, data) {
      const res =  await api.SYS_RESOURCE_CONTRACT_SAVE(data)
      return res;
    },
    async createTemplate({state, dispatch}, data) {
      const res =  await api.SYS_RESOURCE_TEMPLATE_CREATE(data)
      return res;
    },
    async deleteTemplate({state, dispatch}, data) {
      const res =  await api.SYS_RESOURCE_TEMPLATE_DELETE(data)
      return res;
    }
  }
}
