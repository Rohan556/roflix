import styles from "./sectioncard.module.css"
import Card from "../card/card"
import Link from "next/link";
const SectionCard = (props) => {

    const { title, size, contents = [] } = props
    console.log(contents[0]);
    return ( 
    <section className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.wrapper}>
            <div className={styles.cardWrapper}>
                {
                    contents.map((content, index) => {
                        return (
                            <Link key={content.id} href={`/video/${content.id}`}>
                                <Card imgUrl={content.imgUrl} index={index} size={size}/>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    </section>
)}

export default SectionCard