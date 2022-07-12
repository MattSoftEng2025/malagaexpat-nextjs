import Head from 'next/head'
import Link from 'next/link'
import InformationLinks from '../../components/shared/InformationLinks';
import API from '../../utils/API'

export async function getStaticProps() {
    const links = await API.getJson('/pages/information');
    return {
        props: {
            links
        },
        revalidate: 10 * 60
    }
}

export default function InformationIndex({ links }) {

    return (
        <main>
            <div className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-7 has-text-centered">
                                <h1 className="title is-1">Information</h1>
                                <p className="subtitle">Useful Information about living in, or moving to Malaga and Costa del Sol and paperwork matters for expats in Spain.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="section has-background-info">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-8-desktop">
                            <InformationLinks informationLinks={links} />
                            <div className="is-flex mb-6 mt-6">
                                <Link href="/our-services">
                                    <a className="button is-primary is-large mx-auto is-multiline">Discover more about our services ⟶</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>)
}