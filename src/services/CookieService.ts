import VueCookie from 'vue-cookie';
import { CookieType } from "@/common/types/cookieTypes";

export default class CookieService {
    static setCookie(name: CookieType, value: string) {
        return VueCookie.set(name, value);
    }

    static getCookie(name: CookieType) {
        return VueCookie.get(name);
    }

    static deleteCookie(name: CookieType) {
        return VueCookie.set(name);
    }
}
