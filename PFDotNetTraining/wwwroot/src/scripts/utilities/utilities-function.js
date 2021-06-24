/**
 * Key generator
 * @param {string}  prefix - prefix for file and folder.
 * @param {number} length - random string length.
 * @return {string} - result prefix & length.
 */
export function generateKey(prefix, length) {
    const randomStr = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
        randomStr.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    const result = prefix.concat(randomStr.join(''));
    return result;
}
// Get current date
export function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
}
