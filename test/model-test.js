"use strict";

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const User = require('../src/models/User');

chai.should();
chai.use(chaiAsPromised);

describe('User', () => {
    it('User properties are mapped to users DB table', () => {
        let user = new User();
        expect(user.hasOwnProperty('username')).to.equal(true);
        expect(user.hasOwnProperty('email')).to.equal(true);
        expect(user.hasOwnProperty('is_admin')).to.equal(true);
        expect(user.hasOwnProperty('created_at')).to.equal(true);
        expect(user.hasOwnProperty('id')).to.equal(true);
    });

    it('Retrieving user from invalid ID throws exception', () => {
        return User.fromId(0).should.be.rejected;
    });

    it('Creating a new user from JSON correctly maps all properties of model', () => {
        let json = {
            id: 1337,
            username: "allanpichardo",
            email: "allan@pichardo.com",
            is_admin: 1,
            created_at: new Date()
        };

        let user = User.fromJson(json);

        expect(user.id).to.equal(json.id);
        expect(user.username).to.equal(json.username);
        expect(user.email).to.equal(json.email);
        expect(user.is_admin).to.equal(json.is_admin);
        expect(user.created_at).to.equal(json.created_at);
    });

    it('Convenience methods (camelcase style mappers) correctly mapping to properties', () => {
        let user = new User();

        expect(user.createdAt).to.equal(user.created_at);
        expect(user.isAdmin).to.equal(user.is_admin === 1);
    });

    it('Can hash passwords and compare to plaintext', (done) => {
        let user = new User();
        user.setPassword("mytestpassword").then((hash) => {
            expect(user.password).to.not.equal("mytestpassword");
            user.checkPassword("mytestpassword").then((isMatch) => {
                expect(isMatch).to.equal(true);
                done();
            });
        });
    })

    it('Saving a user creates an entry in the database', () => {

        let newUser = new User();
        newUser.email = "dripsarchiveapi@integrationtest.com";
        newUser.username = new Date().getMilliseconds()+"";
        newUser.setPassword("testpassword");
        newUser.isAdmin = false;

        return newUser.save().should.be.fulfilled;

    });

    it('Searching for a user with an object of parameters', () => {
        let params = {email: 'dripsarchiveapi@integrationtest.com'};
        return User.search(params).should.be.fulfilled;
    });

    it('Delete a user', (done) => {
        User.search({email: 'dripsarchiveapi@integrationtest.com'}).then((users) => {
            expect(users).to.not.be.empty;
            expect(users[0].id).to.not.equal(0);
            users[0].destroy().then((affected) => {
                expect(affected).to.not.equal(0);
                done();
            }).should.be.fullfilled;
        });
    });
});