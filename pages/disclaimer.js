import Head from 'next/head'
import Link from 'next/link'
import API from '../utils/API'

export async function getStaticProps({ params }) {
    const page = await API.getJson(`/pages/disclaimer`)
    return {
        props: {
            page
        },
        revalidate: 10 * 60
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
                            <div className="columns">
                                <div className="column is-7-desktop">
                                    <h1 className="title">{page.title}</h1>
                                    <p className="subtitle">{page.creationDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="section">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-7-desktop">
                                <div className="content is-medium">
                                    <article dangerouslySetInnerHTML={{ __html: page.content }}></article>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>)
}