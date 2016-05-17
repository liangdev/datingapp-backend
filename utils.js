"use strict";

module.exports = {
    removeCredentialFields: function (user) {
        delete user.password;
        delete user.salt;
        delete user.auth_token;
    }
};