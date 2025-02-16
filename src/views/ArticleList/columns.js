export const COLUMNS = [
    {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        width: 80,
        fixed: 'left',
    },
    {
        title: '是否推荐',
        dataIndex: 'is_starred',
        align: 'center',
        width: 100,
    }, {
        title: '文章标题',
        dataIndex: 'title',
        align: 'center',
        width: 100
    },
    {
        title: '所属分类',
        dataIndex: 'category.name',
        align: 'center',
        width: 100,
        customRender: ({ record }) => {
            const { category } = record || {}
            const { name } = category || {}
            return name;
        },
    },
    ]
