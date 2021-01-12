export default {
    path: '/system/manager',
    title: '系统管理',
    icon: 'home',
    children: [
        { path: '/system/manager/user',title: '客户信息管理',icon: 'home' },
        { path: '/system/manager/employee',title: '员工信息管理',icon: '' },
        { path: '/system/manager/role',title: '角色管理',icon: '' },
        { path: '/system/manager/menu',title: '菜单管理',icon: '' },
        { path: '/system/manager/api',title: '接口管理',icon: '' },
        { path: '/system/manager/dict',title: '字典管理',icon: '' },
        
    ]
}