import Testimonial from "../components/shared/Testimonial"
import API from "../utils/API"
import Head from 'next/head'

export async function getStaticProps() {
    const testimonials = await API.getJson(`/testimonials`)
    return {
        props: {
            testimonials
        },
        revalidate: 10 * 60
    }
}

export default function TestimonialsPage({ testimonials }) {
    return (
        <>
            <Head>
                <title>Testimonials</title>
            </Head>
            <main>
                <div className="hero is-primary">
                    <div className="hero-body has-text-centered">
                        <h1 className="title">Testimonials</h1>
                        <p className="subtitle">Hundreds of satisfied customers since Malaga Expat began in 2015</p>
                    </div>
                </div>
                <section className="section has-background-dark has-text-light">
                    <div className="testimonials">
                        {testimonials.map((t, i) => (
                            <Testimonial key={i} title={t.title} content={t.content} index={testimonials.length - i} />
                        ))}
                    </div>
                </section>
            </main>
        </>
    )
}