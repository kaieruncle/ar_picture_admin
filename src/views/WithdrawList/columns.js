export const COLUMNS = [{
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: 80,
    fixed: 'left',
}, {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    width: 100,
    ellipsis: true
}, {
    title: '提现金额',
    dataIndex: 'amount',
    align: 'center',
    width: 100,
    ellipsis: true
}, {
    title: '所属代理',
    dataIndex: 'agent.user.nickname',
    align: 'center',
    width: 120,
    ellipsis: true,
    customRender: ({ record }) => {
        const { agent } = record || {}
        const { user } = agent || {}
        const { nickname } = user || {}
        return nickname;
    },
}, {
    title: '联系人',
    dataIndex: 'agent.contact_name',
    align: 'center',
    width: 100,
    ellipsis: true,
    customRender: ({ record }) => {
        const { agent } = record || {}
        const { contact_name } = agent || {}
        return contact_name;
    }
}, {
    title: '手机号',
    dataIndex: 'agent.contact_phone',
    align: 'center',
    width: 100,
    ellipsis: true,
    customRender: ({ record }) => {
        const { agent } = record || {}
        const { contact_phone } = agent || {}
        return contact_phone;
    }
}, {
    title: '微信',
    dataIndex: 'agent.wechat',
    align: 'center',
    width: 100,
    ellipsis: true,
    customRender: ({ record }) => {
        const { agent } = record || {}
        const { wechat } = agent || {}
        return wechat;
    }
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