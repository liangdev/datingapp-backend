"use strict";

let config      = require('./config.json');
let MongoClient = require('mongodb').MongoClient;

class Database {
    static connect() {
        let self = this;

        return MongoClient.connect(config.mongodb.url).then(function (db) {
            self._db = db;
        });
    }

    static get db() {
        return this._db;
    }
}

module.exports = Database;