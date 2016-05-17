"use strict";

module.exports = function *(next) {
    let authHeader = this.request.headers['authorization'];
    if (!authHeader) {
        this.response.status = 403;
        return;
    }
    
    let params = authHeader.substr(authHeader.indexOf(' ') + 1);
    let token  = params.substr('token='.length);

    let user = yield this.db.collection('users').find({ 'auth_token': token }).limit(1).next();
    if (!user) {
        this.response.status = 403;
    } else {
        this.user = user;
        yield next;
    }
};
