import https from 'https';

export default class API {
  // Use Amplify env vars if available, otherwise fall back to real defaults
  static baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://malagaexpat-env.eba-f28qdjq6.eu-west-1.elasticbeanstalk.com/api";

  static key =
    process.env.NEXT_PUBLIC_API_KEY ||
    "2781fb43-aa90-4b92-a1e2-44e4816d2184";

  static async getJson(url) {
    const res = await this.get(url);
    return await res.json();
  }

  static async get(url) {
    try {
      const absoluteUrl = `${this.baseUrl}${url.startsWith("/") ? url : "/" + url}`;
      const res = await fetch(absoluteUrl, {
        method: "GET",
        agent: agent,
        headers: {
          "X-API-KEY": this.key,
        },
      });
      return res;
    } catch (error) {
      throw new Error("Could not get from api: " + error + ", url: " + url);
    }
  }

  static async postJson(url, payload) {
    try {
      const absoluteUrl = `${this.baseUrl}${url.startsWith("/") ? url : "/" + url}`;
      const res = await fetch(absoluteUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": this.key,
        },
        agent: agent,
        body: JSON.stringify(payload),
      });
      return res;
    } catch (error) {
      throw new Error("Could not postJson to api: " + error + ", url: " + url);
    }
  }
}

const agent = new https.Agent({
  rejectUnauthorized: false,
});
