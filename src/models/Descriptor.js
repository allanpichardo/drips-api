"use strict";

const Model = require('../db/Model');
const knex = require('knex');

class Descriptor extends Model {

    static get table() {
        return 'descriptors';
    }

    constructor() {
        super();

        this.id = 0;
        this.name = '';
        this.created_at = new Date();
    }

}

module.exports = Descriptor;