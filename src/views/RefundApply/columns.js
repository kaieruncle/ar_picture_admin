export const COLUMNS = [
    {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        width: 80,
        fixed: 'left',
    },
    {
        title: '订单号',
        dataIndex: 'order.out_trade_no',
        align: 'center',
        width: 160,
        customRender: ({ record }) => {
            const { order } = record || {}
            const { out_trade_no } = order || {}
            return out_trade_no;
        },
    },
    {
        title: '商户退款单号',
        dataIndex: 'out_refund_no',
        align: 'center',
        width: 160
    },
    {
        title: '微信退款单号',
        dataIndex: 'refund_id',
        align: 'center',
        width: 160,
        customRender: ({ record }) => {
            const { refund_id } = record || {}
            return refund_id || '-';
        },
    },
    {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        width: 100,
    },
    {
        title: '拒绝理由',
        dataIndex: 'reject_reason',
        align: 'center',
        width: 100,
    },
    {
        title: '退款原因',
        dataIndex: 'reason_label',
        align: 'center',
        width: 100,
    },
    {
        title: '详细原因',
        dataIndex: 'refund_reason',
        align: 'center',
        width: 100,
    },
    {
        title: '退款金额',
        dataIndex: 'refund_fee',
        align: 'center',
        width: 100,
    },
    {
        title: '作品标题',
        dataIndex: 'picture.title',
        align: 'center',
        width: 100,
        customRender: ({ record }) => {
            const { picture } = record || {}
            const { title } = picture || {}
            return title;
        },
    },
    {
        title: '退款用户',
        dataIndex: 'user.nickname',
        align: 'center',
        width: 100,
        customRender: ({ record }) => {
            const { user } = record || {}
            const { nickname } = user || {}
            return nickname;
        },
    }]
