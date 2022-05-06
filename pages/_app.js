import '../styles/globals.scss'
import { NameContextWrapper } from '../state/name-context'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
    return (
        <NameContextWrapper>
            <nav className="navbar">
                <div className="navbar-brand">
                    <Link href="/"><a className='navbar-item'>Malaga Expat</a></Link>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <Link href="/our-services"><a className='navbar-item'>Services</a></Link>
                        <Link href="/information/about-malaga"><a className='navbar-item'>About Malaga</a></Link>
                    </div>
                </div>
            </nav>
            <Component {...pageProps} />
        </NameContextWrapper>)
}

export default MyApp
