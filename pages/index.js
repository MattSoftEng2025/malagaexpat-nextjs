import Head from 'next/head'
import Link from 'next/link'
import Testimonials from '../components/home/Testimonials';
import Testimonial from '../components/shared/Testimonial';
import API from '../utils/API';

export async function getStaticProps() {
    const informationLinks = await API.getJson('/pages/information');
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
                <title>Malaga Expat proto</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-7">
                                <h1 className="title is-size-2">
                                    Malaga Expat <br /> Consulting
                                </h1>
                                <p className="subtitle is-size-4">Malaga Expat Consulting provides help and relocation support to all expats and foreign residents in Malaga and the Costa del Sol</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="columns content is-medium">
                        <div className="column is-7">
                            <p>Whether you are already a lucky long-term resident of Spain in the Costa del Sol or just planning your move to the beautiful province of Malaga, you may require help and assistance with Spanish bureaucracy or paperwork, dealing with authorities, applying for NIE or Residency, opening a bank account, changing your driving license, negotiating with your landlord or simply visiting a Spanish doctor…</p>
                            <p>We at Malaga Expat Consulting are happy to assist in a friendly and professional manner with all the above and much more. Our services cover a full range from expat assistance to relocation consultancy and are directed to all expats residing or planning to move to Malaga and the Costa del Sol.</p>
                            <Link href="/our-services"><a className="button is-large">Our services</a></Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section has-background-primary">
                <div className="container has-text-centered">
                    <Link href="/contact">
                        <a className="button is-black is-large">Contact Malaga Expat</a>
                    </Link>
                </div>
            </section>
            <section className="section has-background-info">
                <div className="container">
                    <h3 className="has-text-centered has-text-primary is-size-1 mb-5">Information</h3>
                    {informationLinks.map(link => (
                        <div key={link.permalink} className="block has-text-centered">
                            <Link href={`/information/${link.permalink}`}><a className="button is-dark is-fullwidth is-size-4" style={{ height: '100%!important' }}>{link.title}</a></Link>
                        </div>
                    ))}
                </div>
            </section>
            <Testimonials testimonials={featuredTestimonials} />
        </>
    )
}
