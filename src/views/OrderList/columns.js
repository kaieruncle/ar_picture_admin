export const COLUMNS = [{
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: 60,
    fixed: 'left',
},
{
    title: '订单号',
    dataIndex: 'out_trade_no',
    align: 'center',
    width: 150,
},{
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    width: 80
},{
    title: '订单金额',
    dataIndex: 'total_fee',
    align: 'center',
    width: 80
},{
    title: '作品标题',
    dataIndex: 'picture.title',
    align: 'center',
    width: 120,
    customRender: ({record}) => {
        const {picture} = record || {}
        const {title} = picture || {}
        return title;
    },
},{
    title: '作品图片',
    dataIndex: 'picture.picture_url',
    align: 'center',
    width: 80
},{
    title: '所属用户',
    dataIndex: 'user.nickname',
    align: 'center',
    width: 80,
    customRender: ({record}) => {
        const {user} = record || {}
        const {nickname} = user || {}
        return nickname;
    },
},{
    title: '创建时间',
    dataIndex: 'created_at',
    align: 'center',
    width: 80,
}]