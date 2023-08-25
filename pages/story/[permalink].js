import { postedOrLastUpdatedText } from '../../utils/helpers';
import Link from 'next/link';
import API from '../../utils/API';

export async function getStaticPaths() {
    const permalinks = await API.getJson('/stories/paths');
    const paths = permalinks.map(permalink => { return { params: { permalink } } })
    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params }) {
    const res = await API.get(`/stories/${params.permalink}`)
    if (!res.ok) {
        return {
            notFound: true
        }
    }

    const data = await res.json();
    return {
        props: {
            story: data
        },
    }
}

export default function StoryDetail({ story }) {
    return (
        <main>
            <div className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-7-desktop">
                                <small className='heading'>Relocation story</small>
                                <h1 className="title is-size-2">{story.title}</h1>
                                <p className="subtitle is-size-5">{postedOrLastUpdatedText(story.lastUpdated, story.publishDate)}</p>
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
                                <article dangerouslySetInnerHTML={{ __html: story.content }}></article>
                                <Link href="/stories" className='button mt-5'>⟵ Back to relocation stories</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}