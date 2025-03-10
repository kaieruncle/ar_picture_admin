export const COLUMNS = [{
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: 80,
    fixed: 'left',
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
    title: '联系人',
    dataIndex: 'contact_name',
    align: 'center',
    width: 100,
    ellipsis: true
}, {
    title: '手机号',
    dataIndex: 'contact_phone',
    align: 'center',
    width: 100,
    ellipsis: true
}, {
    title: '微信',
    dataIndex: 'wechat',
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
        return `${commission_rate}%` || '-';
    },
}, {
    title: "钱包",
    children: [{
        title: '待提现',
        dataIndex: 'pending_amount',
        align: 'center',
        width: 100,
        ellipsis: true
    }, {
        title: '申请中',
        dataIndex: 'reviewing_amount',
        align: 'center',
        width: 100,
        ellipsis: true
    }, {
        title: '已打款',
        dataIndex: 'completed_amount',
        align: 'center',
        width: 100,
        ellipsis: true
    }]
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
}]
export const USERLISTCOLUMNS = [{
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
}]
export const EXTRACLLISTCOLUMNS = [{
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