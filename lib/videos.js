import VideoData from "../data/ videos.json"
import axios from "axios"

const getCommonVideos = async(URL) => {
    try{
        const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
        const base_url = "https://youtube.googleapis.com/youtube/v3"
        
        const url = base_url + URL + `&key=${YOUTUBE_API_KEY}`
        console.log({url})
        const response = await axios.get(url).then((res) => {
            //console.log({res});
            return res.data
        })

        //console.log("response", response.items[0]);
        if(response?.error){
            return []
        }
        const data = response.items.map(item => {
            //console.log("Item", item);
            return {
                title: item.snippet.title,
                imgUrl: item.snippet.thumbnails.high.url,
                id: item?.id?.videoId || item.id.channelId || item.id
            }
        })

        console.log({data});
        return data
    }catch(err){
        console.error("Something wrong with the video lib error", err)
        return []
    }
}

export const getVideos = async(searchQuery) => {
    const URL = `/search?part=snippet&maxResults=25&q=${searchQuery}`
    return await getCommonVideos(URL)
}

export const getPopularVideos = () => {
    const URL = `/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=25&chart=mostPopular&regionCode=IN`
    return getCommonVideos(URL)
}

