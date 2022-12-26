import { width } from "@mui/system"
import styles from "./banner.module.css"
import Image  from "next/image"
import PlayIcon from "../../public/static/play_icon.svg"

const Banner = (props) => {

    const { title, subtitle, imgUrl } = props

    const handleOnPlay = () => {

    }
    console.log(PlayIcon)
    return(
        <div className={styles.container}>
            <img className={styles.heroImage} src={imgUrl} />
            <div className={styles.heroContent}>
                <h1>{props.title}</h1>
                <h2>{props.subtitle}</h2>
                <button className={styles.playBtn}><Image src={PlayIcon} height={24} width={24} alt="play button" /><span className={styles.play}>Play</span></button>
            </div>
        </div>
    ) 
    
    
}

export default Banner