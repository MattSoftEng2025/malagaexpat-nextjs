import API from "../../utils/API";

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).send();
    }

    if (req.body.content.includes('https') || req.body.content.includes('http')) {
        return res.status(400).send();
    }

    const sendEnquiry = await API.postJson('/messages', req.body)
    res.status(sendEnquiry.status).send();
}
