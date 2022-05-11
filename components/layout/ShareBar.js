// export default function ShareBar({ url, metaDescription }) {
//     const base = "https://www.malagaexpat.com" + url
//     return (<section className="section has-background-secondary has-text-centered">
//         <h6 className="title is-5">Share this page</h6>
//         <div className="level">
//             <div className="level-item">
//                 <div>
//                     <a href={`https://facebook.com/sharer/sharer.php?u=${base}`} target="_blank" data-toggle="tooltip" title="Share this page">Facebook</a>
//                 </div>
//             </div>
//             <div className="level-item">
//                 <div>
//                     <a href={`https://twitter.com/home?status=${metaDescription} - ${base} @malaga_expat`} target="_blank" data-toggle="tooltip" title="Tweet this page">Twitter</a>
//                 </div>
//             </div>
//             <div className="level-item">
//                 <div>
//                     <a href="https://www.linkedin.com/shareArticle?mini=true&url=@url" target="_blank" data-toggle="tooltip" title="Share on LinkedIn">LinkedIn</a>
//                 </div>
//             </div>
//         </div>
//     </section>)
// }