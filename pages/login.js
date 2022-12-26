import Head from "next/head"
import { useState } from "react"
import styles from "../styles/login.module.css"
import { useRouter } from "next/router"
import { magic } from "../lib/magic-clients"
import { useEffect } from "react"

const Login = () => {
    const [email, setEmail] = useState("")
    const [errorMess, setErrorMess] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const handleComplete = () => {
            setLoading(false)
        } 

        router.events.on("routeChangeComplete", handleComplete)
        router.events.on("routeChangeError", handleComplete)

        return () => {
            router.events.off("routeChangeComplete", handleComplete)
            router.events.off("routeChangeError", handleComplete)
        }
    },[router])

    const handleChange = (e) => {
        setEmail(e.target.value)
        console.log(email)
        setErrorMess("")
    }

    
    const handleLogin = async(e) => {
        e.preventDefault();
        setLoading(true)
        if(email){
            try {
                console.log("I am here");
                const token = await magic.auth.loginWithMagicLink({ email });
                if(token){
                    router.push("/")
                }
              } catch (e) {
                console.error("Something went wrong with auth", e)
                setLoading(false)
              }
        }else{
            setErrorMess("Enter valid email ID")
            setLoading(false)
        }
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Netflix Login</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={styles.iconWrapper}>
                <h1 className={styles.icon}>Netflix</h1>
            </div>
            <div className={styles.formWrapper}>
                <div className={styles.form}>
                    <h3 className={styles.signHeader}>Login Form</h3>
                    <input className={styles.signInput} type="email" name="email" placeholder="Email address" value={email} onChange={(e) => handleChange(e)} required/>
                    <p>{errorMess}</p>
                    <button className={styles.signButton} onClick={handleLogin}>{loading ? "Loading..." : "Sign In"}</button>
                </div>
            </div>
        </div>
    )
}

export default Login