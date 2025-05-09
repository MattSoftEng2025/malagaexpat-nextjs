import Head from 'next/head'
import Link from 'next/link'
import { marked } from 'marked';
import Testimonials from '../components/home/Testimonials';
import API from '../utils/API';
import { homeTitle, homeDescription } from '../utils/site';
import InformationLinks from '../components/shared/InformationLinks';
import { postedOrLastUpdatedText } from '../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { ModalContext } from '../components/contexts/ModalContext'
import { useContext } from 'react';


const text = {
    title: 'Relocation & Admin Support for Expats in Spain',
    intro: 'Friendly, Professional Help for a Stress-Free Move to Malaga, Costa del Sol & Beyond',
    blurb: 'Relocating is one of life\'s biggest transitions, and often one of the most stressful. At **Malaga Expat Consulting**, we help take the pressure off your shoulders so you can focus on what truly matters: building a **new life in Spain** with clarity, confidence, and peace of mind. Whether you\'re already living in Spain or just starting to plan your move, we offer expert support in a structured, reliable, and personal way. From handling complicated paperwork to helping you find your future home, we\'re here to guide you through every step of the journey.',
    chooseSpain: 'Spain continues to be one of the world\'s most popular relocation destinations, and it\'s easy to see why. With its Mediterranean climate, stunning natural beauty, rich cultural life, and famously laid-back lifestyle, it\'s a place where many choose not just to holiday, but to start a new chapter. But that relaxed way of life can be hard to access at first, especially when you\'re faced with unfamiliar bureaucracy, language barriers, and complex legal processes. That\'s where we come in. Our mission is to **take the stress out of your relocation**, so you can enjoy the lifestyle that drew you to Spain in the first place.',
    meetIrina: 'Having relocated multiple times and lived in countries like Russia, Sweden, Germany, Switzerland, and finally Spain, Irina knows the relocation experience inside out. Since making Malaga her permanent home in 2017, she has helped hundreds of expats do the same, offering a combination of personal insight, deep local knowledge, and professional know-how. Fluent in English, Spanish, Russian and with some level of German, Irina leads **Malaga Expat Consulting** with a detail-oriented and highly organised approach—always tailored to the unique needs of each client.'
}

export async function getStaticProps() {
    const informationLinks = await API.getJson('/pages/information')
    const featuredTestimonials = await API.getJson('/testimonials/homepage')
    const latestStoryData = await API.getJson('/stories?count=4')

    return {
        props: {
            informationLinks,
            featuredTestimonials,
            latestStoryData
        },
    }
}

