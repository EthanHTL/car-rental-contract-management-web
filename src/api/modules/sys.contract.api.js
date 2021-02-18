
const baseUrl = "/api/v1/car/contract"
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    // 分页
    SYS_CON_FIND_PAGE(data = {}) {
        return request({
            url: baseUrl + '/find/page',
            method: 'post',
            data
        })
    },
    // 所有
    SYS_CON_FIND_ALL() {
        return request({
            url: baseUrl + '/find/all',
            method: 'post'
        })
    },
    // 创建
    SYS_CONTRACT_CREATE(data = {}) {
        return request({
            url: baseUrl + '/create',
            method: 'post',
            data
        })
    },
    // 待办
    SYS_CON_TASKS(data){
        return request({
            url: baseUrl + '/flow/tasks',
            method: 'post',
            data
        })
    },
    // 审批
    SYS_CON_COMPLETE(data = {}){
        return request({
            url: baseUrl + '/flow/task/complete',
            method: 'post',
            data
        })
    },
    // 审核历史
    SYS_CON_HIS_ALL(data){
        return request({
            url: baseUrl + '/activitiHistory/queryDoneTasks',
            method: 'post',
            data
        })
    },
    // 我的发起
    SYS_CON_MYSTART(data){
        return request({
            url: baseUrl + '/activitiHistory/queryMyStartTasks',
            method: 'post',
            data
        })
    }

})