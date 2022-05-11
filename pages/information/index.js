import Head from 'next/head'
import Link from 'next/link'
import API from '../../utils/API'

export async function getStaticProps() {
    const links = await API.getJson('/pages/information');
    return {
        props: {
            links
        },
        revalidate: 10 * 60
    }
}

export default function InformationIndex({ links }) {
    return (<main>
        <section className="section">
            <div className="container content">
                <ul>
                    {links.map(link => (
                        <li key={link.permalink}>
                            <Link href={`/information/${link.permalink}`}>{link.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    </main>)
}