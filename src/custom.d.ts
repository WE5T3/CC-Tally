type RecordItem = {
    type: string
    tags: string[]
    date: string | null
    notes: string
    amount: number
}
type RootState = {
    recordList: RecordItem[]
    tagList: Tag[]
    currentTag?: Tag
}
type Tag = {
    id: string
    name: string
}


interface Window {

}