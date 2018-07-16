"use strict";

let app = require('koa')();
let router = require('koa-router')();
let body = require('koa-body');
let database = require('./middlewares/database');

require('./routes/accounts')(router);
require('./routes/users')(router);

app.use(body());
app.use(database);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080);
