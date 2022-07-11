import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagramSquare, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { SocialMedia } from '../../utils/site'

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer has-background-dark has-text-light">
            <div className="container is-fluid">
                <div className="columns">
                    <div className="column is-6">
                        <div className="block">
                            <p className="title is-size-1 mb-3 has-text-light">Irina Saltmarsh</p>
                            <p className="subtitle is-size-4 has-text-white">Malaga Expat</p>
                        </div>
                        <div className="block">
                            <p className="heading mb-0">Phone</p>
                            <a className='is-block has-text-light is-size-5' href="tel:+34687733743">+34 687 733 743</a>
                        </div>
                        <div className="block">
                            <p className="heading mb-0">Email address</p>
                            <a className='is-block has-text-light is-size-5' href="mailto:malagaexpat@gmail.com">malagaexpat@gmail.com</a>
                        </div>
                        <div className="block social-icons">
                            <a href={SocialMedia.facebookLink} className="button is-dark is-rounded" style={{ background: '#1877f2' }}>
                                <span className="icon is-small mr-3" style={{ fontSize: '.6rem' }}>
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </span>
                                <span>
                                    Facebook
                                </span>
                            </a>
                            <a href={SocialMedia.instagramLink} className="button is-dark is-rounded" style={{ background: '#e1306c' }}>
                                <span className="icon is-small mr-3" style={{ fontSize: '.6rem' }}>
                                    <FontAwesomeIcon icon={faInstagramSquare} />
                                </span>
                                <span>
                                    Instagram
                                </span>
                            </a>
                            <a href={SocialMedia.linkedInLink} className="button is-dark is-rounded" style={{ background: '#0077b5' }}>
                                <span className="icon is-small mr-3" style={{ fontSize: '.6rem' }}>
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </span>
                                <span>
                                    LinkedIn
                                </span>
                            </a>
                        </div>

                        {/* <div className="mt-6">
                            <a href={SocialMedia.facebookLink} className="is-block mr-4">
                                <span className="icon has-text-light">
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </span>
                            </a>
                            <a href={SocialMedia.instagramLink}>
                                <span className="icon has-text-light">
                                    <FontAwesomeIcon icon={faInstagramSquare} />
                                </span>
                            </a>
                            <a href={SocialMedia.linkedInLink}>
                                <span className="icon has-text-light">
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </span>
                            </a>
                        </div> */}
                    </div>
                    <div className="column is-6">
                        <div className="content">
                            <h3 className="has-text-light">Disclaimer</h3>
                            <p>In compliance with the Data Protection General Regulation (EU) 2016/679 of the European Parliament and the Council, on the 27th April 2016 and Organic Law 3/2018 of December 5th on Personal Data Protection and Guarantee of Digital Rights, we inform you that the provided personal data will be processed by IRINA SALTMARSH TERENTYEVA with VAT number 04311015X, addressed in ALHAURIN DE LA TORRE (MALAGA), C.P. 29130, CALLE CALLE GERARDO DIEGO Nº 6 P03- C, to provide the requested service, and make the billing of it.</p>
                            <p>The legal basis for the processing of your personal data is the execution of the contracted service. The future offer of products and services will be based on the requested consent, and in the case of the withdrawal of this consent, this would never condition the execution of the contract.</p>
                            <p>The data provided will be kept as long as the commercial relationship is maintained or during the years necessary to comply with the legal obligations. The data will not be transferred to third parties except in cases where there is a legal obligation.</p>
                            <p>You have the right to obtain confirmation of whether or not we are treating your personal data under IRINA SALTMARSH TERENTYEVA and therefore you have the right to exercise your rights of access, rectification, treatment limitation, portability, opposition to treatment and suppression of your data by writing to the address postal mentioned above or electronic account malagaexpat@gmail.com attached mail copy of the ID in both cases, as well as the right to file a claim with the Control Authority (aepd.es). We also request authorization to offer you products and services related to those requested, executed and/or marketed by our company enabling us to keep you as a client.</p>
                            <Link href="/disclaimer"><a className="has-text-light is-underlined">Full site disclaimer</a></Link>
                        </div>
                    </div>
                </div>

            </div>
            <div className="has-text-centered mt-6">
                <p className="heading mt-6">&copy; Malaga Expat Consulting {year}</p>
            </div>
        </footer >
    )
}