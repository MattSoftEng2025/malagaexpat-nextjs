import Head from 'next/head'
import Link from 'next/link'
import API from '../utils/API'
import { useContext } from 'react'
import { ModalContext } from '../components/contexts/ModalContext'

export async function getStaticProps() {
    const page = await API.getJson(`/pages/relocation-packages`)
    return {
        props: {
            page
        },
    }
}

export default function RelocationServices({ page }) {
    const { modalOpen, setModalOpen } = useContext(ModalContext)

    return (
        <>
            <Head>
                <title>Securing your paperwork and property needs in Malaga and Spain</title>
                <meta name="description" content='A customised relocation package with Malaga Expat will address all aspects of your move to Spain' />
            </Head>
            <main>
                <div className="hero is-primary">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered">
                                <div className="column is-7-desktop">
                                    <h1 className="title is-1 has-text-centered">Relocation Packages for a Smooth Move to Spain</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="section">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-7-desktop">
                                <div className="content is-medium">
                                    <p>If you want peace of mind knowing that every aspect of your relocation is professionally handled, our customised relocation packages are designed just for you. Whether you&apos;re moving alone, with a partner, or as a family, we offer flexible solutions that focus on what matters most: getting your paperwork and property matters sorted—efficiently and correctly.</p>

                                    <p>Spanish bureaucracy can be complex and overwhelming, especially if you&apos;re unfamiliar with the language and local systems. But with our experience and in-depth local knowledge, you don&apos;t have to navigate it alone. We&apos;ve helped many expats successfully transition to life in Spain, and we&apos;ve created service packages based on real needs, real questions, and real challenges that newcomers face every day.</p>
                                    <p>We offer two core types of relocation support, with the option to tailor each to your specific situation:</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section has-background-primary">
                    <div className="container">
                        <div className='columns is-centered'>
                            <div className='column is-12-tablet is-7-desktop'>

                                <div className="message">
                                    <div className="message-header">Paperwork Package</div>
                                    <div className="message-body content">
                                        <p>This package focuses on the most essential—and often the most overwhelming—part of moving to Spain: the administrative side. Whether you&apos;re applying for a visa, registering with the local authorities, or sorting out your residency paperwork, we&apos;re here to guide you every step of the way</p>
                                        <p>Services typically include:</p>
                                        <ul>
                                            <li>Visa & residency applications</li>
                                            <li>NIE/TIE assistance</li>
                                            <li>Town Hall registration (padrón)</li>
                                            <li>School enrolment support (for families)</li>
                                            <li>Social Security number</li>
                                            <li>Digital certificate setup</li>
                                            <li>And more, depending on your personal situation</li>
                                        </ul>
                                        <p>Each package is individually tailored based on your needs, and we provide a personalised quote following a detailed consultation.</p>
                                    </div>
                                </div>
                                <div className="message">
                                    <div className="message-header has-text-centred">Paperwork and Property Package</div>
                                    <div className="message-body content">
                                        <p>If you&apos;d also like help with finding a home, this comprehensive package combines administrative assistance with full property search support.</p>
                                        <p>We understand that choosing a property is a deeply personal decision, but professional guidance can save time, avoid mistakes, and open doors to options you might not find on your own. </p>
                                        <h4>What makes our property service different?</h4>
                                        <ul>
                                            <li>We work independently—we are not tied to any agents and receive no commission</li>
                                            <li>We represent only your interests</li>
                                            <li>We provide local insights, language support, and negotiation advice</li>
                                            <li>We help with shortlisting, scheduling viewings, and reviewing rental contracts</li>
                                            <li>Our property service is charged based on time and involvement—no flat fees, no surprises</li>
                                            <li>We adapt our level of involvement based on what you need</li>
                                        </ul>
                                        <p><Link href='/information/bespoke-property-finder-service-in-malaga'>Read about our Bespoke Property Finding Service</Link></p>
                                        <h4>Our Focus Area</h4>
                                        <p>As our name suggests, we specialise in Malaga and the surrounding Costa del Sol region. We believe in the value of true local knowledge—something that simply cannot be replicated remotely, especially when it comes to assistance in property search.</p>
                                        <p>That said, lots of administration support and especially Spanish Visas applications can be handled remotely, so even if you are relocating to another region and can benefit from our knowledge and expertise, we&apos;ll gladly accommodate that too.</p>
                                        <h4>Not sure what is right for You?</h4>
                                        <p>Every relocation is different, and we&apos;re happy to discuss your situation and recommend the best path forward. If you&apos;re unsure about what level of support you need—or simply want to better understand how we can help—feel free to reach out.</p>
                                        <p><Link href='contact'>Contact us today</Link> to book a consultation and start building a relocation plan that truly fits you.</p>
                                    </div>
                                </div>
                                <div className="is-flex is-justify-content-center my-6">
                                    <button className='button is-dark is-large' onClick={() => setModalOpen(!modalOpen)}>Book a consultation</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <section className="section">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-7">
                                <div className="content is-medium">
                                    <p>When it comes to the geographical areas, as name suggests, Malaga Expat Consulting is based in the province of Malaga, in the town of Alhaurin de la Torre, and covers the areas between Torre del Mar and Marbella on the coast, and up to Coin-Pizzara inland. Our work area can be extended up till Nerja in the east, and down till Estepona in the south, however the prices may be subject to additional surcharge.</p>
                                    <p>If you are unsure what is better for you and your family, whether you need a standard or a customised relocation package, or maybe just assistance with some single paperwork matters – do get in touch and let us assist you based on your personal requirements.</p>
                                    <hr /><Link href="/contact" className="button is-outlined is-dark is-fullwidth">Contact Malaga Expat ⟶</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
            </main>
        </>
    )
}