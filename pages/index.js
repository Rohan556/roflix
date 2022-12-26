import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Banner from "../components/banner/banner"
import NavBar from '../components/Nav/navbar'
import SectionCard from '../components/sectionCard/SectionCard'
import { getPopularVideos, getVideos } from '../lib/videos'

export async function getServerSideProps(){
  const disneyVideos = await getVideos("disney trailer")
  const productivityVideos = await getVideos("productivity")
  const travelVideos = await getVideos("travel")
  const popularVideos = await getPopularVideos()
  console.log({disneyVideos,productivityVideos, travelVideos, popularVideos});
  return {
    props: {
      disneyVideos,
      productivityVideos,
      travelVideos,
      popularVideos
    }
  }
}
import { magic } from "../lib/magic-clients"
export default function Home({ disneyVideos, productivityVideos, travelVideos, popularVideos }) {
  console.log("M", magic);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar usermail={"rohan"}/>
      <Banner title="Cliffer the red dog" subtitle="A very cute dog" imgUrl={"/static/clifford.jpg"} />
      <div className={styles.sectionWrapper}>
        <SectionCard title="Disney" size="large" contents={disneyVideos}/>
        <SectionCard title="Travel" size="small" contents={travelVideos}/>
        <SectionCard title="Productivity" size="medium" contents={productivityVideos}/>
        <SectionCard title="Popular" size="small" contents={popularVideos}/>
      </div>
      
    </>
  )
}
