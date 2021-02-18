import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
    path: '/system/manager',
    name: 'system-manager',
    meta,
    redirect: { name: 'system-manager-employee' },
    component: layoutHeaderAside,
    children: [
        { path: 'user', name: 'system-manager-user', component: _import('system/manager/user'), meta: { ...meta, title: '客户信息管理' } },
        { path: 'employee', name: 'system-manager-employee', component: _import('system/manager/employee'), meta: { ...meta, title: '员工信息管理' } },
        { path: 'role', name: 'system-manager-role', component: _import('system/manager/role'), meta: { ...meta, title: '角色管理' } },
        { path: 'menu', name: 'system-manager-menu', component: _import('system/manager/sysmenu'), meta: { ...meta, title: '菜单管理' } },
        { path: 'api', name: 'system-manager-menu', component: _import('system/manager/api'), meta: { ...meta, title: '接口管理' } },
        { path: 'dict', name: 'system-manager-dict', component: _import('system/manager/dict'), meta: { ...meta, title: '字典管理' } },
        { path: 'vehicle', name: 'system-manager-vehicle', component: _import('system/manager/vehicle'), meta: { ...meta, title: '车辆管理' } },
    ]
}

