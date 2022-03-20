// endpoints = {
//     "/users" : {
//         "GET" : handler,
//         "POST" : handler
//     },
//     "/posts" : {
//         "GET" : handler,
//         "POST" : handler
//     }
// }

class Router {
    constructor(){
        this.endpoints = {}
    }

    request(method, path, handler) {
        if(!this.endpoints[path]){
            this.endpoints[path] = {};
        }
        const endpoint = this.endpoints[path];
        if(endpoint[method]){
            throw new Error(`Handler for ${method} method already exists`);
        }
        endpoint[method] = handler;
    }

    get(path, handler){
        this.request("GET", path, handler);
    }
    post(path, handler){
        this.request("POST", path, handler);
    }
    put(path, handler){
        this.request("PUT", path, handler);
    }
    delete(path, handler){
        this.request("DELETE", path, handler);
    }
}

module.exports = Router;