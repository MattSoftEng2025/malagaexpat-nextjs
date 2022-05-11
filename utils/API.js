import https from 'https'

export default class API {
    static token = 'not-set';
    static baseUrl = 'https://malagaexpat-admin.azurewebsites.net/api';

    static async getJson(url) {
        const res = await this.get(url);

        if (!res.ok) {
            throw new Error(`${res.status} at: ${url}`);
        }
        try {
            return await res.json();
        }
        catch (error) {
            throw new Error('Failed to getJson(): ' + error + ', url: ' + url)
        }
    }

    static async get(url) {
        try {
            const absoluteUrl = this.baseUrl + url;
            const res = await fetch(absoluteUrl, {
                method: 'GET',
                agent: agent,
                headers: {
                    'org': this.token,
                }
            })
            return res;
        } catch (error) {
            console.log(error);
            throw new Error('Could not get from api: ' + error + ', url: ' + url);
        }
    }

    static async postJson(url, payload) {
        try {
            url = url.startsWith('/') ? url : '/' + url;
            const absoluteUrl = this.baseUrl + url;
            const res = await fetch(absoluteUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'org': this.token,
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