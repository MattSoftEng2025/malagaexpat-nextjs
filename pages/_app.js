import '../styles/globals.scss'
import Link from 'next/link'
import NavBar from '../components/layout/NavBar'
import Footer from '../components/layout/Footer'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const isRelocationPackages = router.pathname === '/relocation-packages';

    useEffect(() => {
        Fathom.load('JFQKQISE', {
            url: 'https://cdn.usefathom.com/script.js',
            includedDomains: ['www.malagaexpat.com', 'malagaexpat.com'],
        });

        function onRouteChangeComplete() {
            Fathom.trackPageview();
        }
        // Record a pageview when route changes
        router.events.on('routeChangeComplete', onRouteChangeComplete);

        // Unassign event listener
        return () => {
            router.events.off('routeChangeComplete', onRouteChangeComplete);
        };
    }, []);

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <Component {...pageProps} />
            <Footer />
            {!isRelocationPackages && <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '1rem', backgroundColor: '#000', borderTop: '1px solid #ccc' }} className="is-flex is-hidden-desktop">
                <Link href="/relocation-packages" className='mx-auto has-text-light'>Relocation packages ⟶</Link>
            </div>}
        </>
    )
}

export default MyApp
