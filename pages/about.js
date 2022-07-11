import Head from 'next/head'
import Link from 'next/link'
import API from '../utils/API'
import { postedOrLastUpdatedText } from '../utils/helpers'

export async function getStaticProps() {
    const page = await API.getJson(`/pages/about`)

    return {
        props: {
            page
        },
        revalidate: 10 * 60
    }
}

export default function About({ page }) {
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
                            <div className="columns is-centered">
                                <div className="column is-7-desktop">
                                    <h1 className="title is-1 has-text-centered">{page.title}</h1>
                                    <p className="subtitle is-4">Malaga Expat Consulting was founded by Irina Saltmarsh with the aim of providing help and assistance to all expats living or moving to Spain, to the area of Malaga and the Costa del Sol. Being herself an &ldquo;expat with experience&rdquo; Irina understands all too well how one feels moving yours and your family&apos;s life to a foreign country, no matter how friendly and open this country might be.</p>
                                    <div className="columns is-centered">
                                        <div className="column is-6 has-text-centered">
                                            <div className="is-flex">
                                                <figure className='image mx-auto'>
                                                    <img src="/irina-bw-large.jpg" alt="Irina Saltmarsh in black and white" className='is-rounded' />
                                                </figure>
                                            </div>
                                            <p className="mt-3 has-background-primary title is-2">Irina Saltmarsh</p>
                                            <p className="subtitle is-5">English / German / Russian / Spanish</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="section">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-7-desktop">
                                <article className="content is-medium">
                                    <p>Coming originally from Russia Irina studied Philology and Law in the St. Petersburg State University and graduated with two Master degrees in the above specialities. She first joined the world expat community in 2002 when she moved from Russia to Sweden following work commitments. Since then she has navigated at least four additional relocations and lived in several different countries including Sweden, Germany, Switzerland and Spain. She met her husband Rick in Switzerland and has been happily married since 2004, giving birth to her amazing daughter in 2015 and now living in Spain with her happy and very international family combining four different nationalities (Spanish, English, Russian and Swiss).</p>
                                    <p>Initially, Irina worked as a professional in a large multinational corporation making a successful business career within sales and management. When, in 2009, she and her husband both decided to leave their brilliant careers and highly paid, but stressful jobs, to build a new happier and more relaxed life in Spain. Initially moving to Tenerife, together they built an estate agency, from scratch, making it into a market leader, then successfully selling it several years later (only to move once again!) to the beautiful province of Malaga where they are living now, and truly loving it!</p>
                                    <p>During her years in Spain Irina not only learned Spanish to add to her list of spoken languages, which also includes English, German and Russian, but she also got very familiar with Spanish legislation and local customs involving administration and paperwork procedures, specifically for expats deciding to live and run businesses in Spain.</p>
                                    <p>With numerous relocations behind her and a diverse expat experience of living and working in different countries, both employed and as a small business owner, Irina understands better than anyone what one goes through moving and settling down in a new country. There are a vast array of matters to consider, prepare and later to deal with. Especially if you do not understand the local language and legislation, and have no one to go to for advice. Irina can be your trusted consultant and a point of contact in any matters, big or small, if you require help, assistance or a simple advice related to your life in Malaga. It is only natural to feel worried or disconcerted about your move, but these things can be easily managed if you have a professional “helping hand” like the one offered by <b>Malaga Expat Consulting</b>.</p>
                                    <p>We see ourselves as your trusted consultant and a point of contact in any matters, big or small, requiring help, assistance or a simple advice related to your life in Malaga. Don&apos;t feel discouraged or lost and turn for help to us who have been in yours or similar situation many times before.</p>
                                </article>
                                <hr />
                                <div className="columns">
                                    <div className="column is-6">
                                        <Link href="/contact">
                                            <a className="button is-outlined is-dark is-fullwidth">Contact Malaga Expat ⟶</a>
                                        </Link>
                                    </div>
                                    <div className="column is-6">
                                        <Link href="/our-services">
                                            <a className="button is-outlined is-dark is-fullwidth">View our services ⟶</a>
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