import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function OurServices() {

    return (
        <>
            <Head>
                <title>Our Services - Malaga Expat proto</title>
            </Head>
            <section className="hero" style={{ background: '#FFCC00' }}>
                <div className="hero-body">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-7">
                                <h1 className="title is-size-2">
                                    Business Services
                                </h1>
                                <p className="subtitle is-size-4">
                                    Our services cover a broad range of matters, from assistance with paperwork, language and Spanish bureaucracy to relocation consultancy and advice, and are directed to all expats residing or planning to move to Malaga and the Costa del Sol.
                                </p>
                                <p>
                                    Our most distinctive feature in all we do is a professional and structured approach with focus to details and high level of commitment to customer requirements. Below we list just some of the services we can provide in Malaga and the Costa del Sol, but please contact us with your requirements and we will be happy to customize our service proposal for you.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="columns content is-medium">
                        <div className="column is-6">
                            <h5>PAPERWORK, AUTHORITIES AND INSTITUTIONS</h5>
                            <ul>
                                <li>Applying for NIE</li>
                            </ul>
                        </div>
                        <div className="column is-6">
                            <h5>LANGUAGE MATTERS</h5>
                            <ul>
                                <li>Review and explanation of various documents in Spanish: contracts, letters, notifications, etc</li>
                            </ul>
                        </div>
                    </div>
                    <Link href="/information/about-malaga"><a className="button is-large">About Malaga</a></Link>
                </div>
            </section>
        </>
    )
}
