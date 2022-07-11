import '../styles/globals.scss'
import Link from 'next/link'
import NavBar from '../components/layout/NavBar'
import ShareBar from '../components/layout/ShareBar'
import Footer from '../components/layout/Footer'
import Head from 'next/head'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const isRelocationPackages = router.pathname === '/relocation-packages';

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <Component {...pageProps} />
            <Footer />
            {!isRelocationPackages && <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '1rem', backgroundColor: '#000', borderTop: '1px solid #ccc' }} className="is-flex is-hidden-desktop">
                <Link href="/relocation-packages"><a className='mx-auto has-text-light'>Relocation packages ⟶</a></Link>
            </div>}
        </>
    )
}

export default MyApp
