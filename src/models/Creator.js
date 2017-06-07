"use strict";

const Model = require('../db/Model');
const knex = require('knex');

class Creator extends Model {

    static get table() {
        return 'creators';
    }

    constructor() {
        super();

        this.id = 0;
        this.name = '';
        this.created_at = new Date();
    }

}

module.exports = Creator;