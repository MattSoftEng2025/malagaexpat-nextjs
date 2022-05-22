import '../styles/globals.scss'
import Link from 'next/link'
import NavBar from '../components/layout/NavBar'
import ShareBar from '../components/layout/ShareBar'
import Footer from '../components/layout/Footer'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <Component {...pageProps} />
            <Footer />
        </>
    )
}

export default MyApp
