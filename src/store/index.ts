import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone"
import createId from "@/lib/createId"
import router from "@/router"
import {defaultExpenseTags, repositoryTags} from "@/constants/defaultTagList"

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        recordList: JSON.parse(window.localStorage.getItem('record-list') || '[]'),
        tagList: JSON.parse(window.localStorage.getItem('tagList') || '0') || defaultExpenseTags,
        currentTag: undefined
    } as RootState,
    mutations: {
        setCurrentTag(state, id) {
            state.currentTag = state.tagList.filter(t => t.id === id)[0]
        },
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]
        },
        createRecord(state, record: RecordItem) {
            const record2: RecordItem = clone(record)
            state.recordList.push(record2)
            console.log(state.recordList)
            store.commit('saveRecords')
            // recordStore.saveRecords()
        },
        saveRecords(state) {
            window.localStorage.setItem('recordList',
                JSON.stringify(state.recordList))
        },
        fetchTags(state) {
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
            console.log(state.tagList)
            state.tagList = state.tagList.filter(item => item.name !== '')
            if (!state.tagList || state.tagList.length === 0) {
                store.commit('setDefault')
            }
        },
        setDefault() {
            for (let i = 0; i < defaultExpenseTags.length; i++) {
                store.commit('createTag', defaultExpenseTags[i].name)
            }
        },
        createTag(state, name: string) {
            const names = state.tagList.map(item => item.name)
            const repositoryNames = repositoryTags.map(item => item.name)
            const defaultNames = defaultExpenseTags.map(item => item.name)
            if (name === ' ' || name.indexOf(' ') >= 0) {
                window.alert('标签名不能含有空格')
                // return 'blank'
            } else if (names.indexOf(name) >= 0) {
                window.alert('标签名重复')
                // return 'duplicated'
            } else {
                const id = createId().toString()
                console.log(id)
                if (Number(id) >= 12) {
                    if (defaultNames.indexOf(name) >= 0 || repositoryNames.indexOf(name) >= 0) {
                        state.tagList.push({id, name: name, value: name})
                    } else {
                        state.tagList.push({id, name: name, value: 'diy'})
                    }
                } else {
                    state.tagList.push({id, name: name, value: name})
                }
                store.commit('saveTags')
                // return 'success'
            }
        },
        updateTag(state, payload: { id: string, name: string }) {
            const {id, name} = payload
            const idList = state.tagList.map(item => item.id)
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name)
                const defaultNames = defaultExpenseTags.map(item => item.name)
                const repositoryNames = repositoryTags.map(item => item.name)
                const tag = state.tagList.filter(item => item.id === id)[0]

                if (names.indexOf(name) >= 0) {
                    window.alert('标签名重复')
                    return
                } else {
                    tag.name = name
                    if (defaultNames.indexOf(name) >= 0) {
                        tag.value = name
                    } else if (repositoryNames.indexOf(name) >= 0) {
                        tag.value = name
                    } else {
                        tag.value = 'diy'
                    }
                    store.commit('saveTags')

                }
            }
        },
        removeTag(state, id: string) {
            let index = -1
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    index = i
                    break
                }
            }
            if (index >= 0) {
                state.tagList.splice(index, 1)
                store.commit('saveTags')
                router.replace('/edittags')
            } else {
                window.alert('删除失败')
            }
        },
        saveTags(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
        },
    }

})


export default store