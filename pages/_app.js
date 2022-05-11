import '../styles/globals.scss'
import Link from 'next/link'
import NavBar from '../components/layout/NavBar'
import ShareBar from '../components/layout/ShareBar'
import Footer from '../components/layout/Footer'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <NavBar />
            <Component {...pageProps} />
            <Footer />
        </>
    )
}

export default MyApp
