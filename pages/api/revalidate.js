export default async function handler(req, res) {
    if (req.headers.secret !== '2781fb43-aa90-4b92-a1e2-44e4816d2184') {
        return res.status(401).json({ message: 'Invalid token' })
    }
    if (!req.query.path) {
        return res.status(400).json({ message: 'Pass path in query string' })
    }
    try {
        await res.revalidate(req.query.path)
        return res.json({ revalidated: true })
    } catch (err) {
        console.log(err)
        return res.status(500).send('Error revalidating')
    }
}