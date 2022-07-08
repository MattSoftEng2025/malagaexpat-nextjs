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
                {q !== '' && filtered.length > 0 && <small className='mt-3 is-block'>Showing {filtered.length} of {informationLinks.length} articles</small>}
                {q === '' && <small className='mt-3 is-block'>Showing {informationLinks.length} articles</small>}
            </div>
            {
                filtered.map(link => (
                    <Link href={`/information/${link.permalink}`} key={link.permalink} >
                        <a className="is-block info-link">
                            <h6 className='title is-4 has-text-dark'>{link.title}</h6>
                            <p className="subtitle has-text-info is-6">
                                {postedOrLastUpdatedText(link.lastUpdated, link.publishDate)} ⟶
                            </p>
                        </a>
                    </Link>
                ))
            }
            {
                filtered.length == 0 && <div className="message is-warning">
                    <div className="message-body">
                        <p>No matches for <em>{q}</em>. <a onClick={() => setQ('')}>Clear search</a></p>
                    </div>
                </div>
            }
        </>)
}