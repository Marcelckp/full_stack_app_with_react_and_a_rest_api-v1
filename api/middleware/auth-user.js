'use strict';

const auth = require('basic-auth');
const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.authenticateUser = async(req, res, next) => {
    let message;

    const credentials = auth(req);

    if (credentials) {
        const user = await User.findOne({ where: { emailAddress: credentials.name } })
        if (user) {
            const authenticated = bcrypt.compareSync(credentials.pass, user.password)
            if (authenticated) {
                console.log(`Authentication successful for username: ${user.emailAddress}: ${user.firstName} ${user.lastName}`)
                req.currentUser = user;
            } else {
                message = `Authentication failed for username: ${user.emailAddress}: ${user.firstName} ${user.lastName}`;
            }
        } else {
            message = `User "${credentials.name}" was not found`;
        }
    } else {
        message = 'Authorize header not found';
    }

    if (message) {
        console.warn(message);
        res.status(401).json({
            message: "Access Denied",
        });
    } else {
        next();
    }
}