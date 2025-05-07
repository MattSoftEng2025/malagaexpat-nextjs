import Head from 'next/head'
import Link from 'next/link'
import API from '../utils/API';
import Testimonials from '../components/home/Testimonials'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckSquare, faHandshake, faSuitcaseRolling, faTruckMoving } from '@fortawesome/free-solid-svg-icons';

export async function getStaticProps() {
    const randomTestimonials = await API.getJson('/testimonials/homepage')
    return {
        props: {
            randomTestimonials
        },
    }
}

export default function OurServices({ randomTestimonials }) {

    return (
        <>
            <Head>
                <title>Our Services - Malaga Expat</title>
            </Head>
            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-7">
                                <h1 className="title is-size-1 has-text-centered">
                                    Relocation Services in <br />Malaga & Spain
                                </h1>
                                <p className="subtitle is-size-4">Relocating to a new country is a major life event and while relocation to Spain can be exciting, but it is also complex. That’s where we come in. With years of experience and hundreds of successful relocations under our belt, we provide expert, end-to-end support to help you move with confidence and ease.</p>
                                <div className="is-flex is-justify-content-center is-align-items-center p-6">
                                    <img src="/irina-profile-new-may-2025.jpg" alt="Irina Saltmarsh" style={{ borderRadius: '50%', maxWidth: '17rem' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='section has-background-dark has-text-white'>
                <div className='container content is-medium'>
                    <h4 className='has-text-white'>Immigration & Paperwork Assistance</h4>
                    <p>We help you navigate Spain&apos;s bureaucratic landscape with confidence, offering full support for:</p>
                    <ul>
                        <li>NIE & TIE applications</li>
                        <li>EU residency certificates (green NIE)</li>
                        <li>Residency for non-EU family members of EU citizens</li>
                        <li>Non-Lucrative Visas (NLVs) - new applications & renewals</li>
                        <li>Digital Nomad Visas (DNVs) - new applications & renewals</li>
                        <li>&ldquo;Brexit&rdquo; based residencies for UK citizens and renewals</li>
                        <li>Permanent residency (EU and non-EU citizens)</li>
                        <li>Spanish nationality through residency</li>
                        <li>Town Hall (padrón) registration</li>
                        <li>School enrolment for children</li>
                        <li>Social Security number applications</li>
                        <li>Digital certificate setup</li>
                    </ul>
                    <hr />
                    <h4 className='has-text-white'>Property Support</h4>
                    <p>Finding a home in Spain can be overwhelming. We&apos;re here to make it easier with:</p>
                    <ul>
                        <li><Link className='has-text-primary' href='/information/bespoke-property-finder-service-in-malaga'>Personalised property search assistance.</Link></li>
                        <li>Contract review & guidance for rental agreements</li>
                        <li>Tourist license applications for short-term rentals</li>
                    </ul>
                    <hr />
                    <h4 className='has-text-white'>Private Health Insurance</h4>
                    <p>As an exclusive agent of Spain&apos;s most reliable insurance provider <b>Sanitas</b>, we offer a variety of health insurance options to meet your visa or personal needs.</p>
                    <Link className='button is-primary' href='/arranging-private-health-insurance-cover'>Arranging private health insurance cover</Link>
                    <hr />
                    <h4 className='has-text-white'>Full Relocation Packages</h4>
                    <p>We offer comprehensive relocation packages tailored to your individual circumstances. These may include a combination of:</p>
                    <ul>
                        <li>Immigration paperwork</li>
                        <li>Housing support</li>
                        <li>School search and enrolment</li>
                        <li>Admin tasks and more</li>
                    </ul>
                    <p>Each package is designed with your specific timeline, preferences, and priorities in mind.</p>
                    <p><Link className='button is-primary' href='/relocation-packages'>Relocation packages</Link></p>
                    <hr />
                    <h4 className='has-text-white'>One-on-One Consultations</h4>
                    <p>Need guidance on a specific issue? We offer personalised consultations to help you understand:</p>
                    <ul>
                        <li>Visa options & application strategy</li>
                        <li>Property search tips</li>
                        <li>Administrative requirements</li>
                        <li>Relocation planning and more</li>
                    </ul>
                    <button className='button is-primary' onClick={() => setModalOpen(!modalOpen)}>Book a consultation</button>
                    <hr />
                    <h4 className='has-text-white'>Trusted Referrals</h4>
                    <p>We&apos;ve built a strong network of trusted professionals across the Costa del Sol. When needed, we can connect you with:</p>
                    <ul>
                        <li>Tax advisors & accountants</li>
                        <li>Financial consultants</li>
                        <li>Legal professionals</li>
                        <li>Car import & registration experts</li>
                    </ul>
                </div>
            </section>

            {/* <section className="section">
                <div className="container content is-medium">
                    <blockquote><p>Whether you&apos;re planning your relocation or already living in Malaga, we&apos;re here to simplify the process—from visas and paperwork to finding your new home and enrolling your children in school. Our approach is highly organised and structured, detail-oriented, and fully tailored to your needs. Most importantly, we love what we do—and it shows in everything we offer.</p></blockquote>
                    <div className="is-flex mb-6 mt-4">
                        <Link href="/relocation-packages" className="button is-multiline is-primary is-large mx-auto">
                            <span className='icon is-small mr-3'>
                                <FontAwesomeIcon icon={faTruckMoving} />
                            </span>
                            <span>Relocation Packages ⟶</span>

                        </Link>
                    </div>
                    <div className="columns" id="services">
                        <div className="column is-6">
                            <h5>Paperwork, Authorities, and Institutions</h5>
                            <ul>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Applying for NIE</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Applying for Residencia</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Town Hall registrations</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Registration with Social security and local doctor</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Opening bank account and assisting with money transfer</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Getting insurance quotes including private health insurance</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Connecting utilities, including telephone and internet</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Accompanying to any authority or institution you may need to visit</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Registration of Civil Partnerships <em>Pareja de Hecho</em> with Junta de Andalusia</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Applying for Tourist Letting License from Junta de Andalusia for your property which you rent out as holiday let</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Changing/renewing driving licence</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Transferring car ownership</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Changing of address for car and driving license</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Helping with car import and registration</li>
                            </ul>
                        </div>
                        <div className="column is-6">
                            <h5>Language Matters</h5>
                            <ul>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Review and explanation of various documents in Spanish: contracts, letters, notifications, etc</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Negotiating or communicating with your landlord</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Accompanying to the doctor</li>
                            </ul>
                            <h5>Starting your business</h5>
                            <ul>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Introducing to competent professionals (lawyers, accountants, etc) for advice and consultations as well as proper business registration</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Assistance with finding business premises for rent</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Assistance with building a business plan</li>
                            </ul>
                            <h5>Settling down and building your new happy life</h5>
                            <ul>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Help in finding suitable property, to buy or to rent.</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Help in finding suitable schools and help with enrolling process</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Advice about doctors, shops and other facilities</li>
                                <li><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span> Any general advice or recommendation</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section> */}
            <div className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <article className="content is-large has-text-centered">
                            <p>Whether you&apos;re just starting to explore your move or you&apos;re already living in Spain and need extra support, don’t hesitate to reach out. Even if the service you’re looking for isn’t listed here—just ask. If we can help directly or through our network, we&apos;ll be glad to assist.</p>
                            <p><Link href="/contact"><b>Get in touch today</b></Link> to schedule a consultation or learn more about how we can support your journey to life in Spain.</p>

                        </article>
                    </div>
                </div>
            </div>
            <Testimonials testimonials={randomTestimonials} />
        </>
    )
}
