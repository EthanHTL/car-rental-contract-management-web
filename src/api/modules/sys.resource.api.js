export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    // 合同模板分页
    SYS_RESOURCE_CONTRACT_PAGE(data = {}) {
        return request({
            url: '/api/v1/car/resource/contract/template/find/page',
            method: 'post',
            data
        })
    },
    // 合同模板保存
    SYS_RESOURCE_CONTRACT_SAVE(data = {}) {
        return request({
            url: '/api/v1/car/resource/contract/template/update',
            method: 'post',
            data
        })
    },
    SYS_CONTRACT_CREATE2(data = {}) {
        return request({
            url: '/api/v1/car/dictionary/find/page',
            method: 'post',
            data
        })
    },
})