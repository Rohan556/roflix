import styles from "./navbar.module.css"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { magic } from "../../lib/magic-clients"
import { useState } from "react"
import Image from "next/image"
import Dropdown from "../../public/static/expand_more.svg"

const NavBar = () => {
    const router = useRouter()
    const [showMessage, setShowMessage] = useState(false)
    const [username, setUsername] = useState("")
    const handleHome = (e) => {
        e.preventDefault();
        router.push("/")
    }

    const handleMyList =(e) => {
        e.preventDefault();
        router.push("/browse/my-list")
    }

    const handleLogout = async(e) => {
        e.preventDefault()
        let status = await magic.user.logout()
        console.log({status});
        router.push("/login")
    }

    useEffect(() => {
        setEmail()
        checkForLogIn()
    }, [])

    const checkForLogIn = async() => {
        let status = await magic.user.isLoggedIn()
        console.log({status});
    }

    const setEmail = async() => {
        try{
            const {email, publicAddress} = await magic.user.getMetadata()
            setUsername(email)
        }catch(err){
            console.error("Error retrieving user email", err)
            //router.push("/login")
        }
    }
    return (
        <div className={styles.navbar}>
            <div className={styles.container}>
                <h1 className={styles.icon}>Netflix</h1>
                {/* <ul className={styles.navigations}>
                    <li className={styles.navigation} onClick={handleHome}>Home</li>
                    <li className={styles.navigation} onClick={handleMyList}>My List</li>
                </ul> */}
                <p className={styles.signoutBtn} onClick={handleLogout} onMouseEnter={() => {
                    setShowMessage(true);}}
                    onMouseLeave={() => { setShowMessage(false);}}><span className={styles.name}>{showMessage ? "Sign Out" :username}</span></p>
            </div>
        </div>
    )
}

export default NavBar