import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/users';
import serverConfig from '../config/database';

function generateToken(user) {
    return jwt.sign(user, serverConfig.secret, {
        expiresIn: 10000
    });
}

function setUserInfo(request) {
    return {
        _id: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        email: request.email,
        companyName: request.profile.companyName,
        role: request.role,
    }
};


//login route

exports.login = function(req, res, next) {
    let email = req.body.email;
    let pass = req.body.password;
    //let userInfo = setUserInfo(req.user);

    User.findOne({ email: email }, function(err, user) {
        if (err) {
            return next(err);
        }

        // If user is not found return error
        if (!user) {
            return res.status(422).send({ email: 'Can\'t find that email' });
        }

        const validPass = user.validPassword(pass);

        if (!validPass) {
            return res.status(422).send({ password: 'Incorrect Password' })

        }
        if (validPass) {
            let userInfo = setUserInfo(user);

            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            });

        }

    });
}

//register route
exports.register = function(req, res, next) {
console.log('firing on backend' ,req.body);
    // Check for registration errors
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const companyName = req.body.companyName;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const region = req.body.region;
    const businessType = req.body.businessType;
    const role = req.body.role;


    // Return error if no email provided
    if (!email) {
        return res.status(422).send({ email: 'You must enter an email address.' });
    }

    // Return error if full name not provided
    if (!firstName || !lastName) {
        return res.status(422).send({ error: 'You must enter your full name.' });
    }

    // Return error if no password provided
    if (!password) {
        return res.status(422).send({ password: 'You must enter a password.' });
    }

    User.findOne({ email: email }, function(err, existingUser) {
        if (err) {
            return next(err);
        }

        // If user is not unique, return error
        if (existingUser) {
            return res.status(422).send({ email: 'That email address is already in use.' });
        }

        // If email is unique and password was provided, create account
        let user = new User({
            email: email,
            password: password,
            profile: {
                firstName: firstName,
                lastName: lastName,
                companyName: companyName,
                address: address,
                city: city,
                state: state,
                region: region,
                businessType: businessType
            },
            role: role
        });

        user.save(function(err, user) {
            if (err) {
                return next(err);
            }

            // Subscribe member to Mailchimp list
            // mailchimp.subscribeToNewsletter(user.email);

            // Respond with JWT if user was created

            let userInfo = setUserInfo(user);

            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            });
        });
    });
}

//Role Authorization

exports.roleAuthorization = function(role) {
    return function(req, res, next) {
        const user = req.user;

        User.findById(user._id, function(err, foundUser) {
            if (err) {
                res.status(422).json({ error: 'No user was found.' });
                return next(err);
            }

            // If user is found, check role.
            if (foundUser.role == role) {
                return next();
            }

            res.status(401).json({ error: 'You are not authorized to view this content.' });
            return next('Unauthorized');
        })
    }
}
