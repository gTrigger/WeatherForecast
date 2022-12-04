import i18n from "@/plugins/i18n";
import CookieService from "@/services/CookieService";

export default class LocaleService {
    static get locale() {
        return i18n.locale;
    }

    static setLocale(locale) {
        i18n.locale = locale;
        CookieService.setCookie('locale', locale);
    }
}
