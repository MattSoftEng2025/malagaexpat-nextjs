import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

function Modal({ modalOpen, setModalOpen }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [time, setTime] = useState('')
    const [topic, setTopic] = useState('')
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)
    const [failed, setFailed] = useState(false)

    const submit = async e => {
        if (sent) return;

        e.preventDefault();
        setSending(true);

        const content = `Topic: ${topic}\r\nPreferred time-slot: ${time}`;

        const res = await fetch('/api/send-message', {
            method: 'POST',
            body: JSON.stringify({ name, email, phone, content }),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        setSending(false);

        if (res.ok) {
            setSent(true)
        } else {
            setFailed(true)
        }
    }

    return (
        <form className={`modal ${modalOpen ? 'is-active' : ''}`} onSubmit={e => submit(e)}>
            <div className="modal-background" onClick={() => setModalOpen(false)}></div>
            <div className="modal-card">
                <header className="modal-card-head has-background-primary">
                    <p className="modal-card-title is-size-5">Book Your Personal Consultation</p>
                    <button className="delete" aria-label="close" onClick={() => setModalOpen(false)}></button>
                </header>
                <div className="modal-card-body">
                    {sent && <div className='message is-success'>
                        <div className="message-body has-text-centered">
                            Your message has been sent, we will be in touch as soon as possible.
                        </div></div>}
                    {failed && <div className='message is-danger'>
                        <div className="message-body has-text-centered">
                            Something went wrong while sending your message, please contact us via the details below or via our social media.
                        </div></div>}
                    {!sent && !failed && <div className="content">
                        <p>Book your personal consultation now to answer any of your questions related to relocation to Spain, paperwork requirements and procedures as well as general advice.</p>
                        <p>The price is <b>50€</b> (plus VAT) which is fully deductible from any further agreed fees. The consultation can take place on the phone, WhatsApp, Skype or in person.</p>
                        <div className="field">
                            <label className="label">Your name</label>
                            <div className="control">
                                <input name="name" className="input" required value={name} onChange={e => setName(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Consultation topic</label>
                            <div className="control">
                                <input name="message" className="input" required value={topic} onChange={e => setTopic(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Preferred time-slot</label>
                            <div className="control select is-fullwidth">
                                <select name="company" value={time} onChange={e => setTime(e.target.value)}>
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
                                <input type="email" name="email" className="input" required value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Your phone number</label>
                            <div className="control">
                                <input name="phone" className="input" value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>
                        </div>
                        <p className="has-text-centered">Please get in touch with me to confirm the consultation</p>
                    </div>}
                </div>
                {!sent && <footer className="modal-card-foot">
                    <button className={`button is-dark is-fullwidth ${(sending ? 'is-loading' : null)}`} type="submit">Send enquiry ⟶</button>
                </footer>}
            </div>
        </form>)
}

const NavLink = ({ currentPath, title, href, includesHref = false, hideFunction }) => {
    if (includesHref) {
        return <Link href={href} className={`navbar-item ${(currentPath.includes(href) ? 'is-active' : null)}`} onClick={() => hideFunction}>
            {title}</Link>
    } else {
        return <Link href={href} className={`navbar-item ${(currentPath === href ? 'is-active' : null)}`} onClick={() => hideFunction}>{title}</Link>
    }
}

export default function NavBar() {
    const [open, setOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const hide = () => setOpen(false)
    const router = useRouter()
    const isHomepage = router.pathname === '/';
    const path = router.pathname;

    return (
        <>
            <nav className={`navbar is-primary is-fixed-top`} role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link href="/" className="navbar-item">
                        <img src={'/mexpat-yellow-on-black.png'} alt="Malaga Expat logo" className="mr-3" />
                        <b>Malaga Expat</b>
                    </Link>
                    <a role="button" className={`navbar-burger ${open ? 'is-active' : ''}`} aria-label="menu" aria-expanded={open} data-target="navbar" onClick={() => setOpen(!open)}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div className={`navbar-menu ${open ? 'is-active' : ''}`}>
                    <div className='navbar-start'>
                        <div className="navbar-item">
                            <a className='consultation is-block has-background-dark is-hidden-touch is-hidden-widescreen' onClick={() => setModalOpen(true)}>ONLINE CONSULTATION!</a>
                            <a className='consultation is-block has-background-dark is-hidden-touch is-hidden-desktop-only' onClick={() => setModalOpen(true)}>BOOK YOUR ONLINE CONSULTATION!</a>
                        </div>
                    </div>
                    <div className="navbar-end">
                        {!isHomepage && <NavLink title="Home" href="/" currentPath={path} hideFunction={hide} />}
                        <NavLink title="About" href="/about" currentPath={path} hideFunction={hide} />
                        <NavLink title="Services" href="/our-services" currentPath={path} hideFunction={hide} />
                        <NavLink title="Information" href="/information" currentPath={path} includesHref={true} hideFunction={hide} />
                        <NavLink title="Testimonials" href="/testimonials" currentPath={path} hideFunction={hide} />
                        <NavLink title="Relocation Stories" href="/stories" currentPath={path} includesHref={true} hideFunction={hide} />
                        <NavLink title="Contact" href="/contact" currentPath={path} hideFunction={hide} />
                    </div>
                </div>
            </nav>
            {!modalOpen && !open && <div className='is-hidden-tablet has-background-dark p-2 has-text-centered' style={{ position: 'fixed', left: 0, right: 0, top: '3rem', zIndex: 100 }}>
                <a className='consultation is-block' onClick={() => setModalOpen(true)}>BOOK YOUR PERSONAL ONLINE CONSULATION!</a>
            </div>}
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </>
    )
}