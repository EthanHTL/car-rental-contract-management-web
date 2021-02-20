export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    // 接口分页
    VEHICLE_TYPE_FIND_PAGE(data = {}) {
        return request({
            url: '/api/v1/car/vehicle/type/find/page',
            method: 'post',
            data
        })
    },
    VEHICLE_TYPE_CREATE(data = {}) {
        return request({
            url: '/api/v1/car/vehicle/type/create',
            method: 'post',
            data
        })
    },
    VEHICLE_TYPE_UPDATE(data = {}) {
        return request({
            url: '/api/v1/car/vehicle/type/update',
            method: 'post',
            data
        })
    },
    VEHICLE_TYPE_DELETE(data = {}) {
        return request({
            url: '/api/v1/car/vehicle/type/delete',
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
    VEHICLE_CREATE(data = {}) {
        return request({
            url: '/api/v1/car/vehicle/create',
            method: 'post',
            data
        })
    },
    VEHICLE_UPDATE(data = {}) {
        return request({
            url: '/api/v1/car/vehicle/update',
            method: 'post',
            data
        })
    },
    VEHICLE_DELETE(data = {}) {
        return request({
            url: '/api/v1/car/vehicle/delete',
            method: 'post',
            data
        })
    }

})