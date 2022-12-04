import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { merge } from 'lodash';
import commonTranslations from "@/translations/common";
import weatherTranslations from "@/translations/weather";
import CookieService from "@/services/CookieService";

const messages = merge(
    {},
    commonTranslations,
    weatherTranslations,
);

export const locales = {
    EN: 'en',
    RU: 'ru'
}

Vue.use(VueI18n);

export default new VueI18n({
    locale: CookieService.getCookie('locale') || locales.EN,
    messages,
    silentFallbackWarn: true,
});
