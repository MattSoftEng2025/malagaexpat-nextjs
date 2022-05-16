import Testimonial from "../shared/Testimonial"
import Link from 'next/link'
export default function Testimonials({ testimonials }) {
    return (
        <section className="section has-background-dark has-text-light">
            <h2 className="title is-1 has-text-centered has-text-light mb-6">Testimonials</h2>
            <div className="columns is-vcentered">
                {testimonials.map((t, i) => (
                    <div className="column is-4" key={i}>
                        <Testimonial title={t.title} content={t.content} index={testimonials.length - i} />
                    </div>
                ))}
            </div>
            <div className="is-flex">
                <Link href="/testimonials">
                    <a className="button is-large is-primary mx-auto">View all testimonials </a>
                </Link>
            </div>
        </section>)
}