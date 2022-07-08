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
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '1rem', backgroundColor: '#000', borderTop: '1px solid #ccc' }} className="is-flex is-hidden-desktop">
                <Link href="/relocation-packages"><a className='mx-auto'>Relocation packages ⟶</a></Link>
            </div>
        </>
    )
}

export default MyApp
