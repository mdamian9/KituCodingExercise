const express = require('express');
const axios = require('axios');
const router = express.Router();

// We will store our users in memory
let usersArr = [];

router.get('/users', (req, res) => {
    // Request to 3rd party API, get 10 results
    axios.get('https://randomuser.me/api/?results=10')
        .then((response) => {
            // For each loop to iterate over data array
            response.data.results.forEach(user => {
                // Create newUser object from response data
                const newUser = {
                    gender: user.gender,
                    firstname: user.name.first,
                    city: user.location.city,
                    email: user.email,
                    cell: user.cell
                };
                // Push new user into users array
                usersArr.push(newUser);
            });
            res.statusCode = 200;
            res.send(usersArr);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post('/users', (req, res) => {
    // Create newUser object from POST request data
    const newUser = {
        gender: req.body.gender,
        firstname: req.body.firstname,
        city: req.body.city,
        email: req.body.email,
        cell: req.body.cell
    };
    // Push new user into users array
    usersArr.push(newUser);
    res.statusCode = 201;
    res.json({ message: 'User successfully created!' });
});

router.get('/users/firstname/:firstname', (req, res) => {
    /*
        Filter through users stored in memory. This will return an array with one element,
        so we'll set targetUser equal to the first element in the array.
    */
    const targetUser = usersArr.filter((user) => {
        return user.firstname === req.params.firstname;
    })[0];

    // If user exists, everything is ok. If user DNE, set status code to 404, send back error
    if (targetUser) {
        res.statusCode = 200;
        res.json(targetUser);
    } else {
        res.statusCode = 404;
        res.json({ message: 'User not found!' });
    };
});

module.exports = router;
