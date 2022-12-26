import styles from "./card.module.css"
import Image  from "next/image";
import { useState } from "react";
import { motion } from "framer-motion"
import cls from "classnames"

const Card = (props) => {
    const { index, imgUrl = "https://media.istockphoto.com/id/1191001701/photo/popcorn-and-clapperboard.jpg?s=612x612&w=0&k=20&c=iUkFTVuU8k-UCcZDxczTWs6gkRa0nAMihp2Jf_2ASKM=", size="medium" } = props;

    const [imgSrc, setImgSrc] = useState(imgUrl)
    console.log(size);
    const scale = index === 0 ? {scaleY: 1.1} : {scale: 1.1}
    const classMap = {
        'large': styles.lgItem,
        'medium': styles.mdItem,
        'small': styles.smItem
    }

    const handleImageError = () => {
        setImgSrc("https://media.istockphoto.com/id/1191001701/photo/popcorn-and-clapperboard.jpg?s=612x612&w=0&k=20&c=iUkFTVuU8k-UCcZDxczTWs6gkRa0nAMihp2Jf_2ASKM=")
    }

    return <div className={styles.container}>
        <motion.div className={cls(styles.imgMotionWrapper, classMap[size])} whileHover={{...scale}}>
            <Image src={imgSrc} onError={handleImageError} alt="Pictures" layout="fill" className={styles.cardImg} />
        </motion.div>
    </div>
}

export default Card