"use strict";

const Model = require('../db/Model');
const knex = require('knex');

class Subcategory2 extends Model {

    static get table() {
        return 'subcategory2';
    }

    constructor() {
        super();

        this.id = 0;
        this.name = '';
        this.created_at = new Date();
    }

}

module.exports = Subcategory2;