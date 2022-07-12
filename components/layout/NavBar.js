import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function NavBar() {
    const [open, setOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const hide = () => setOpen(false)
    const router = useRouter()
    const isHomepage = router.pathname === '/';

    const sendEnquiry = e => {

    }

    return (
        <>
            <nav className={`navbar is-primary is-fixed-top`} role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link href="/">
                        <a className="navbar-item">
                            <img src={'/mexpat-yellow-on-black.png'} alt="Malaga Expat logo" className="mr-3" />
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
                        <div className="navbar-item">
                            <a className='consultation is-block has-background-dark' onClick={() => setModalOpen(true)}>BOOK YOUR PERSONAL ONLINE CONSULATION!</a>
                        </div>
                        {!isHomepage && <Link href="/"><a className='navbar-item' onClick={() => hide()}>Home</a></Link>}
                        <Link href="/about"><a className='navbar-item' onClick={() => hide()}>About</a></Link>
                        <Link href="/our-services"><a className='navbar-item' onClick={() => hide()}>Services</a></Link>
                        <Link href="/information"><a className='navbar-item' onClick={() => hide()}>Information</a></Link>
                        <Link href="/testimonials"><a className='navbar-item' onClick={() => hide()}>Testimonials</a></Link>
                        <Link href="/contact"><a className='navbar-item' onClick={() => hide()}>Contact</a></Link>
                    </div>
                </div>
            </nav>
            {!modalOpen && !open && <div className='is-hidden-tablet has-background-dark p-2 has-text-centered' style={{ position: 'fixed', left: 0, right: 0, top: '3rem', zIndex: 100 }}>
                <a className='consultation is-block' onClick={() => setModalOpen(true)}>BOOK YOUR PERSONAL ONLINE CONSULATION!</a>
            </div>}
            <div className={`modal ${modalOpen ? 'is-active' : ''}`}>
                <div className="modal-background" onClick={() => setModalOpen(false)}></div>
                <form>
                    <div className="modal-card">
                        <header className="modal-card-head has-background-primary">
                            <p className="modal-card-title is-size-5">Book Your Personal Consultation</p>
                            <button className="delete" aria-label="close" onClick={() => setModalOpen(false)}></button>
                        </header>
                        <div className="modal-card-body">
                            <div className="content">
                                <p>Book your personal consultation now to answer any of your questions related to relocation to Spain, paperwork requirements and procedures as well as general advice.</p>
                                <p>The price is <b>50€</b> (plus VAT) which is fully deductible from any further agreed fees. The consultation can take place on the phone, WhatsApp, Skype or in person.</p>
                                <div className="field">
                                    <label className="label">Your name</label>
                                    <div className="control">
                                        <input name="name" className="input" required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Consultation topic</label>
                                    <div className="control">
                                        <input name="message" className="input" required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Preferred time-slot</label>
                                    <div className="control select is-fullwidth">
                                        <select name="company" defaultValue="">
                                            <option>Any time</option>
                                            <option>Morning</option>
                                            <option>Afternoon</option>
                                            <option>Evening</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Your email address</label>
                                    <div className="control">
                                        <input type="email" name="email" className="input" required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Your phone number</label>
                                    <div className="control">
                                        <input name="phone" className="input" />
                                    </div>
                                </div>
                                <p className="has-text-centered">Please get in touch with me to confirm the consultation</p>
                            </div>
                        </div>
                        <footer className="modal-card-foot">
                            <button className="button is-dark is-fullwidth" type="submit">Send enquiry ⟶</button>
                        </footer>
                    </div>
                </form>
            </div>
        </>
    )
}