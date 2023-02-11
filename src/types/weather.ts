export interface Weather {
    main: {
        temp: number;
        feels_like: number
        pressure: number;
        humidity: number;
            }
    wind: {
        speed: number;
        gust: number
    }
    clouds: { all: number }
    dt: number
    sys: {
        sunrise: number;
        sunset: number
    }
    name: string;
    id?: number;
    weather:[{icon: string}];

}
