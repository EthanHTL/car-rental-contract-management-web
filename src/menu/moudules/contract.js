export default {
    path: '/contract',
    title: '合同',
    icon: 'home',
    children: [
        { path: '/contract/template', title: '合同模板管理', icon: 'home' },
        { path: '/contract/index', title: '创建模板', icon: '' },
        { path: '/contract/sign', title: '签订合同', icon: '' },
        {
            path: '/contract/finish',
            title: '待办已办',
            icon: '',
            children:[
                { path: '/contract/finish/list', title: '我的发起', icon: '' },
                { path: '/contract/finish/backlog', title: '我的待办', icon: '' },
                { path: '/contract/finish/done', title: '我的已办', icon: '' },
            ]
            
        },

    ]
}