"use strict";

const Model = require('../db/Model');
const Database = require('../db/Database');
const bcrypt = require('bcrypt');
const Item = require('Item');

class User extends Model {

    static get table() {
        return 'users';
    }

    constructor() {
        super();

        this.id = 0;
        this.username = "";
        this.email = "";
        this.password = "";
        this.is_admin = 0;
        this.created_at = new Date();
    }

    __encryptPassword(password, callback) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err)
                return callback(err);

            bcrypt.hash(password, salt, function(err, hash) {
                return callback(err, hash);
            });

        });
    };

    __comparePassword(password, userPassword, callback) {
        bcrypt.compare(password, userPassword, function(err, isPasswordMatch) {
            if (err)
                return callback(err);
            return callback(null, isPasswordMatch);
        });
    };

    get isAdmin() {
        return this.is_admin === 1;
    }

    set isAdmin(isUserAdmin) {
        this.is_admin = isUserAdmin ? 1 : 0;
    }

    setPassword(password) {
        return new Promise((resolve, reject) => {
            this.__encryptPassword(password, (err, hash) => {
                if(err) {
                    reject(err);
                } else {
                    this.password = hash;
                    resolve(hash);
                }
            });
        });
    }

    checkPassword(password) {
        return new Promise((resolve, reject) => {
            this.__comparePassword(password, this.password, (err, isMatch) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(isMatch);
                }
            });
        })
    }

    getItems() {
        return new Promise((resolve, reject) => {
            Database.connection(Item.table).where({
                user_id: this.id
            }).select().then((results) => {
                let items = [];
                for (let result in results) {
                    items.push(Item.fromJson(result));
                }
                resolve(items);
            });
        });
    }

}

module.exports = User;