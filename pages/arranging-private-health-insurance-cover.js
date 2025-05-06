import Head from 'next/head'
import Link from 'next/link'

export default function PrivateHealthcare({ page }) {
    return (
        <>
            <Head>
                <title>Contract your Spanish private health insurance with Malaga Expat</title>
            </Head>
            <main>
                <div className="hero is-primary">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered has-text-centered">
                                <div className="column is-7-desktop">
                                    <h1 className="title is-1">Contract your Spanish private health insurance with Malaga Expat</h1>
                                    <p className="subtitle is-4">Published on 23 June 2024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section class="section">
                    <div class="container">
                        <div class="columns is-centered">
                            <div class="column is-7-desktop">
                                <div class="content is-medium">
                                    <article>
                                        <p class="intro">As an authorised Sanitas Broker, we at Malaga Expat Consulting can offer you a comprehensive range of Sanitas Health insurance covers. You can benefit from it both as a stand-alone health insurance in Spain or as a complementary product to your Spanish public health cover.</p>
                                        <figure class="mx-auto">
                                            <img src="/sanitas.jpeg" />
                                        </figure>
                                        <p>Sanitas (part of BUPA) is Spain's second largest private health insurance provider and is definitely topping the ranking in terms of client's satisfaction and quality. Sanitas offers one of the most advanced networks of private hospitals and health professionals in Spain and abroad, as well as a very comprehensive range of private health covers to address most diverse needs.</p><p>And what counts most, Sanitas, unlike some other insurance providers, will never try to "phase you out" when you get older. Once you are in - you stay covered and protected.</p><p>As an obligatory immigration requirement for your Spanish residency permit, a comprehensive health insurance cover is to be maintained during the whole term of your residency in Spain.</p>
                                        <p>Do get in touch to contract your Sanitas health insurance cover directly through Malaga Expat, whether you require a new cover or consider changing your current private health provider, we will be happy to supply a no obligation quote for a product best suitable for your needs.</p>
                                    </article>
                                </div>
                                <div class="columns">
                                    <div class="column is-4">
                                        <Link class="button is-outlined is-dark is-fullwidth" href="/contact">Contact Malaga Expat ⟶</Link>
                                    </div>
                                    <div class="column is-4">
                                        <Link class="button is-outlined is-dark is-fullwidth" href="/our-services">Back to services ⟶</Link>
                                    </div>
                                    <div class="column is-4">
                                        <Link class="button is-outlined is-dark is-fullwidth" href="/about">About ⟶</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>)
}