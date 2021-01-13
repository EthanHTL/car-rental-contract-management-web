export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    // 角色查询所有
    SYS_ROLE_ALL(data = {}) {
        return request({
            url: '/api/v1/car/role/find/all',
            method: 'post',
            data
        })
    },
    // 角色更新
    SYS_ROLE_UPDATE(data = {}) {
        return request({
            url: '/api/v1/car/role/update',
            method: 'post',
            data
        })
    },
    // 角色插入
    SYS_ROLE_INSERT(data = {}) {
        return request({
            url: '/api/v1/car/role/insert',
            method: 'post',
            data
        })
    },
    // 角色删除
    SYS_ROLE_DELETE(data = {}) {
        return request({
            url: '/api/v1/car/role/destory',
            method: 'post',
            data
        })
    },
    // 角色分配权限
    SYS_ROLE_DELETE(data = {}) {
        return request({
            url: '/api/v1/car/role/assign/permissions',
            method: 'post',
            data
        })
    },
    // 角色删除
    SYS_ROLE_DELETE(data = {}) {
        return request({
            url: '/api/v1/car/role',
            method: 'post',
            data
        })
    },
    // ----------menu
    // 菜单树
    SYS_MENU_TREE(data = {}) {
        return request({
            url: '/api/v1/car/menu/find/tree',
            method: 'post',
            data
        })
    },
    SYS_ROLE_DELETE(data = {}) {
        return request({
            url: '/api/v1/car/role',
            method: 'post',
            data
        })
    },

    // -------------api

    // 所有接口
    SYS_API_FIND_ALL(data = {}) {
        return request({
            url: '/api/v1/car/api/find/all',
            method: 'post',
            data
        })
    },
    // 接口分页
    SYS_API_FIND_PAGE(data = {}) {
        return request({
            url: '/api/v1/car/api/find/page',
            method: 'post',
            data
        })
    },


})