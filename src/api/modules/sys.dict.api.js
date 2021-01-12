export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({

    SYS_DICT_FIND_PAGE(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/find/page',
            method: 'post',
            data
        })
    },
    SYS_DICT_GET(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/get',
            method: 'post',
            data
        })
    },
    SYS_DICT_INSERT(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/insert',
            method: 'post',
            data
        })
    },
    SYS_DICT_UPDATE(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/update',
            method: 'post',
            data
        })
    },
    SYS_DICT_DELETE(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/destory',
            method: 'post',
            data
        })
    },
    SYS_DICT_SHOW_DETAIL(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/find/code',
            method: 'post',
            data
        })
    },
    SYS_DICT_DETAIL_GET(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/detail/get',
            method: 'post',
            data
        })
    },
    SYS_DICT_DETAIL_UPDATE(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/detail/update',
            method: 'post',
            data
        })
    },
    SYS_DICT_DETAIL_INSERT(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/detail/insert',
            method: 'post',
            data
        })
    },
    SYS_DICT_DETAIL_DELETE(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/detail/destroy',
            method: 'post',
            data
        })
    }
})
