import axios from 'axios';
import { BASE_URL, API_KEY } from "@/common/apiConstants";
import LocaleService from "@/services/LocaleService";

export default class ApiService {
    static async searchByCity(city) {
        const {data} = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                lang: LocaleService.locale,
                units: 'metric'
            }
        });

        return data;
    }
}
