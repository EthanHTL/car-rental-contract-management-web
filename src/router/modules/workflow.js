import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
    path: '/workflow',
    name: 'workflow',
    meta,
    redirect: { name: 'workflow-instance-initiate' },
    component: layoutHeaderAside,
    children: [
      { path: 'instance/initiate', name: 'workflow-instance-initiate', component: _import('workflow/instance/initiat.vue'), meta: { ...meta, title: '我的发起' } },
      { path: 'instance/pending', name: 'workflow-instance-pending', component: _import('workflow/instance/pending.vue'), meta: { ...meta, title: '我的待办' } },
      { path: 'instance/processed', name: 'workflow-instance-processed', component: _import('workflow/instance/processed.vue'), meta: { ...meta, title: '我的已办' } },
      
    ]
  }