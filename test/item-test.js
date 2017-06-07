"use strict";

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const Item = require('../src/models/Item');
const User = require('../src/models/User');

chai.should();
chai.use(chaiAsPromised);

describe('Item', () => {

    it('Converts lat/lng into geometry and back', () => {

        let latitude = 20;
        let longitude = 10;

        let item = new Item();
        item.setCoordinates(latitude,longitude);
        expect(item.getCoordinates().latitude).to.equal(latitude);
        expect(item.getCoordinates().longitude).to.equal(longitude);

    });

    it('Saving item should preserve geometry in GIS format', (done) => {

        let user = new User();
        user.username = "itm" + new Date().getMilliseconds();
        user.email = `itm${new Date().getMilliseconds()}@${new Date().getMilliseconds()}.com`;
        user.setPassword("testpassword");
        user.save().then((user) => {
            let item = new Item();
            item.setCoordinates(34,56);
            item.userId = user.id;
            item.title = 'some title';
            item.description = 'some description';
            item.mimeType = 'image/jpeg';
            item.url = 'http://www.google.com';

            item.save().then((newItem) => {
                expect(newItem.getCoordinates().latitude).to.equal(item.getCoordinates().latitude);
                expect(newItem.getCoordinates().longitude).to.equal(item.getCoordinates().longitude);

                newItem.destroy().then(() => {
                    user.destroy().then(() => {
                        done();
                    });
                });
            });
        });

    });

});