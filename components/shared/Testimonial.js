export default function Testimonial({ title, content, index = 0 }) {
    // const className = content.length > 100 ? Math.random() > 0.5 ? 'wide' : 'tall' : '';
    return (
        <div className="testimonial">
            <div className="content is-medium">
                <h4 className="has-text-light has-text-centered mb-2">{title}</h4>
                <div>{content}</div>
                {index > 0 && <div className="is-flex">
                    <small className="ml-auto">#{index}</small>
                </div>}
            </div>
        </div>
    )
}