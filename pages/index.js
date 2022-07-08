import Head from 'next/head'
import Link from 'next/link'
import Testimonials from '../components/home/Testimonials';
import API from '../utils/API';
import { homeTitle, homeDescription } from '../utils/site';
import InformationLinks from '../components/shared/InformationLinks';


export async function getStaticProps() {
    const informationLinks = await API.getJson('/pages/information')
    const featuredTestimonials = await API.getJson('/testimonials/featured')
    return {
        props: {
            informationLinks,
            featuredTestimonials
        },
        revalidate: 10 * 60
    }
}

export default function Home({ informationLinks, featuredTestimonials }) {

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
                                    <h1 className="title is-size-1">
                                        Malaga Expat <br /> Consulting
                                    </h1>
                                    <p className="subtitle is-size-4">Malaga Expat Consulting provides help and relocation support to all expats and foreign residents in Malaga and the Costa del Sol</p>
                                </div>
                            </div>
                            <div className="column is-4">
                                <img src="/mexpat-black-on-yellow-large.png" alt="Malaga Expat logo large" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section has-background-dark has-text-white">
                <div className="container">
                    <div className="columns content is-medium">
                        <article className="column is-7">
                            <p>Whether you are already a lucky long-term resident of Spain in the Costa del Sol or just planning your move to the beautiful province of Malaga, you may require help and assistance with Spanish bureaucracy or paperwork, dealing with authorities, applying for NIE or Residency, opening a bank account, changing your driving license, negotiating with your landlord or simply visiting a Spanish doctor…</p>
                            <p>We at Malaga Expat Consulting are happy to assist in a friendly and professional manner with all the above and much more. Our services cover a full range from expat assistance to relocation consultancy and are directed to all expats residing or planning to move to Malaga and the Costa del Sol.</p>
                            <p><b>Irina Saltmarsh</b></p>
                            <div className="is-flex is-justify-content-center my-6">
                                <Link href="/our-services"><a className="button is-primary is-large">Our services ⟶</a></Link>
                            </div>
                        </article>
                        <aside className="column is-5">
                            <div className="is-flex is-justify-content-center is-align-items-center p-6">
                                <img src="/irina-profile.jpg" alt="Irina Saltmarsh" style={{ borderRadius: '50%' }} />
                            </div>
                        </aside>
                    </div>
                </div>

            </section>
            <div className="columns m-0">
                <div className="column is-6 p-0">
                    <article className="content p-6">
                        <p>Spain and especially its southern area has always been a very popular destination for visitors from all over the world and unsurprisingly many of us have decided to make it our new home, charmed by this country&apos;s wonderful climate, natural beauty and in many ways a much more relaxed way of life. But without knowing the local language, customs, procedures and regulations the word &quot;relaxed&quot; is being quickly replaced with the word &quot;stressed&quot;.</p>
                        <p>Irina Saltmarsh, the founder and owner of Malaga Expat Consulting, knows it all too well, having herself relocated at least five times and lived in many different countries including Russia, Sweden, Germany, Switzerland and Spain, making the latter her permanent home since 2009. Armed by own relocation experience and understanding of expat&apos;s life in a foreign country combined with acquired knowledge of Spanish bureaucratic procedures, and being fluent in English, Russian, German and Spanish, Irina has founded Malaga Expat Consulting addressing the needs of expats in Malaga and the Costa del Sol.</p>
                        <p>Whether you are already residing in the province of Malaga or just considering your move to the sunny Costa del Sol, Malaga Expat Consulting can be your invaluable partner at any stage of the process. We can help you with advice about the right area to live, assist with finding the right property for you and your family to buy or to rent, locate the schools and nurseries for your children and help with enrolling process, register you and your family with local doctors.</p>
                        <p>Let us assist you with paperwork applying for NIE, Residency permit, Town Hall registrations and driving license, opening a bank account and just accompany you to any authority where they would normally only speak Spanish. We can make the settling down process for you and your family easier and stress-free by introducing you to the local professionals and competent organizations and help with any advice and recommendation to make your new life in Malaga happy and relaxed from day one - isn&apos;t it why moved here in the first place?</p>
                        <p><b>So get in touch and let us help you!</b></p>
                    </article>
                </div>
                <div className="column is-6 p-0">
                    <div className="is-flex is-align-items-center is-justify-content-center" style={{ height: '100%', backgroundImage: 'url(a.jpg)', backgroundPosition: 'top', backgroundSize: 'cover' }}>
                        <div className="content is-medium">
                            <blockquote className="mx-6 has-background-primary has-text-centered is-large p-6 mt-6">Our aim is to provide to all expats living in or relocating to the area of Malaga and the Costa del Sol competent help and assistance with all affairs, no matter how big or small, in a friendly and professional manner at a competitive price.</blockquote>
                            <div className="is-flex">
                                <Link href="/contact">
                                    <a className="button is-black is-large my-6 mx-auto">Contact Malaga Expat ⟶</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
