import Link from 'next/link'
import API from '../../utils/API'
import { postedOrLastUpdatedText } from '../../utils/helpers';

export async function getStaticProps({ params }) {
    const res = await API.get('/stories')
    if (!res.ok) {
        return {
            notFound: true
        }
    }

    const data = await res.json();
    return {
        props: {
            stories: data
        },
    }
}
export default function StoriesIndex({ stories }) {
    return (
        <main>
            <div className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-7 has-text-centered">
                                <h1 className="title is-1">Relocation Stories</h1>
                                <p className="subtitle">Here we would like to share with you the real stories of real people (individuals, couples and families) who have taken the leap and relocated to Spain, to the beautiful area of Malaga and Costa del Sol. Real people like you, of different backgrounds, who are willing to share their real experiences of relocating and building their new life in Spain. We hope you will find it useful, and who knows - maybe one day your own story will be published here?!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="section">
                <div className="container">
                    <div className="stories is-centered">
                        {stories.map((story, i) =>
                            <div key={story.title}>
                                <div className='content is-large'>
                                    <span className='is-heading is-size-6'>{postedOrLastUpdatedText(story.lastUpdated, story.publishDate)}</span>
                                    <h4 className='mb-2'>{story.title}</h4>
                                    <div className='columns'>
                                        <p className='column is-10'>{story.snippet}</p>
                                        <div className='is-flex column is-2'>
                                            <Link href={`/story/${story.permalink}`} className="ml-auto m-3 button is-primary is-dark">Read more ⟶</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main >
    )
}