import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function NavBar() {
    const [open, setOpen] = useState(false)
    const hide = () => setOpen(false)
    const router = useRouter()
    const isHomepage = router.pathname === '/';

    return (
        <nav className={`navbar ${isHomepage ? 'is-dark' : 'is-primary'} is-fixed-top`} role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link href="/">
                    <a className="navbar-item">
                        <img src={isHomepage ? '/mexpat-black-on-yellow.png' : '/mexpat-yellow-on-black.png'} alt="Malaga Expat logo" className="mr-3" />
                        <b>Malaga Expat</b>
                    </a>
                </Link>
                <a role="button" className={`navbar-burger ${open ? 'is-active' : ''}`} aria-label="menu" aria-expanded={open} data-target="navbar" onClick={() => setOpen(!open)}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className={`navbar-menu ${open ? 'is-active' : ''}`}>
                <div className="navbar-end">
                    <Link href="/"><a className='navbar-item' onClick={() => hide()}>Home</a></Link>
                    <Link href="/our-services"><a className='navbar-item' onClick={() => hide()}>Services</a></Link>
                    <Link href="/information"><a className='navbar-item' onClick={() => hide()}>Information</a></Link>
                    <Link href="/testimonials"><a className='navbar-item' onClick={() => hide()}>Testimonials</a></Link>
                    <Link href="/contact"><a className='navbar-item' onClick={() => hide()}>Contact</a></Link>
                </div>
            </div>
        </nav>
    )
}