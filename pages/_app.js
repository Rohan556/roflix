import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import { magic } from '../lib/magic-clients'
import '../styles/globals.css'
import Loading from '../components/loading/loading'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    let isLoggedIn
    async function getDet(){
      isLoggedIn = await checkForLoggedIn()
      console.log(isLoggedIn);
    }
  
    getDet()

    if(isLoggedIn){
      router.push("/")
    }else{
      router.push("/login")
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false)
  } 

  router.events.on("routeChangeComplete", handleComplete)
  router.events.on("routeChangeError", handleComplete)

  return () => {
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
  }
  }, [router])

  const checkForLoggedIn = async() => {
    return await magic.user.isLoggedIn()
  }

  return isLoading ? <Loading /> : <Component {...pageProps} />
}
