const express = require('express');
const axios = require('axios');
const router = express.Router();

// We will store our users in memory
let usersArr = [];

router.get('/users', (req, res) => {
    // Array to hold axios promises (10 asynchronous requests), which we will resolve with Promise.all
    let promises = [];
    // Run loop 10 times to make 10 requests, then push promises into promises array
    for (let i = 1; i <= 10; i++) {
        promises.push(axios.get('https://randomuser.me/api/'));
    };
    // Resolve promises and use our data
    Promise.all(promises).then(values => {
        // For each loop to iterate over data array
        values.forEach(response => {
            // Push new user object into users array
            usersArr.push({
                gender: response.data.results[0].gender,
                firstname: response.data.results[0].name.first,
                city: response.data.results[0].location.city,
                email: response.data.results[0].email,
                cell: response.data.results[0].cell
            })
        });
        res.statusCode = 200;
        res.send(usersArr);
    }).catch(err => {
        console.log(err.message)
    });
});

// Added this extra route, which only uses 1 async request rather than 10 requests to obtain 10 new users
router.get('/users-2', (req, res) => {
    // Request to 3rd party API, get 10 results
    axios.get('https://randomuser.me/api/?results=10').then(response => {
        // For each loop to iterate over data array
        response.data.results.forEach(user => {
            // Push new user object into users array
            usersArr.push({
                gender: user.gender,
                firstname: user.name.first,
                city: user.location.city,
                email: user.email,
                cell: user.cell
            });
        });
        res.statusCode = 200;
        res.send(usersArr);
    }).catch((err) => {
        console.log(err);
    });
});

router.post('/users', (req, res) => {
    // Create newUser object from POST request data and push into users array
    usersArr.push({
        gender: req.body.gender,
        firstname: req.body.firstname,
        city: req.body.city,
        email: req.body.email,
        cell: req.body.cell
    });
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
