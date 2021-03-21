import SInfo from 'react-native-sensitive-info';
export default class MyStorage {
    user_token = 'user_token'
    setItem(key, value) {
        SInfo.setItem(key, "".concat(value), {});
    }
    getItem(key) {
        return SInfo.getItem(key, {})
    }
    removeItem(key) {
        return SInfo.deleteItem(key, {})
    }

    clearStorage() {
        // return this.rmUserInfo();
    }
    setUserToken(token) {
        this.setItem(this.user_token, token)
    }
    getUserToken() {
        return this.getItem(this.user_token)
    }
    rmUserToken() {
        return this.removeItem(this.user_token)
    }
}