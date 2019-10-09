
// test code
const localStoragePlugin = store => {
    store.subscribe((mutation, { blogs }) => {
        window.localStorage.setItem(mutation, JSON.stringify(blogs))
    })
}

export default [localStoragePlugin];


