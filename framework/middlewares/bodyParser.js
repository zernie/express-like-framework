module.exports = (req, res, next) => {
    req.body = (async () => {
        let body = '';
        return await new Promise((resolve, reject) => {
            req.on('data',  (chunk) => {
                body +=  chunk;
            });
            req.on('end', () => {
                resolve(JSON.parse(body));
            });
        });
    })();
}