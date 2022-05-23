import Link from 'next/link'
import { postedOrLastUpdatedText } from '../../utils/helpers'
import { useState, useEffect } from 'react'

export default function InformationLinks({ informationLinks }) {
    const [filtered, setFiltered] = useState(informationLinks)
    const [q, setQ] = useState('')

    useEffect(() => {
        let lower = q.toLocaleLowerCase();
        const results = informationLinks.filter(el => el.title.toLocaleLowerCase().indexOf(lower) > -1);
        setFiltered(results);
    }, [q, setFiltered])

    return (
        <>
            <div className="block">
                <input type="search" className='input is-large' placeholder='Search' value={q} onChange={e => setQ(e.target.value)} />
            </div>
            {
                filtered.map(link => (
                    <div key={link.permalink} className="block">
                        <h6 className='title is-4'><Link href={`/information/${link.permalink}`}><a className="has-text-dark">{link.title}</a></Link></h6>
                        <p className="subtitle has-text-info is-6">
                            {postedOrLastUpdatedText(link.lastUpdatd, link.publishDate)}
                        </p>
                        <hr />
                    </div>
                ))
            }
            {
                filtered.length == 0 && <div className="message is-warning">
                    <div className="message-body">
                        <p>No matches</p>
                    </div>
                </div>
            }
        </>)
}