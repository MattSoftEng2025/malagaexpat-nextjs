import Head from 'next/head'
import Link from 'next/link'
import API from '../utils/API'
import { postedOrLastUpdatedText } from '../utils/helpers'

export async function getStaticProps() {
    const page = await API.getJson(`/pages/disclaimer`)
    return {
        props: {
            page
        },
    }
}

export default function Disclaimer({ page }) {
    return (
        <>
            <Head>
                <title>{page.metaTitle}</title>
                <meta name="description" content={page.metaDescription} />
            </Head>
            <main>
                <div className="hero is-primary">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered has-text-centered">
                                <div className="column is-7-desktop">
                                    <h1 className="title is-1">{page.title}</h1>
                                    <p className="subtitle is-4">{postedOrLastUpdatedText(page.lastUpdated, page.publishDate)}</p>
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
                                    <article dangerouslySetInnerHTML={{ __html: page.content }}></article>
                                </div>
                                <div className="columns">
                                    <div className="column is-4">
                                        <Link href="/contact">
                                            <a className="button is-outlined is-dark is-fullwidth">Contact Malaga Expat ⟶</a>
                                        </Link>
                                    </div>
                                    <div className="column is-4">
                                        <Link href="/our-services">
                                            <a className="button is-outlined is-dark is-fullwidth">View our services ⟶</a>
                                        </Link>
                                    </div>
                                    <div className="column is-4">
                                        <Link href="/about">
                                            <a className="button is-outlined is-dark is-fullwidth">About ⟶</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>)
}