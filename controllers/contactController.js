const asyncHandler = require('express-async-handler');

const Contact = require('../models/contactModel');

const getContacts = asyncHandler(async (req, res) => {

    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

const getContact = asyncHandler(async (req, res) => {

    const contact  = await Contact.findById(req.params.id);

    if(!contact) {
        res.status(404);
        throw new Error('contact not found');
    }
    res.status(200).json(contact);
});

const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);

    const { name, email, phone } = req.body;

    if(!name || !email || !phone) {
        res.status(400);
        throw Error('All fields required');
    };

    const contact = Contact.create({
        name,
        email,
        phone
    });
    res.status(201).json(contact)
});

const updateContact = asyncHandler(async (req, res) => {

    const contact  = await Contact.findById(req.params.id);

    if(!contact) {
        res.status(404);
        throw new Error('contact not found');
    }

    const udpatedContact = await Contact.findByIdAndUpdate(
        reg.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(udpatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact  = await Contact.findById(req.params.id);

    console.log('delete contact: ', contact);

    if(!contact) {
        res.status(404);
        throw new Error('contact not found');
    }

    await Contact.remove();

    res.status(200).json(contact);
});

module.exports = { 
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact 
};