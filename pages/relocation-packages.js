import Head from 'next/head'
import Link from 'next/link'
import API from '../utils/API'

export async function getStaticProps() {
    const page = await API.getJson(`/pages/relocation-packages`)
    return {
        props: {
            page
        },
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
                            <div className="columns is-centered">
                                <div className="column is-7-desktop">
                                    <h1 className="title is-1 has-text-centered">{page.title}</h1>
                                    <p className="subtitle is-4">If you wish to be sure all aspects of your relocation to Spain are covered, you might be interested in the relocation packages with Malaga Expat Consulting addressed at securing the paperwork and/or property requirements for you and your family. </p>
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
                                    <p>Bureaucracy is a minefield in every country, and with no knowledge of language and local practices, the paperwork can turn into a real nightmare. This is when you can benefit from our experience and local knowledge. Based on the years of work with many expats like yourself, we have created the service packages addressed to cover the most important paperwork aspects of your relocation.</p>
                                    <p>Our packages clearly distinguish between paperwork and property search assistance, as although those two parts come hand in hand, the Paperwork part is where most assistance is required, while the Property Search part is very often a more personal matter. Malaga Expat Consulting will gladly assist you with all elements of your relocation and will always try to customize the package to your personal needs.</p>
                                    <p>Below are the examples of the standard packages addressed at individuals, couples and families:</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section has-background-primary">
                    <div className="container">
                        <div className="columns is-multiline">
                            <div className="column is-6-desktop">
                                <div className="message">
                                    <div className="message-header">Paperwork Package</div>
                                    <div className="message-body content">
                                        <p>Includes assistance with the following procedures:</p>
                                        <ul>
                                            <li>Opening a bank account</li>
                                            <li>Applying for NIE</li>
                                            <li>Applying for Residence (Certificado de Registro)</li>
                                            <li>Registration in the local Town Hall (padron)</li>
                                            <li>Obtaining Social Security number</li>
                                            <li>Introduction to insurance companies for private health insurance quotes</li>
                                            <li>Registration for local schools (only for Family Packages)</li>
                                            <li>General advice</li>
                                        </ul>
                                        <h3 className="has-text-centered title is-4">Prices for EU Citizens*</h3>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>Individual</th>
                                                    <td>390&euro;</td>
                                                </tr>
                                                <tr>
                                                    <th>Couple</th>
                                                    <td>540&euro;</td>
                                                </tr>
                                                <tr>
                                                    <th>Family (2 adults/2 children)</th>
                                                    <td>850&euro;</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <ul style={{ listStyle: 'none' }} className="pr-4">
                                            <li className='is-size-7'>*All prices are subject to IVA (21%) and only include Malaga Expat Consulting fees. Police and other admin fees, as well as costs of translations (where required) and private health insurances premiums are not included in the above fees.</li>
                                            <li className='is-size-7'>*Individual packages may include ALL or just SOME of the procedures listed, depending on each individual needs and requirements.</li>
                                            <li className='is-size-7'>*We can also assist non-EU citizens with all above, the prices may vary slightly depending on paperwork requirements in each individual case, and are to be quoted separately.</li>
                                            <li className='is-size-7'>*Property purchase assistance is agreed on the individual basis.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-6-desktop">
                                <div className="message">
                                    <div className="message-header">Paperwork and Property Package</div>
                                    <div className="message-body content">
                                        <p>Includes all of the <em>Paperwork Package</em> as well as assistance with property search, whether it is to rent or to buy. We appreciate that property is a very personal matter, however by involving our professional services you will benefit greatly from our knowledge of local areas, the language, negotiation practices and local laws.  We do not limit our collaboration network by working with “the exclusive few agents”, nor are we paid by any agents! We work solely for you, our clients, we represent only your interests and we research the whole market to choose from the broadest range of properties from different agents and owners, with no links attached to anyone. Read more about our <Link href="/information/bespoke-property-finder-service-in-malaga">property finder service here</Link>.</p>
                                        <p>We find it difficult to quote a standard service fee for the property search, as each individual case is very different, starting from client&apos;s expectations of the level of our involvement and service, to the area the property is in, and other requirements. Furthermore, our experience from working with different clients so far, has shown that it is impossible and would be unfair to quote a standard fee, as the process, time and work involved can vary greatly.</p>
                                        <p>Therefore, in case of the property search assistance, we offer a different approach - we charge the client based on the actual work and time involved, without any minimum or maximum requirements, limitations on the number of properties or the time involved, nor on the level of service provided. You, the Client, decide, how much and how long you wish us to be involved, and at which extent. We find it a much more transparent, flexible, and fair approach, than asking a client to commit to a package which would incur certain limitations in the level or the quality of the services provided. Please get in touch with us to discuss in more detail your requirements and the costs involved.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-7">
                                <div className="content is-medium">
                                    <p>When it comes to the geographical areas, as name suggests, Malaga Expat Consulting is based in the province of Malaga, in the town of Alhaurin de la Torre, and covers the areas between Torre del Mar and Marbella on the coast, and up to Coin-Pizzara inland. Our work area can be extended up till Nerja in the east, and down till Estepona in the south, however the prices may be subject to additional surcharge.</p>
                                    <p>If you are unsure what is better for you and your family, whether you need a standard or a customised relocation package, or maybe just assistance with some single paperwork matters – do get in touch and let us assist you based on your personal requirements.</p>
                                    <hr /><Link href="/contact" className="button is-outlined is-dark is-fullwidth">Contact Malaga Expat ⟶</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>)
}