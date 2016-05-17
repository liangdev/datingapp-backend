"use strict";

let assert      = require('assert');
let crypto      = require('crypto');
let utils       = require('../utils');
let ObjectID    = require('mongodb').ObjectID;
let requireAuth = require('../middlewares/requireAuth');

module.exports = function (app) {

    app.get('/users/:id', requireAuth, function *(next) {
        let user = yield this.db.collection('users').find({ "_id": new ObjectID(this.params.id) }).next();
        if (!user) {
            this.response.status = 404;
            yield next;
            return;
        }

        utils.removeCredentialFields(user);

        this.response.body = user;

        yield next;
    });

    app.get('/users/:id/suggestions', requireAuth, function *(next) {
        let user = yield this.db.collection('users').find({ "_id": new ObjectID(this.params.id)} ).next();

        if (!user) {
            this.response.status = 400;
            this.response.body = {
                "message": "User not found"
            };

            yield next;

            return;
        }

        let query = {};

        if (user.preference) {
            if (user.preference.age_range) {
                query.age = {};
            
                if (user.preference.age_range.from) {
                    query.age.$gte = user.preference.age_range.from;
                }
                if (user.preference.age_range.to) {
                    query.age.$lte = user.preference.age_range.to;
                }
            }

            if (user.preference.gender) {
                query.gender = user.preference.gender;
            }
        }

        let suggestions = yield this.db.collection('users').find(query).limit(5).toArray();
        
        suggestions.forEach(u => {
            utils.removeCredentialFields(u);
            delete u.preference;
        });
        
        this.response.body = suggestions;

        yield next;
    });

    app.put('/users/:user_id/likes/:liked_user_id', requireAuth, function *(next) {
        let filter = {
            "user_id"       : this.params.user_id,
            "liked_user_id" : this.params.liked_user_id
        };
        yield this.db.collection('likes').updateOne(filter, {
            $setOnInsert: { "liked_at": new Date().getTime() }
        }, { upsert: true });
        
        this.response.status = 200;

        yield next;
    });

};