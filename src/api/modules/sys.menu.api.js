export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    // 角色查询所有
    SYS_MENU_ALL(data = {}) {
        return request({
            url: '/api/v1/car/role/find/all',
            method: 'post',
            data
        })
    },
})