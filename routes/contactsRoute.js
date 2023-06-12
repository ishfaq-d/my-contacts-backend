const express = require("express");
const router = express.Router();
const { getContacts,createContact } = require('../controllers/contactController');


router.route('/').get(getContacts);

router.route('/:id').get((req, res) => {
    res.status(200).json({message: `get conact ${req.params.id}`})
});

router.route('/').post((req, res) => {
    res.status(201).json({message: `create conact`})
});

router.route('/:id').put((req, res) => {
    res.status(200).json({message: `udpate conact ${req.params.id}`})
});

router.route('/:id').delete((req, res) => {
    res.status(200).json({message: `delete conact ${req.params.id}`})
});


module.exports = router;