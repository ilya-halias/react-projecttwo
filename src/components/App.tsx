
import { InfoItem} from "../components/common";
import {ErrorBoundary} from "../components/common/error"
import { Component, FC } from "react";
import css from "./styles.module.css" ;
// import {REACT_APP_BASE_URL} from "../constans/weather-api";
import {Weather} from "../types/weather";
import humIcon from "./img/humidity.svg";
import pressureIcon from "./img/pressure.svg";
import windIcon from "./img/wind.svg";
import {Input} from "./common/input";
import {Dropdown} from "../components/common";
import sunrise from "./img/sunrise_1.svg";
import sunset from "./img/sunset.svg";
// @ts-ignore
import debounce from 'lodash/debounce';



interface AppState {
    weather: Weather
    search: string
    unit: string

}

const myFetch = (url: string) => {
    return fetch(url).then((data) => {
        if (data.ok) {
            return data.json();

        }
        throw Error("oops");
    });

//     interface WeatherProps{
//     unit:string}
// }
// const Weather: FC<WeatherProps> = ({unit}) =>{
//     (unit= {unit})
// }

    interface WrapperProps {
    unit: string
    }
}
export class App extends Component<{}, AppState> {

    getCurrentTime(seconds : number){
        const date = new Date(seconds*1000).toLocaleString();
        const time = date.split(" ")[1];
        return time;
    }

    state: AppState = {

        unit:"metric",
       weather:{
           main: {
               temp: 0,
               feels_like: 0,
               pressure: 0,
               humidity: 0,

           },
           wind: {
               speed: 0,
               gust: 0
           },
           clouds: { all: 0 },
           dt: 0,
           sys: {
               sunrise: 0,
               sunset: 0,
           },
           name: "",
           weather:[{icon: ""}],

       },
       search: "minsk"
    }

    fetchWeatherDebounced = debounce(this.componentDidMount, 1000)
    isOffline = false;
    componentDidMount(snapshot?: any) {
        if(this.isOffline){return}
        myFetch( `https://api.openweathermap.org/data/2.5/weather?appid=f8d51670d47d153d728c147ab99cd764=${this.state.search}&units=${this.state.unit}`)
            .then((data) => this.setState(prev => ({ ...prev, weather: { name: data.name, dt: data.dt, icon: data.icon, main: { ...data.main, }, weather: data.weather, wind: { ...data.wind }, sys:{...data.sys}, clouds: {...data.clouds}} })));
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<AppState>, snapshot?: any) {
        if (prevState.weather !== this.state.weather){
            this.infoItems =[
                {
                    img: humIcon,
                    label: "Влажность",
                    value: String(this.state.weather.main.humidity + "%")
                },
                {
                    img: pressureIcon,
                    label: "Давление",
                    value: String(this.state.weather.main.pressure + "гПа"),
                },
                {
                    img: windIcon,
                    label: "Ветер",
                    value: String(this.state.weather.wind.speed + " м/сек"),
                },
            ]
        }
        if( prevState.search !== this.state.search){
            this.fetchWeatherDebounced()
        }
        if (prevState.unit !== this.state.unit){
            this.componentDidMount()
        }

    }
    infoItems: { img?: any; label: string; value: string }[] = [
        {
            img: humIcon,
            label: "Влажность",
            value: String(this.state.weather.main.humidity + "   %"),
        },
        {
            img: pressureIcon,
            label: "Давление",
            value: String(this.state.weather.main.pressure + "   гПа"),
        },
        {
            img: windIcon,
            label: "Ветер",
            value: String(this.state.weather.wind.speed + "  м/сек"),
        },
    ]

    unitHandler = (unit:string) =>{
        this.setState({unit})
    }


    units = [
        { value: "metric", label: "Metric, °C"},
        { value: "standard", label: "Standard, K"  },
        { value: "imperial", label: "Imperial, °F" }

    ]




    render (){
    return(

        <div className={css.container}>
            <ErrorBoundary fallback={<span>Уже чиню </span>}>
            <Dropdown value={this.state.unit} onChange={(e)=> this.unitHandler(e.target.value)} options={this.units}/>
            <div className={css.search_city}>
                <Input value={this.state.search} onChange={(search) => this.setState({ search })} />
            </div>

               <img src={`https://openweathermap.org/img/wn/${this.state.weather.weather[0].icon }@2x.png`} className={css.img_back } alt="icon"/>

            <div className={css.weather}>
            <p className={css.city}>
                {this.state.weather.name}
            </p>
            <p className={css.temperature}>
                Температура воздуха: {Math.round(this.state.weather?.main.temp )}
            </p>
            <p className={css.temperature}>
                Ощущается как: {Math.round(this.state.weather?.main.feels_like) }
            </p>

              </div>

            <div className={css.cloud}>
                Облачность: {this.state.weather.clouds.all} %
            </div>
            <div className={css.sun_list}>

            <div className={css.sunriseAndSunset}>

                <p className={css.sun_time}>
                    <img src={sunrise} className={css.sunrise_sunset}  alt="sunrise"/>
                    Восход : {String(this.getCurrentTime(this.state.weather.sys.sunrise))}</p>
                <p className={css.sun_time}>
                    <img src={sunset} className={css.sunrise_sunset} alt="sunset" />
                Закат : {String(this.getCurrentTime(this.state.weather.sys.sunset))}</p>
            </div>
            <ul className={css.list}>
                {this.infoItems.map((item, index) => (
                    <InfoItem
                        key={item.img + index}
                       img={item.img}
                        label={item.label}
                        value={item.value}
                    />
                ))}
            </ul>
            </div>
            </ErrorBoundary>
        </div>

    )
}
}
