
//@desc get all contacts
//@route GET /api/contacts
const getContacts = (req, res) => {
    res.status(200).json({message: 'get all contacts  cc'})
};

const createContact = (req, res) => {
    res.status(201).json({message: `create conact`})
};

module.exports = { getContacts,createContact };