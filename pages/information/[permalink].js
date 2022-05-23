import Head from 'next/head'
import Link from 'next/link'
import ShareBar from '../../components/layout/ShareBar';
import API from '../../utils/API'
import { formatDate } from '../../utils/helpers';

export async function getStaticPaths() {
    const permalinks = await API.getJson('/pages');
    const paths = permalinks.map(permalink => { return { params: { permalink } } })
    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params }) {
    const res = await API.get(`/pages/${params.permalink}`)
    if (!res.ok) {
        return {
            notFound: true
        }
    }

    const data = await res.json();
    return {
        props: {
            page: data
        },
        revalidate: 10 * 60
    }
}

export default function InformationDetail({ page }) {
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
                                    <h1 className="title is-size-2">{page.title}</h1>
                                    <p className="subtitle is-size-5">{page.lastUpdated ? `Last updated on ${formatDate(page.lastUpdated)}` : `Published on ${formatDate(page.publishDate)}`}</p>
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
                {/* <ShareBar url={`/information/${page.permalink}`} metaDescription={page.metaDescription} /> */}
            </main>
        </>)
}