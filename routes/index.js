const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
    res.send('users get endpoint');
});

router.post('/users', (req, res) => {
    res.send('users post endpoint');
});

router.get('/users/firstname/:firstname', (req, res) => {
    res.send('users/firstname/:firstname');
});

module.exports = router;
