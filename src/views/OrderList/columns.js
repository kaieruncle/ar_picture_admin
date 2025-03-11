export const COLUMNS = [{
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: 130,
    fixed: 'left',
},
{
    title: '订单号',
    dataIndex: 'out_trade_no',
    align: 'center',
    width: 140,
}, {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    width: 60
},{
    title: '订单类型',
    dataIndex: 'delivery_type',
    align: 'center',
    width: 90
}, {
    title: '订单金额',
    dataIndex: 'total_fee',
    align: 'center',
    width: 80
},{
    title: '物流公司',
    dataIndex: 'express_company_name',
    align: 'center',
    width: 80
},{
    title: '物流单号',
    dataIndex: 'tracking_number',
    align: 'center',
    width: 80
}, {
    title: '是否发货',
    dataIndex: 'is_shipping_info_uploaded',
    align: 'center',
    width: 80
},{
    title: '照片',
    dataIndex: 'photo_url',
    align: 'center',
    width: 80
}, {
    title: '入口码',
    dataIndex: 'ew_code_url',
    align: 'center',
    width: 80
}, {
    title: '产品名称',
    dataIndex: 'product.title',
    align: 'center',
    width: 120,
    customRender: ({ record }) => {
        const { product } = record || {}
        const { title } = product || {}
        return title;
    },
}, {
    title: '用户',
    dataIndex: 'user.nickname',
    align: 'center',
    width: 100,
    customRender: ({ record }) => {
        const { user } = record || {}
        const { nickname } = user || {}
        return nickname;
    },
}]