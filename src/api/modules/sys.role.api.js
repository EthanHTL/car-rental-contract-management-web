export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    // 角色查询所有
    SYS_ROLE_PAGE(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/detail/destroy',
            method: 'post',
            data
        })
    },
    // 角色更新
    SYS_ROLE_UPDATE(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/detail/destroy',
            method: 'post',
            data
        })
    },
    // 角色插入
    SYS_ROLE_INSERT(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/detail/destroy',
            method: 'post',
            data
        })
    },
    // 角色删除
    SYS_ROLE_DELETE(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/detail/destroy',
            method: 'post',
            data
        })
    },
    // 角色分配权限
    SYS_ROLE_DELETE(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/detail/destroy',
            method: 'post',
            data
        })
    },
    // 角色删除
    SYS_ROLE_DELETE(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/detail/destroy',
            method: 'post',
            data
        })
    }
})