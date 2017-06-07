"use strict";

const Model = require('../db/Model');
const knex = require('knex');

class Collection extends Model {

    static get table() {
        return 'collections';
    }

    constructor() {
        super();

        this.id = 0;
        this.name = '';
        this.created_at = new Date();
    }

}

module.exports = Collection;