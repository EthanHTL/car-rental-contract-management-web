export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    // 角色查询所有
    SYS_ACTIVITI_DEPLOYLIST(data = {}) {
        return request({
            url: '/api/v1/car/processDefinition/getDeployments',
            method: 'post',
            data
        })
    },
    SYS_ACTIVITI_DEPLOY_DELETE(data = {}) {
        return request({
            url: '/api/v1/car/contract/flow/deployment/delete?deploymentId='
            +data.id,
            method: 'post'
        })
    },
})