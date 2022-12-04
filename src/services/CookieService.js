import VueCookie from 'vue-cookie';

export default class CookieService {
    static setCookie(name, value) {
        return VueCookie.set(name, value);
    }

    static getCookie(name) {
        return VueCookie.get(name);
    }

    static deleteCookie(name) {
        return VueCookie.set(name);
    }
}
