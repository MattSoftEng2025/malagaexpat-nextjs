import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="footer has-background-dark has-text-light">
            <div className="container is-fluid">
                <div className="columns reverse-row-order">
                    <div className="column">
                        <div className="content">
                            <h3 className="has-text-light">Disclaimer</h3>
                            <p>"In compliance with the Data Protection General Regulation (EU) 2016/679 of the European Parliament and the Council, on the 27th April 2016 and Organic Law 3/2018 of December 5th on Personal Data Protection and Guarantee of Digital Rights, we inform you that the provided personal data will be processed by IRINA SALTMARSH TERENTYEVA with VAT number 04311015X, addressed in ALHAURIN DE LA TORRE (MALAGA), C.P. 29130, CALLE CALLE GERARDO DIEGO Nº 6 P03- C, to provide the requested service, and make the billing of it.</p>
                            <p>The legal basis for the processing of your personal data is the execution of the contracted service. The future offer of products and services will be based on the requested consent, and in the case of the withdrawal of this consent, this would never condition the execution of the contract.</p>
                            <p>The data provided will be kept as long as the commercial relationship is maintained or during the years necessary to comply with the legal obligations. The data will not be transferred to third parties except in cases where there is a legal obligation.</p>
                            <p>You have the right to obtain confirmation of whether or not we are treating your personal data under IRINA SALTMARSH TERENTYEVA and therefore you have the right to exercise your rights of access, rectification, treatment limitation, portability, opposition to treatment and suppression of your data by writing to the address postal mentioned above or electronic account malagaexpat@gmail.com attached mail copy of the ID in both cases, as well as the right to file a claim with the Control Authority (aepd.es) ".We also request authorization to offer you products and services related to those requested, executed and/or marketed by our company enabling us to keep you as a client.</p>
                            <p><small><Link href="/disclaimer"><a className="has-text-light is-underlined">Full site disclaimer</a></Link></small></p>
                        </div>
                    </div>
                    <div className="column footer-details ">
                        <div className="content">
                            <h3 className="has-text-light">Irina Saltmarsh</h3>
                            <p>+34 687 733743</p>
                            <p><a href="mailto:malagaexpat@gmail.com">malagaexpat@gmail.com</a></p>
                            <p>© Malaga Expat Consulting 2022</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}