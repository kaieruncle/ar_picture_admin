export const mockDynamicRoutes = [{
  layout: 'MainLayout',
  path: null,
  name: null,
  hidden: false,
  meta: {
    keepAlive: false,
    title: "站点管理"
  },
  component: null,
  children: [
    {
      name: "UserList",
      path: "userlist",
      component: "UserList/index",
      hidden: false,
      layout: "MainLayout",
      icon: "menu_item_work_line",
      meta: {
        title: "用户列表",
        keepAlive: false
      }
    }, {
      name: "ContentList",
      path: "contentlist",
      component: "ContentList/index",
      hidden: false,
      layout: "MainLayout",
      icon: "menu_item_work_line",
      meta: {
        title: "内容列表",
        keepAlive: false
      }
    }]
}, {
  layout: 'MainLayout',
  path: null,
  name: null,
  hidden: false,
  meta: {
    keepAlive: false,
    title: "财务管理"
  },
  component: null,
  children: [
    {
      name: "AgentList",
      path: "agentlist",
      component: "AgentList/index",
      hidden: false,
      layout: "MainLayout",
      icon: "menu_item_work_line",
      meta: {
        title: "代理列表",
        keepAlive: false
      }
    },
    {
      name: "OrderList",
      path: "orderlist",
      component: "OrderList/index",
      hidden: false,
      layout: "MainLayout",
      icon: "menu_item_work_line",
      meta: {
        title: "订单列表",
        keepAlive: false
      }
    },
    {
      name: "RefundApply",
      path: "refundapply",
      component: "RefundApply/index",
      hidden: false,
      layout: "MainLayout",
      icon: "menu_item_work_line",
      meta: {
        title: "退款申请",
        keepAlive: false
      }
    }]
},{
  layout: 'MainLayout',
  path: null,
  name: null,
  hidden: false,
  meta: {
    keepAlive: false,
    title: "系统管理"
  },
  component: null,
  children: [
    {
      name: "DictList",
      path: "dictlist",
      component: "DictList/index",
      hidden: false,
      layout: "MainLayout",
      icon: "menu_item_work_line",
      meta: {
        title: "字典列表",
        keepAlive: false
      }
    }]
}]