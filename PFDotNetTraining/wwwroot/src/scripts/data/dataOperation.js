export function getItemById(id) {
    for (let i = 0; i < window.localStorage.length; i += 1) {
        if (localStorage.key(i) === id) {
            return JSON.parse(localStorage.getItem(localStorage.key(i)));
        }
    }
}
