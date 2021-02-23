export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    // 角色查询所有
    SYS_ROLE_ALL(data = {}) {
        return request({
            url: '/api/v1/car/role/find/all',
            method: 'post',
            data
        })
    },
    // 角色权限保存
    SYS_ROLE_ASSIGN_PER(data = {}) {
        return request({
            url: '/api/v1/car/role/assign/permissions',
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
    // 角色拥有权限
    SYS_ROLE_PERMISSION(data = {}) {
        return request({
            url: '/api/v1/car/role/security/find',
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
    SYS_MENU_UPDATE(data = {}) {
        return request({
            url: '/api/v1/car/menu/update',
            method: 'post',
            data
        })
    },
    SYS_MENU_CREATE(data = {}) {
        return request({
            url: '/api/v1/car/menu/create',
            method: 'post',
            data
        })
    },
    SYS_MENU_DELETE(data = {}) {
        return request({
            url: '/api/v1/car/menu/delete',
            method: 'post',
            data
        })
    },

    // -------------api

    // 所有接口
    SYS_API_FIND_TREE(data = {}) {
        return request({
            url: '/api/v1/car/api/find/tree',
            method: 'post',
            data
        })
    }, 
    SYS_API_CREATE(data = {}) {
        return request({
            url: '/api/v1/car/api/create',
            method: 'post',
            data
        })
    },
    SYS_API_UPDATE(data = {}) {
        return request({
            url: '/api/v1/car/api/update',
            method: 'post',
            data
        })
    },
    SYS_API_DELETE(data = {}) {
        return request({
            url: '/api/v1/car/api/delete',
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