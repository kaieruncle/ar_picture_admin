export const COLUMNS = [
    {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        width: 80,
        fixed: 'left',
    }, {
        title: '所属用户',
        dataIndex: 'user.nickname',
        align: 'center',
        width: 100,
        customRender: ({ record }) => {
            const { user } = record || {}
            const { nickname } = user || {}
            return nickname;
        },
    },
    {
        title: '标题',
        dataIndex: 'title',
        align: 'center',
        width: 100,
    },
    {
        title: '原图',
        dataIndex: 'picture_url',
        align: 'center',
        width: 100,
    },
    {
        title: '入口码',
        dataIndex: 'ew_code_url',
        align: 'center',
        width: 100,
    },
    {
        title: '类型',
        dataIndex: 'status',
        align: 'center',
        width: 100,
    }]
