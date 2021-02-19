export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    // 接口分页
    VEHICLE_TYPE_FIND_PAGE(data = {}) {
        return request({
            url: '/api/v1/car/vehicle/type/find/page',
            method: 'post',
            data
        })
    },
    VEHICLE_FIND_PAGE(data = {}) {
        return request({
            url: '/api/v1/car/vehicle/find/page',
            method: 'post',
            data
        })
    },


})