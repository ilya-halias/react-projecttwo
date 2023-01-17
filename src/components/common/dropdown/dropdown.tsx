import {FC, ChangeEvent} from "react";
import css from "./dropdown.module.css";
interface DropDawnProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>)=> void;
    options: {value: string; label:string; system: string}[];

}

export const Dropdown: FC<DropDawnProps> = ({value, onChange, options})=>{
    return (
        <select className={css.dropdown} value={value} onChange={onChange}>
            {options.map(({value, label,system})=>(
            <option value={value} key={value}>
                {label}
            </option>
            ))}
        </select>
    )
}
