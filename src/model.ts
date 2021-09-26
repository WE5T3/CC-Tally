const x = 'recordList';

// @ts-ignore
const model = {
    clone(data: RecordItem[] | RecordItem) {
        return JSON.parse(JSON.stringify(data))
    },
    fetch() {
        return JSON.parse(window.localStorage.getItem(x) || '[]') as RecordItem[];

    },
    save(data: RecordItem[]) {
        return localStorage.setItem(x, JSON.stringify(data));
    }

}
export {model};
