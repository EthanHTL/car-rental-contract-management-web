import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }
// 合同模板 (合同创建  合同组装)
// 签合同 合同管理（只能管理自己业务的合同）
// 
export default {
    path: '/contract',
    name: 'contract',
    meta,
    redirect: { name: 'contract-manager' },
    component: layoutHeaderAside,
    children: [
      { path: 'template', name: 'contract-tempalte', component: _import('contract/template'), meta: { ...meta, title: '合同模板' } },
      { path: 'index', name: 'contract-manager', component: _import('contract/index'), meta: { ...meta, title: '合同管理' } }
    ]
  }