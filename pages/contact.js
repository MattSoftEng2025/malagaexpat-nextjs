import Head from 'next/head'
import Link from 'next/link'

export default function About() {
    return (<main>
        <div className="hero is-primary">
            <div className="hero-body">
                <div className="container">
                    <div className="columns">
                        <div className="column is-7">
                            <h1 className="title is-1">Contact</h1>
                            <p className="subtitle">If you require assistance with any matters listed in <Link href="/our-services">our services</Link> and more, or any help and advice about living or moving to Malaga and the Costa del Sol, please contact us by filling the below form and we will get back to you as soon as we can.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section className="section has-background-info">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-8">
                        <form action="">
                            <div className="columns">
                                <div className="column">
                                    <div className="field">
                                        <div className="control">
                                            <input type="text" className="input is-large" placeholder="Name" required />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input type="email" className="input is-large" placeholder="Email" required />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input type="text" className="input is-large" placeholder="Phone" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input type="text" className="input is-large" placeholder="Company" />
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="field" style={{ height: '100%' }}>
                                        <div className="control" style={{ height: '100%' }}>
                                            <textarea className="textarea is-large" style={{ height: '100%' }} placeholder="Message" required></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="is-flex">
                                <button className="button is-dark mx-auto is-large">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </main>)
}