type RecordItem = {
    type: string
    tags: Tag[]
    date: string | null
    notes: string
    amount: number
}
type RootState = {
    recordList: RecordItem[],
    tagList: Tag[],
    currentTag?: Tag
}
type Tag = {
    id: string
    name: string
}
type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'success' | 'duplicated' | 'blank'
    //'success表示成功,duplicated 表示name重复
    update: (id: string, name: string) => 'success' | 'notfound' | 'duplicated'
    remove: (id: string) => boolean
    save: () => void
}

interface Window {

}