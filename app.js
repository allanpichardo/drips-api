"use strict";

let User = require('./src/models/User');

let user = new User();
user.email = "allan.pichardo@gmail.com";
console.log(user.email);
console.log(user.isAdmin);
user.id = undefined;
console.log(JSON.stringify(user));

User.fromId(id, (user) => {
    console.log(user);
});