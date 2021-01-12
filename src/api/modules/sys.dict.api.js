export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({

    // 字典分页
    SYS_DICT_FIND_PAGE(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/find/page',
            method: 'post',
            data
        })
    },
    // 字典获取
    SYS_DICT_GET(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/get',
            method: 'post',
            data
        })
    },
    // 字典插入
    SYS_DICT_INSERT(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/insert',
            method: 'post',
            data
        })
    },
    // 字典修改
    SYS_DICT_UPDATE(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/update',
            method: 'post',
            data
        })
    },
    // 字典删除 
    SYS_DICT_DELETE(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/destory',
            method: 'post',
            data
        })
    },
    // 查询字典选项
    SYS_DICT_SHOW_DETAIL(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/find/code',
            method: 'post',
            data
        })
    },
    // 选项获取
    SYS_DICT_DETAIL_GET(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/detail/get',
            method: 'post',
            data
        })
    },
    // 选项修改
    SYS_DICT_DETAIL_UPDATE(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/detail/update',
            method: 'post',
            data
        })
    },
    // 选项插入
    SYS_DICT_DETAIL_INSERT(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/detail/insert',
            method: 'post',
            data
        })
    },
    // 选项删除
    SYS_DICT_DETAIL_DELETE(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/detail/destroy',
            method: 'post',
            data
        })
    }
})
