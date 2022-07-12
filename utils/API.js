import https from 'https'

export default class API {
    static key = '2781fb43-aa90-4b92-a1e2-44e4816d2184';
    static baseUrl = 'https://malagaexpat-admin.azurewebsites.net/api';

    static async getJson(url) {
        const res = await this.get(url);
        return await res.json();

        // if (!res.ok) {
        //     throw new Error(`${res.status} at: ${url}`);
        // }
        // try {
        //     return await res.json();
        // }
        // catch (error) {
        //     throw new Error('Failed to getJson(): ' + error + ', url: ' + url)
        // }
    }

    static async get(url) {
        try {
            const absoluteUrl = this.baseUrl + url;
            const res = await fetch(absoluteUrl, {
                method: 'GET',
                agent: agent,
                headers: {
                    'X-API-KEY': this.key,
                }
            })
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    static async postJson(url, payload) {
        try {
            url = url.startsWith('/') ? url : '/' + url;
            const absoluteUrl = this.baseUrl + url + `?key=${this.key}`;
            const res = await fetch(absoluteUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                agent: agent,
                body: JSON.stringify(payload)
            })
            return res;
        } catch (error) {
            throw new Error('Could not postJson to api: ' + error + ', url: ' + url);
        }
    }
}

const agent = new https.Agent({
    rejectUnauthorized: false
})