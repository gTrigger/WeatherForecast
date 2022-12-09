export type WeatherType = {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export type WeatherMainInfo = {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export type WeatherWindInfo = {
    speed: number;
    deg: number;
}

export interface WeatherForecast {
    weather: WeatherType[],
    main: WeatherMainInfo,
    wind: WeatherWindInfo,
    name: string,
}

export enum StatusCode {
    NOT_FOUND = 404,
}
