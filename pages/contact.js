import { faCircle, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import Head from 'next/head'
import Link from 'next/link'
import { contactTitle, contactDescription } from '../utils/site'
import { useState } from 'react'

export default function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [company, setCompany] = useState('')
    const [content, setContent] = useState('')
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)
    const [failed, setFailed] = useState(false)

    const submit = async e => {
        e.preventDefault();
        setSending(true);
        setFailed(false);

        try {
            const res = await fetch(
                'https://api.malagaexpat.com/send_mail.php',   // ✅ updated URL
                {
                    method: 'POST',
                    body: JSON.stringify({ name, email, company, phone, content }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            const result = await res.json();
            setSending(false);

            if (result.ok) {
                setSent(true);
            } else {
                setFailed(true);
                alert("Error:\n" + JSON.stringify(result, null, 2));
            }
        } catch (err) {
            setSending(false);
            setFailed(true);
            console.error(err);
            alert("Error sending message: " + err.message);
        }
    }

    return (
        <>
            <Head>
                <title>{contactTitle}</title>
                <meta name="description" content={contactDescription} />
            </Head>
            <main>
                <div className="hero is-primary">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered">
                                <div className="column is-8">
                                    <h1 className="title is-1 has-text-centered">Contact</h1>
                                    <p className="subtitle is-4">
                                        If you require assistance with any matters listed in <Link href="/our-services">our services</Link> and more, or any help and advice about living or moving to Malaga and the Costa del Sol, please contact us by filling the below form and we will get back to you as soon as we can.
                                    </p>
                                </div>
                            </div>

                            <div className="columns is-centered">
                                <div className="column is-8">
                                    {sent && <div className='message is-success'>
                                        <div className="message-body has-text-centered">
                                            Your message has been sent, we will be in touch as soon as possible.
                                        </div>
                                    </div>}
                                    {failed && <div className='message is-danger'>
                                        <div className="message-body has-text-centered">
                                            Something went wrong while sending your message, please contact us via the details below or via our social media.
                                        </div>
                                    </div>}

                                    {!sent && !failed && <form onSubmit={submit}>
                                        <div className="columns">
                                            <div className="column">
                                                <div className="field">
                                                    <div className="control">
                                                        <input type="text" className="input is-large" placeholder="Name" required value={name} onChange={e => setName(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <div className="control">
                                                        <input type="email" className="input is-large" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <div className="control">
                                                        <input type="text" className="input is-large" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <div className="control">
                                                        <input type="text" className="input is-large" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="column">
                                                <div className="field" style={{ height: '100%' }}>
                                                    <div className="control" style={{ height: '100%' }}>
                                                        <textarea className="textarea is-large" style={{ height: '100%' }} placeholder="Message" required value={content} onChange={e => setContent(e.target.value)}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="is-flex">
                                            <button className={`button is-dark mx-auto is-large ${(sending ? 'is-loading' : '')}`} type="submit">Submit</button>
                                        </div>
                                    </form>}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
