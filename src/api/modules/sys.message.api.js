export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    // 合同分页
    SYS_MESSAGE_PAGE(data = {}) {
        return request({
            url: '/api/v1/car/usermesssage/find/page',
            method: 'post',
            data
        })
    }
})