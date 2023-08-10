import request from "request";

class SpuxInterface {
    _request(opts) {
        return new Promise((resolve, reject) => {
            request(opts, function (error, response, body) {
                if (error) throw new Error(error);
                resolve(body)
            });
        });
    }


    async sendPost(coords, color) {
        const options = { method: 'POST',
            url: 'https://api.spux.art/tile',
            qs: {
                i: process.env.IDENTITY,
                s: coords.s,
                h: process.env.HANDLE,
                x: coords.x,
                y: coords.y,
                o: coords.o,
                c: color
            },
            headers: { 
                'cache-control': 'no-cache',
                'x-api-key': process.env.API_KEY,
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
                'sec-gpc': '1',
                'sec-fetch-site': 'same-site',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                'sec-ch-ua-platform': '"macOS"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua': '"Brave";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
                referer: 'https://spux.art/',
                origin: 'https://spux.art',
                'content-type': 'application/json',
                'accept-language': 'en-US,en;q=0.5',
                accept: '*/*',
                authority: 'api.spux.art' 
            }
        };

        return await self._request(options);
    }

    async getMyCoords() {
        const raw = await this.getTiles();
        const coords = JSON.parse(raw);
        return coords.filter(el => el.h === 'daguerro');
    }

    async getTiles() {
        const options = {
            method: 'GET',
            url: 'https://spux.art/tiles.json',
            headers: {
                'cache-control': 'no-cache',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
                'sec-gpc': '1',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                'sec-ch-ua-platform': '"macOS"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua': '"Brave";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
                referer: 'https://spux.art/',
                'if-none-match': '"8cecc0a0541db5ea5c18267126164a93"',
                'if-modified-since': 'Thu, 10 Aug 2023 15:46:17 GMT',
                cookie: 'UUID=aead1579-24b4-40d9-8189-6b170f00971a',
                'accept-language': 'en-US,en;q=0.5',
                accept: '*/*',
                authority: 'spux.art'
            }
        };

        return await this._request(options);
    }
}

export default SpuxInterface;