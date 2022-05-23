import Head from 'next/head'
import Link from 'next/link'
import API from '../utils/API';
import Testimonials from '../components/home/Testimonials'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';

export async function getStaticProps() {
    const randomTestimonials = await API.getJson('/testimonials/random')
    return {
        props: {
            randomTestimonials
        },
        revalidate: 10 * 60
    }
}

export default function OurServices({ randomTestimonials }) {

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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container content is-medium">
                    <div className="columns">
                        <div className="column is-7">
                            <blockquote><p>Our most distinctive feature in all we do is a professional and structured approach with focus to details and high level of commitment to customer requirements. Below we list just some of the services we can provide in Malaga and the Costa del Sol, but please contact us with your requirements and we will be happy to customize our service proposal for you.</p></blockquote>
                        </div>

                    </div>
                    <hr />
                    <div className="columns">
                        <div className="column is-6">
                            <h5>Paperwork, Authorities, and Institutions</h5>
                            <ul>
                                <li>Applying for NIE</li>
                                <li>Applying for Residencia</li>
                                <li>Town Hall registrations</li>
                                <li>Registration with Social security and local doctor</li>
                                <li>Opening bank account and assisting with money transfer</li>
                                <li>Getting insurance quotes including private health insurance</li>
                                <li>Connecting utilities, including telephone and internet</li>
                                <li>Accompanying to any authority or institution you may need to visit</li>
                                <li>Registration of Civil Partnerships <em>Pareja de Hecho</em> with Junta de Andalusia</li>
                                <li>Applying for Tourist Letting License from Junta de Andalusia for your property which you rent out as holiday let</li>
                                <li>Changing/renewing driving licence</li>
                                <li>Transferring car ownership</li>
                                <li>Changing of address for car and driving license</li>
                                <li>Helping with car import and registration</li>
                            </ul>
                        </div>
                        <div className="column is-6">
                            <h5>Language Matters</h5>
                            <ul>
                                <li>Review and explanation of various documents in Spanish: contracts, letters, notifications, etc</li>
                                <li>Negotiating or communicating with your landlord</li>
                                <li>Accompanying to the doctor</li>
                            </ul>
                            <h5>Starting your business</h5>
                            <ul>
                                <li>Introducing to competent professionals (lawyers, accountants, etc) for advice and consultations as well as proper business registration</li>
                                <li>Assistance with finding business premises for rent</li>
                                <li>Assistance with building a business plan</li>
                            </ul>
                            <h5>Settling down and building your new happy life</h5>
                            <ul>
                                <li>Help in finding suitable property, to buy or to rent.</li>
                                <li>Help in finding suitable schools and help with enrolling process</li>
                                <li>Advice about doctors, shops and other facilities</li>
                                <li>Any general advice or recommendation</li>
                            </ul>
                        </div>
                    </div>
                    <div className="is-flex is-align-items-center is-justify-content-center">
                        <Link href="/relocation-packages">
                            <a className="button is-primary is-large mt-6">Relocation Packages</a>
                        </Link>
                    </div>
                </div>
            </section>
            <div className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <article className="content is-large has-text-centered">
                            <p>If you already live in <b>Malaga</b> and the <b>Costa del Sol</b> or are just planning to move to <b>Spain</b>, don&apos;t hesitate to contact us with any assistance you may require, even if it is not listed in the services above. If we can help in a professional manner, ourselves or through our local contact network, we will be happy to do so!</p>
                            <Link href="/contact"><a className="button is-large is-dark mt-4">Get in touch today ⟶</a></Link>
                        </article>
                    </div>
                </div>
            </div>
            <Testimonials testimonials={randomTestimonials} />
        </>
    )
}
