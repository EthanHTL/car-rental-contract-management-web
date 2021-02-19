import api from '@/api'

export default {
  namespaced: true,
  state: {
    allType: {},
    vehicleList:[]
  },
  actions: {
    async typeFindPage({state, dispatch}, data) {
        const res = await api.VEHICLE_TYPE_FIND_PAGE(data)
        state.allType = res
        return res;
    },
    async vehicleFindPage({state, dispatch}, data) {
        const res = await api.VEHICLE_FIND_PAGE(data)
        state.vehicleList = res
        return res;
    },
  }
}

