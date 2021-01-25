export default {
    path: '/contract',
    title: '合同',
    icon: 'home',
    children: [
        { path: '/contract/template', title: '合同模板管理', icon: 'home' },
        { path: '/contract/index', title: '创建模板', icon: '' },
        { path: '/contract/sign', title: '签订合同', icon: '' },
        {
            path: '/contract/sign',
            title: '流程菜单',
            icon: '',
            children:[
                { path: '/contract/sign', title: '在线绘图', icon: '' },
                { path: '/contract/sign', title: '流程部署部署', icon: '' },
                { path: '/contract/sign', title: '流程实例列表', icon: '' },
                { path: '/contract/sign', title: '流程用户', icon: '' },
                { path: '/contract/sign', title: '流程用户组', icon: '' },
            ]
            
        },
        {
            path: '/contract/sign',
            title: '待办已办',
            icon: '',
            children:[
                { path: '/contract/sign', title: '合同列表', icon: '' },
                { path: '/contract/sign', title: '我的待办', icon: '' },
                { path: '/contract/sign', title: '我的已办', icon: '' },
            ]
            
        },

    ]
}