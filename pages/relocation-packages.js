import Head from 'next/head'
import Link from 'next/link'
import API from '../utils/API'

export async function getStaticProps() {
    const page = await API.getJson(`/pages/relocation-packages`)
    return {
        props: {
            page
        },
        revalidate: 10 * 60
    }
}

export default function RelocationServices({ page }) {
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
                                    <h1 className="title is-2">{page.title}</h1>
                                    <p className="subtitle is-5">If you wish to be sure all aspects of your relocation to Spain are covered, you might be interested in the relocation packages with Malaga Expat Consulting addressed at securing the paperwork and/or property requirements for you and your family. </p>
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