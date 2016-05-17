"use strict";

let assert  = require('assert');
let uuid    = require('node-uuid');
let crypto  = require('crypto');

module.exports = function (app) {

    app.post('/accounts', function *(next) {
        let data = this.request.body;

        assert(data.username, 'username required');
        assert(data.password, 'password required');

        let salt = uuid.v4();

        let result = yield this.db.collection('users').insertOne({
            username    : data.username,
            password    : crypto.createHash('md5').update(data.password + salt).digest('hex'),
            salt        : salt,
            auth_token  : uuid.v4(),
            gender      : data.gender,
            age         : data.age,
            preference  : data.preference
        });

        this.response.status = 201;
        this.response.headers['Location'] = '/users/' + result.insertedId;
        
        yield next;
    });

    app.post('/accounts/auth', function *(next) {
        let data = this.request.body;

        assert(data.username, 'username required');
        assert(data.password, 'password required');

        let user = yield this.db.collection('users').find({ username: data.username }).limit(1).next();
        if (user) {
            let hashedPassword = crypto.createHash('md5').update(data.password + user.salt).digest('hex');
            if (hashedPassword === user.password) {
                this.response.status = 200;
                this.response.body = {
                    token: user.auth_token
                };
                
                yield next;
                
                return;
            }
        }
        
        this.response.status = 400;
        this.response.body = {
            message: 'Invalid username and password combination'
        };
        
        yield next;
    });
};