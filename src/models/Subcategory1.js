"use strict";

const Model = require('../db/Model');
const knes = require('knex');

class Subcategory1 extends Model {

    static get table() {
        return 'subcategory1';
    }

    constructor() {
        super();

        this.id = 0;
        this.name = '';
        this.created_at = new Date();
    }

}

module.exports = Subcategory1;