import {FC} from 'react';
import styles from './infoItem.module.css'

interface InfoProps {
    img: any;
    label: string;
    value: string
}

export const InfoItem: FC<InfoProps> = (props) =>{
    return(
        <div className={styles.item}>
            <img className={styles.img} src={props.img} alt={"icon-img"}/>
            <span className={styles.label}> {props.label}</span>
            <span className={styles.value}>{props.value}</span>
        </div>
    )
}

