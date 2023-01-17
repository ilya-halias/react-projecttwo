
import { InfoItem } from "../components/common";
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
    unit: string}
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
           icon: ""

       },
       search: "minsk"
    }

    componentDidMount(snapshot?: any) {
        myFetch( `https://api.openweathermap.org/data/2.5/weather?appid=21f54f5696d81d7a71d314ed425f098d&q=${this.state.search}&units=${this.state.unit}`)
            .then((data) => this.setState(prev => ({ ...prev, weather: { name: data.name, dt: data.dt, icon: data.icon, main: { ...data.main, }, wind: { ...data.wind }, sys:{...data.sys}, clouds: {...data.clouds}} })));
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
            this.componentDidMount()
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
        { value: "standard", label: "Standard, K" },
        { value: "imperial", label: "Imperial, °F" },
        { value: "metric", label: "Metric, °C" },
    ]




    render (){
    return(

        <div className={css.container}>
            <Dropdown value={this.state.unit} onChange={(e)=> this.unitHandler(e.target.value)} options={this.units}/>
            <div className={css.search_city}>
                <Input value={this.state.search} onChange={(search) => this.setState({ search })} />
            </div>

               {/*<img src={`https://openweathermap.org/img/w/${this.state.weather.icon}.png`} alt="icon"/>*/}

            <div className={css.weather}>
            <p className={css.city}>
                {this.state.weather.name}
            </p>
            <p className={css.temperature}>
                Температура воздуха: {Math.round(this.state.weather?.main.temp - 274.01)}&#176;C
            </p>
            <p className={css.temperature}>
                Ощущается как: {Math.round(this.state.weather?.main.feels_like  - 267.59)}&#176;C</p>

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

        </div>


    )
}
}
