import i18n, { AppLocale } from "@/plugins/i18n";
import CookieService from "@/services/CookieService";
import { CookieType } from "@/common/types/cookieTypes";

export default class LocaleService {
    static get locale(): AppLocale {
        return i18n.locale as AppLocale;
    }

    static setLocale(locale: AppLocale) {
        i18n.locale = locale;
        CookieService.setCookie(CookieType.LOCALE, locale);
    }
}
