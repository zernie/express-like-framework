const EventEmitter = require('events');
const http = require('http');
const fs = require('fs');

class App {
    constructor() {
        // this.emitter = new EventEmitter();
        // this.server = this._createServer();
        this.middlewares = [];
    }

    use(middleware) {
        if (typeof middleware !== 'function') {
            throw new Error('Middleware must be a function!');
        }
        this.middlewares.push(middleware);
    }

    listen(port, callback) {
        const handler = (req, res) => {
            // `this.handle()` executes all middleware defined on this Espresso
            // app instance, will implement this method next!
            this._handle(req, res, err => {
                if (err) {
                    res.writeHead(500);
                    res.end('Internal Server Error');
                }
            });
        };
        return http.createServer(handler).listen({port}, callback);
    }

    _handle(req, res, callback) {
        let idx = 0;

        const next = (err) => {
            // If an error occurred, bypass the rest of the pipeline. In Express,
            // you would still need to look for error handling middleware, but
            // this example does not support that.
            if (err != null) {
                console.error(err);
                return setImmediate(() => callback(err));
            }
            if (idx >= this.middlewares.length) {
                console.log('callback');
                return setImmediate(() => callback());
            }

            // Not the same as an internal Express layer, which is an object
            // wrapper around a middleware function. Using the same nomenclature
            // for consistency.
            const layer = this.middlewares[idx++];
            setImmediate(() => {
                try {
                    // Execute the layer and rely on it to call `next()`
                    layer(req, res, next);
                } catch (error) {
                    next(error);
                }
            });
        };

        next();
    }

    addRouter(router) {
        const endpoints = router.endpoints;
        Object.keys(endpoints).forEach(path => {
            const endpoint = endpoints[path];
            Object.keys(endpoint).forEach(method => {
                const handler = endpoint[method];
                this.use(handler);
            });
        });
    }

    getMask(path, method) {
        return `[${path}]:[${method}]`;
    }
}

module.exports = App;