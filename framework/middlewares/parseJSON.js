module.exports = (req, res, next) => {
    res.send = (data) => {
        res.writeHead(200, {
            'Content-type' : 'application/json'
        });
        res.end(JSON.stringify(data));
    }
}