export default function Home({ informationLinks, featuredTestimonials, latestStoryData }) {
    const { modalOpen, setModalOpen } = useContext(ModalContext)

    return (
        <>
            <Head>
                <title>{homeTitle}</title>
                <meta name="description" content={homeDescription} />
            </Head>
            <section className="hero is-primary" style={{ backgroundImage: 'url(yellow-bg.jpg)', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <div className="hero-body">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-8 is-flex-tablet is-align-items-center">
                                <div className="">
                                    <h1 className="title is-size-1">{text.title}</h1>
                                    <p className="subtitle is-size-4">{text.intro}</p>
                                </div>
                            </div>
                            <div className="column is-hidden-mobile">
                                <img src="/mexpat-black-on-yellow-large.png" alt="Malaga Expat logo large" className='mx-auto' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section has-background-dark has-text-white">
                <div className="container">
                    <div className="columns content is-medium">
                        <article>
                            <div dangerouslySetInnerHTML={{ __html: marked(text.blurb) }}></div>
                            {/* <p className='has-text-centered-mobile mt-5'><b>Irina Saltmarsh</b></p> */}
                            <div className="is-flex is-justify-content-center my-6">
                                <Link href="/our-services" className="button is-primary is-large">Our services ⟶</Link>
                            </div>
                        </article>
                        {/* <aside className="column is-5">
                            <div className="is-flex is-justify-content-center is-align-items-center p-6">
                                <img src="/irina-profile.jpg" alt="Irina Saltmarsh" style={{ borderRadius: '50%' }} />
                            </div>
                        </aside> */}
                    </div>
                </div>
            </section>
            <section className='section py-6'>
                <div className='container'>
                    <div className="is-flex is-justify-content-center is-align-items-center p-6">
                        <img src="/irina-profile.jpg" alt="Irina Saltmarsh" style={{ borderRadius: '50%', maxWidth: '17rem' }} />
                    </div>
                    <h3 className="heading is-size-3 mb-5 has-text-centered">Meet Irina Saltmarsh, Founder of Malaga Expat Consulting</h3>
                    <div dangerouslySetInnerHTML={{ __html: marked(text.meetIrina) }} className='content is-medium'></div>
                    <div className="is-flex">
                        <Link className='button my-6 is-black is-large mx-auto' href='/about'>About Malaga Expat</Link>
                    </div>
                </div>
            </section>
            <section className='section' style={{ height: '100%', backgroundImage: 'url("andalusia-1.jpeg")', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <div className='container large-margin-top-desktop'>
                    <article className="content p-6" style={{ background: '#fff', opacity: '0.7', borderRadius: '1rem' }}>
                        <h4 className='title is-3 has-text-centered'>Why So Many People Choose Spain</h4>
                        <div dangerouslySetInnerHTML={{ __html: marked(text.chooseSpain) }} className='content is-medium'></div>
                    </article>
                </div>
            </section>
            <section className='section py-6 has-background-dark has-text-white'>
                <div className='container'>
                    <h3 className="heading is-size-3 mb-5 has-text-centered">What We Offer</h3>
                    <div className='content is-medium'>
                        <p>We provide a full range of relocation and administrative services to individuals, couples, and families, including:</p>
                        <ul>
                            <li>Visa and residency applications (NLV, DNV, EU residencies, and more)</li>
                            <li>NIE/TIE, Town Hall registration (padrón), Social Security numbers</li>
                            <li>Digital certificate setup and school enrolment support</li>
                            <li>Property search assistance and rental contract reviews</li>
                            <li>Private health insurance from Spain&apos;s leading provider Sanitas</li>
                            <li>Full Relocation Packages tailored to your needs</li>
                            <li>One-on-one consultations and trusted referrals to legal, tax, and other professionals.</li>
                        </ul>
                        <p>Whether you&apos;re just getting started or already on the ground in Spain, we can support you at any stage of the process.</p>
                    </div>
                    <div className="is-flex">
                        <Link className='button my-6 is-black is-large mx-auto' href='/our-services'>Our services</Link>
                    </div>
                </div>
            </section>
            <section className='section py-6 has-text-white' style={{ height: '100%', backgroundImage: 'url("sunset.jpg")', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <div className='container py-6 medium-margin-desktop'>
                    <h3 className="heading is-size-3 mb-5 has-text-centered">Local &amp; remote support</h3>
                    <div className='content is-medium'>
                        <p>Malaga Expat Consulting is <b>based in Malaga</b> and specialises in the <b>Costa del Sol</b> region, where we&apos;ve built strong local insight and a reliable professional network. For services like <b>property search assistance</b>, we work exclusively in this local area to ensure high-quality, on-the-ground support.</p>
                        <p>However, <b>many of our administrative services</b> - including <b>visa applications (such as DNVs and NLVs), residency permits, and other paperwork-related assistance</b> - can be handled <b>remotely across Spain</b>. This means that even if you&apos;re relocating to another region, you can still benefit from our professional guidance and experience.</p>
                    </div>
                </div>
            </section>

            <div className='columns is-multiline'>
                <div className='column is-12-tablet is-6-widescreen has-background-dark has-text-white'>
                    <div className='p-6 content'>
                        <h3 className="has-text-white is-size-3 mb-5">Why Work With Us</h3>
                        <div id="services">
                            <ul>
                                <li><span className='icon-text'><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span><span>We combine professionalism with a personal touch</span></span></li>
                                <li><span className='icon-text'><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span><span>We&apos;re fully independent and act only in your best interest</span></span></li>
                                <li><span className='icon-text'><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span><span>We offer structured, very efficient, and transparent support</span></span></li>
                                <li><span className='icon-text'><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span><span>We understand the expat experience—because we&apos;ve lived it too</span></span></li>
                                <li><span className='icon-text'><span className="icon"><FontAwesomeIcon icon={faCheckSquare} /></span><span>We&apos;re passionate about helping you feel at home</span></span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='column is-12-tablet is-6-widescreen has-background-primary'>
                    <div className='p-6 content'>
                        <h3>Start Your Spanish Life the Right Way</h3>
                        <p>Whether you&apos;re navigating the Spanish bureaucracy, finding your new home, or just figuring out where to begin—we&apos;re here to help. We take the unnecessary stress and confusion out of relocation, so you can focus on enjoying the lifestyle that brought you to Spain in the first place.</p>
                        <p>Get in touch today to schedule a consultation and see how we can support your move to Malaga or anywhere in Spain.</p>
                        <p>Let&apos;s make your relocation smooth, successful, and as stress-free as possible</p>
                    </div>
                </div>
            </div>
            <section className='section py-6 has-background-light'>
                <div className='container'>
                    <h3 className="heading is-size-3 mb-5 has-text-centered">Relocation stories</h3>
                    <div className='columns is-multiline'>
                        {latestStoryData.latest.map(story =>
                            <div className='column is-6-desktop is-12-tablet' key={story.title}>
                                <div className='content is-medium p-3'>
                                    <span className='is-heading is-size-7'>{postedOrLastUpdatedText(story.lastUpdated, story.publishDate)}</span>
                                    <h4 className='mb-2'>{story.title}</h4>
                                    <p>{story.snippet}</p>
                                    <Link href={`/story/${story.permalink}`} className="ml-auto m-3 button is-primary is-dark">Read more ⟶</Link>
                                </div>
                            </div>
                        )
                        }
                    </div>
                    {latestStoryData.totalStories > 3 &&
                        <div className='is-flex'>
                            <Link href="/stories" className="my-6 mx-auto button is-dark">Read more relocation stories ⟶</Link>
                        </div>
                    }
                </div>
            </section>
            <section className="section has-background-info">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-8">
                            <h3 className="has-text-primary is-size-1 mb-5 has-text-centered">Information</h3>
                            <InformationLinks informationLinks={informationLinks} />
                        </div>
                    </div>
                </div>
            </section>
            <Testimonials testimonials={featuredTestimonials} />
        </>
    )
}
