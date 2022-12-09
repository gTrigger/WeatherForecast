import axios from 'axios';
import LocaleService from "@/services/LocaleService";
import { BASE_URL, API_KEY, UNIT } from "@/common/constants/apiConstants";
import { WeatherForecast } from "@/common/types/commonTypes";

export default class ApiService {
    static async searchByCity(city: string): Promise<WeatherForecast> {
        const {data} = await axios.get<WeatherForecast>(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                lang: LocaleService.locale,
                units: UNIT,
            }
        });

        return data;
    }
}
