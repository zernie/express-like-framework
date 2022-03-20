const EventEmitter = require('events');
const http = require('http');
const fs = require('fs');

class App {
    constructor(){
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }

    use(middleware){
        this.middlewares.push(middleware);
    }

    listen(port){
        this.server.listen(port);
    }

    _createServer(){
        const server = http.createServer((req, res) => {
            let body = '';
            req.on('data', (c) => {
                body += c;
            })
            req.on('end', () => {
                req.body = body;
                console.log("req.body")
                const emitted = this.emitter.emit(this.getMask(req.url, req.method), req, res);
                /*
                    emitted
                    Returns true if the event had listeners, false otherwise.
                */
                if(!emitted){
                    res.end();
                }
            })
        });
        return server;
    }

    addRouter(router){
        const endpoints = router.endpoints;
        Object.keys(endpoints).forEach(path => {
            const endpoint = endpoints[path];
            Object.keys(endpoint).forEach(method => {
                const handler = endpoint[method];
                this.emitter.on(this.getMask(path, method), (req, res, next) => {
                    this.middlewares.forEach(middleware => {
                        middleware(req, res, next);
                    });
                    handler(req, res, next);
                });
            });
        });
    }

    getMask(path, method){
        return `[${path}]:[${method}]`;
    }
}

module.exports = App;