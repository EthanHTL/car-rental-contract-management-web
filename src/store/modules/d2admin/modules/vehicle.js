import api from '@/api'

export default {
  namespaced: true,
  state: {
    allType: {},
    vehicleList:[]
  },
  actions: {

    // 类型
    async typeFindPage({state, dispatch}, data) {
      const res = await api.VEHICLE_TYPE_FIND_PAGE(data)
      state.allType = res
      return res;
    },
    async checkVehicleByNum({state, dispatch}, data) {
      const res = await api.VEHICLE_GET(data)
      return res;
    },
    async typeCreate({state, dispatch}, data) {
      const res = await api.VEHICLE_TYPE_CREATE(data)
      return res;
    },
    async typeUpdate({state, dispatch}, data) {
      const res = await api.VEHICLE_TYPE_UPDATE(data)
      return res;
    },
    async typeDelete({state, dispatch}, data) {
      const res = await api.VEHICLE_TYPE_DELETE(data)
      return res;
    },
// 车辆
    async vehicleFindPage({state, dispatch}, data) {
        const res = await api.VEHICLE_FIND_PAGE(data)
        state.vehicleList = res
        return res;
    },
    async vehicleCreate({state, dispatch}, data) {
      const res = await api.VEHICLE_CREATE(data)
      return res;
    },
    async vehicleUpdate({state, dispatch}, data) {
      const res = await api.VEHICLE_UPDATE(data)
      return res;
    },
    async vehicleDelete({state, dispatch}, data) {
      const res = await api.VEHICLE_DELETE(data)
      return res;
    }

  }
}

