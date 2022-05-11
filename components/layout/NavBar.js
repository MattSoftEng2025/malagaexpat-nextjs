import Link from 'next/link'

export default function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link href="/"><a className='navbar-item'>Malaga Expat</a></Link>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link href="/our-services"><a className='navbar-item'>Services</a></Link>
                    <Link href="/information"><a className='navbar-item'>Information</a></Link>
                </div>
            </div>
        </nav>
    )
}