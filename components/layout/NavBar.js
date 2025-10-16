import Link from 'next/link'
import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { ModalContext } from '../contexts/ModalContext'

// ✅ Set this in .env.local: NEXT_PUBLIC_CONSULTATION_ENDPOINT=https://php.your-host.com/consultation.php
const CONSULTATION_ENDPOINT = process.env.NEXT_PUBLIC_CONSULTATION_ENDPOINT

function Modal({ modalOpen, setModalOpen }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [time, setTime] = useState('Any time')
  const [topic, setTopic] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [failed, setFailed] = useState(false)

  const submit = async (e) => {
    if (sent) return
    e.preventDefault()

    // Hard-stop if the env isn’t set (helps during dev)
    if (!CONSULTATION_ENDPOINT) {
      console.error('Missing NEXT_PUBLIC_CONSULTATION_ENDPOINT')
      setFailed(true)
      return
    }

    setSending(true)

    const payload = {
      name,
      email,
      phone,
      service: topic,                 // map your "topic" to service
      preferredTime: time,            // renamed from company -> preferredTime
      message: `Consultation topic: ${topic}\nPreferred time-slot: ${time}`,
      company: ''                     // honeypot – always empty for humans
    }

    try {
      const res = await fetch(CONSULTATION_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => null)
      setSending(false)

      if (res.ok && data?.ok) {
        setSent(true)
      } else {
        setFailed(true)
      }
    } catch (err) {
      setSending(false)
      setFailed(true)
    }
  }

  return (
    <form className={`modal ${modalOpen ? 'is-active' : ''}`} onSubmit={submit}>
      <div className="modal-background" onClick={() => setModalOpen(false)}></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-primary">
          <p className="modal-card-title is-size-5">Book Your Personal Consultation</p>
          <button className="delete" aria-label="close" onClick={() => setModalOpen(false)}></button>
        </header>
        <div className="modal-card-body">
          {sent && (
            <div className="message is-success">
              <div className="message-body has-text-centered">
                Your message has been sent, we will be in touch as soon as possible.
              </div>
            </div>
          )}
          {failed && (
            <div className="message is-danger">
              <div className="message-body has-text-centered">
                Something went wrong while sending your message, please contact us via the details below or via our social media.
              </div>
            </div>
          )}

          {!sent && !failed && (
            <div className="content">
              <p>
                Book your personal ONLINE consultation to answer any of your questions about relocation to Spain, immigration procedures,
                paperwork requirements and general advice.
              </p>
              <p>
                The price is <b>60€</b> (plus VAT) which is fully deductible from any future relocation packages contracted through Malaga Expat Consulting.
              </p>

              {/* Honeypot (bots will fill, humans won't see/use) */}
              <input type="text" name="company" tabIndex="-1" autoComplete="off" style={{ display: 'none' }} />

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
                  {/* renamed name to preferredTime (was company) */}
                  <select name="preferredTime" value={time} onChange={e => setTime(e.target.value)}>
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
            </div>
          )}
        </div>

        {!sent && (
          <footer className="modal-card-foot">
            <button className={`button is-dark is-fullwidth ${sending ? 'is-loading' : ''}`} type="submit">
              Send enquiry ⟶
            </button>
          </footer>
        )}
      </div>
    </form>
  )
}

const NavLink = ({ currentPath, title, href, includesHref = false, hideFunction }) => {
  if (includesHref) {
    return (
      <Link href={href} className={`navbar-item ${currentPath.includes(href) ? 'is-active' : ''}`} onClick={hideFunction}>
        {title}
      </Link>
    )
  } else {
    return (
      <Link href={href} className={`navbar-item ${currentPath === href ? 'is-active' : ''}`} onClick={hideFunction}>
        {title}
      </Link>
    )
  }
}

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const hide = () => setOpen(false)
  const router = useRouter()
  const path = router.pathname

  const { modalOpen, setModalOpen } = useContext(ModalContext)

  return (
    <>
      <nav className="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link href="/" className="navbar-item" onClick={hide}>
            <img src={'/mexpat-yellow-on-black.png'} alt="Malaga Expat logo" className="mr-3" />
            <b>Malaga Expat</b>
          </Link>
          <a
            role="button"
            className={`navbar-burger ${open ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded={open}
            data-target="navbar"
            onClick={() => setOpen(!open)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu ${open ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <div className="navbar-item">
              <a className="consultation is-block has-background-dark is-hidden-touch is-hidden-widescreen" onClick={() => setModalOpen(true)}>
                ONLINE CONSULTATION!
              </a>
              <a className="consultation is-block has-background-dark is-hidden-touch is-hidden-desktop-only" onClick={() => setModalOpen(true)}>
                BOOK YOUR ONLINE CONSULTATION!
              </a>
            </div>
          </div>
          <div className="navbar-end">
            <NavLink title="About" href="/about" currentPath={path} hideFunction={hide} />
            <NavLink title="Services" href="/our-services" currentPath={path} hideFunction={hide} />
            <NavLink title="Information" href="/information" currentPath={path} includesHref={true} hideFunction={hide} />
            <NavLink title="Testimonials" href="/testimonials" currentPath={path} hideFunction={hide} />
            <NavLink title="Relocation Stories" href="/stories" currentPath={path} includesHref={true} hideFunction={hide} />
            <NavLink title="Contact" href="/contact" currentPath={path} hideFunction={hide} />
          </div>
        </div>
      </nav>

      {!modalOpen && !open && (
        <div className="is-hidden-tablet has-background-dark p-2 has-text-centered" style={{ position: 'fixed', left: 0, right: 0, top: '3rem', zIndex: 100 }}>
          <a className="consultation is-block" onClick={() => setModalOpen(true)}>
            BOOK YOUR PERSONAL ONLINE CONSULTATION!
          </a>
        </div>
      )}

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  )
}
