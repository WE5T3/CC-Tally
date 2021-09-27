const localStorageKeyName = 'tagList';
type TagListModel= {
    data: string[]
    fetch: () => string[]
    create: (name: string) => 'success'|'duplicated'|'blank'
    //'success表示成功,duplicated 表示name重复
    save: () => void
}

const tagListModel :TagListModel= {
    data:[],
    create(name:string){
        if(name===' '|| name.indexOf(' ')>=0){
            return 'blank'
        }
        if (this.data.indexOf(name)>=0){
            return 'duplicated'
        }
        this.data.push(name)
        this.save()
        return 'success'
    },
    fetch() {
        this.data=JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]')
        return this.data

    },
    save() {
        return localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }

}
export {tagListModel};
