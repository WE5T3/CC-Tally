const localStorageKeyName = 'recordList';

// @ts-ignore
const recordListModel = {
    clone(data: RecordItem[] | RecordItem) {
        return JSON.parse(JSON.stringify(data))
    },
    fetch() {
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];

    },
    save(data: RecordItem[]) {
        return localStorage.setItem(localStorageKeyName, JSON.stringify(data));
    }

}
export {recordListModel};
