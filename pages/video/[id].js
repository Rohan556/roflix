import { useRouter } from "next/router"
import Modal from 'react-modal';
import styles from "../../styles/video.module.css"
import axios from "axios";
import NavBar from "../../components/Nav/navbar";

Modal.setAppElement('#__next');

export async function getStaticProps(context){
    // const video = {
    //     title: "Red Dog",
    //     publishTime: "1990-01-01",
    //     description: "A red cute dog",
    //     channelTitle: "Paramount Pictures",
    //     viewCount: 10000
    // }
    //const router = useRouter()
    const video = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${context.params.id}&key=${process.env.YOUTUBE_API_KEY}`).then(res => {
        return res.data
    })
    let items = video.items[0]
    const videoDetails = {
        published: items.snippet.publishedAt,
        title: items.snippet.title,
        description: items.snippet.description,
        viewCount: items.statistics.viewCount,
        likeCount: items.statistics.likeCount,
        channelName: items.snippet.channelTitle
    }

    console.log({videoDetails});
    return {
        props: {
            video: videoDetails
        },
        revalidate: 10
    }
}

export async function getStaticPaths() {
    const  listOfVideos = ["BtxL8QtR_kI", "nEnM923jHsU", "rZ-4PXfbRfc"]

    const paths = listOfVideos.map((id) => {
        return {
            params: {id}
        }
    })

    return {
        paths,
        fallback: "blocking"
    }
  }

const Video = (props) => {    
    const router = useRouter()
    console.log({props});
    const { id } = router.query

    let customStyles= {
        content: {
            backgroundColor: "black",
            width: "100vw",
            height: "90vh",
            position: "absolute",
            top: "4rem",
            left: 0,
            "overflow-y": "scroll"
        },
    }
   return <div className={styles.container}>
      <NavBar />
      <Modal
        isOpen={true}
        contentLabel="Example Modal"
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
        className={styles.modal}
        style={customStyles}
      >
        <div className={styles.frame}>
            <iframe id="ytplayer" type="text/html" width="75%" height="400px" src={`https://www.youtube.com/embed/${id}?autoplay=1&origin=http://example.com&controls=0&rel=0&autoplay=0`}
            frameborder="0"></iframe>
        </div>
        <hr />
        <h2 className={styles.title}>{props.video.title}</h2>
        <div className={styles.content}>
            <div className={styles.leftContent}>
                <div className={styles.leftWrapper}>
                    <p className={styles.desc}>Description: {props.video.description}</p>
                </div>
            </div>
            <div className={styles.rightContent}>
                <p><span className={styles.attName}>Publised At: </span><span className={styles.attValue}>{Date(props.video.published)}</span></p>
                <p><span className={styles.attName}>View Count: </span><span className={styles.attValue}>{props.video.viewCount}</span></p>
                <p><span className={styles.attName}>Like Count: </span><span className={styles.attValue}>{props.video.likeCount}</span></p>
            </div>
        </div>
      </Modal>
   </div>
}

export default Video