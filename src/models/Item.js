"use strict";

const Model = require('../db/Model');
const knex = require('knex');
const st = require('knex-postgis')(knex);

class Item extends Model {

    static get table() {
        return 'items';
    }

    constructor() {
        super();

        this.id = 0;
        this.title = '';
        this.user_id = 0;
        this.date = new Date();
        this.coordinates = st.geomFromText('Point(0 0)');
        this.description = '';
        this.created_at = new Date();
        this.mime_type = '';
        this.url = '';
    }

    setCoordinates(latitude, longitude) {
        this.coordinates = st.geomFromText(`Point(${latitude} ${longitude})`)
    }

    getCoordinates() {
        if(this.coordinates.x && this.coordinates.y) {
            return {
                latitude: this.coordinates.x,
                longitude: this.coordinates.y
            }
        } else {
            let nums = this.coordinates.bindings[0].split(' ');
            nums[0] = nums[0].replace(/\D/g, '');
            nums[1] = nums[1].replace(/\D/g, '');
            return {
                latitude: parseInt(nums[0]),
                longitude: parseInt(nums[1])
            }
        }
    }

    get userId() {
        return this.user_id;
    }

    set userId(id) {
        this.user_id = id;
    }

    get mimeType() {
        return this.mime_type;
    }

    set mimeType(type) {
        this.mime_type = type;
    }
}

module.exports = Item;