export const COLUMNS = [{
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: 120,
    fixed: 'left',
}, {
    title: '头像',
    dataIndex: 'avatar',
    align: 'center',
    width: 100,
    ellipsis: true
}, {
    title: '昵称',
    dataIndex: 'nickname',
    align: 'center',
    width: 120,
    ellipsis: true
},  {
    title: '草稿数量',
    dataIndex: 'draft_works',
    align: 'center',
    width: 100,
    ellipsis: true
},
{
    title: '作品数量',
    dataIndex: 'released_works',
    align: 'center',
    width: 100,
    ellipsis: true
}, {
    title: '订单统计',
    children: [
        {
            title: '已支付',
            dataIndex: 'paid_orders',
            align: 'center',
            width: 80,
            ellipsis: true
        }, {
            title: '待支付',
            dataIndex: 'pending_orders',
            align: 'center',
            width: 80,
            ellipsis: true
        },{
            title: '已关闭',
            dataIndex: 'closed_orders',
            align: 'center',
            width: 80,
            ellipsis: true
        }, {
            title: '退款中',
            dataIndex: 'refunding_orders',
            align: 'center',
            width: 80,
            ellipsis: true
        }, {
            title: '已退款',
            dataIndex: 'refunded_orders',
            align: 'center',
            width: 80,
            ellipsis: true
        }
    ]
}]