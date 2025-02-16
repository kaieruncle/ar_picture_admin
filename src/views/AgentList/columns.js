export const COLUMNS = [{
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: 100,
    fixed: 'left',
}, {
    title: '头像',
    dataIndex: 'user.avatar',
    align: 'center',
    width: 100,
    ellipsis: true
}, {
    title: '昵称',
    dataIndex: 'user.nickname',
    align: 'center',
    width: 120,
    ellipsis: true,
    customRender: ({ record }) => {
        const { user } = record || {}
        const { nickname } = user || {}
        return nickname;
    },
}, {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    width: 100,
    ellipsis: true
}, {
    title: '分润比例',
    dataIndex: 'commission_rate',
    align: 'center',
    width: 100,
    ellipsis: true,
    customRender: ({ record }) => {
        const { commission_rate } = record || {}
        return commission_rate || '-';
    },
}, {
    title: '累计收益',
    dataIndex: 'total_commission',
    align: 'center',
    width: 100,
    ellipsis: true
}, {
    title: '可提现',
    dataIndex: 'available_amount',
    align: 'center',
    width: 100,
    ellipsis: true
}, {
    title: '代理码',
    dataIndex: 'qrcode_url',
    align: 'center',
    width: 100,
    ellipsis: true
}, {
    title: '客户数量',
    dataIndex: 'user_count',
    align: 'center',
    width: 100,
    ellipsis: true
}, {
    title: '成交金额',
    dataIndex: 'order_amount',
    align: 'center',
    width: 100,
    ellipsis: true
}, {
    title: '成交订单数',
    dataIndex: 'order_count',
    align: 'center',
    width: 100,
    ellipsis: true
}]
export const USERLISTCOLUMNS = [ {
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
},
{
    title: '消费金额',
    dataIndex: 'order_amount',
    align: 'center',
    width: 100,
    ellipsis: true
}, {
    title: '付款订单数',
    dataIndex: 'paid_orders',
    align: 'center',
    width: 100,
    ellipsis: true
}]
export const EXTRACLLISTCOLUMNS = [{
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: 100,
    fixed: 'left',
},{
    title: '提现金额',
    dataIndex: 'amount',
    align: 'center',
    width: 100,
    ellipsis: true
}, {
    title: '备注',
    dataIndex: 'remark',
    align: 'center',
    width: 120,
    ellipsis: true
}]