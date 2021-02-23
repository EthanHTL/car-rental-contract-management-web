export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    // 合同模板分页
    SYS_RESOURCE_CONTRACT_PAGE(data = {}) {
        return request({
            url: '/api/v1/car/resource/contract/template/find/page',
            method: 'post',
            data
        })
    },
    SYS_RESOURCE_CONTRACT_WHOLE_PAGE(data = {}) {
        return request({
            url: '/api/v1/car/resource/contract/template/whole/find/page',
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
    // 合同模板保存
    SYS_RESOURCE_TEMPLATE_CREATE(data = {}) {
        return request({
            url: '/api/v1/car/resource/contract/template/create',
            method: 'post',
            data
        })
    }
})