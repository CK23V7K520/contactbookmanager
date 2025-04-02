const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api_error");

const { message } = require("laravel-mix/src/Log");

exports.create = (req, res) => {
    res.send({ message: "create handler" });
};

exports.findAll = (req, res) => {
    res.send({ message: "find all handler" });
};

exports.findOne = (req, res) => {
    res.send({ message: "find one handler" });
};

exports.update = (req, res) => {
    res.send({ message: "update handler" });
};

exports.delete = (req, res) => {
    res.send({ message: "delete handler" });
};

exports.deleteAll = (req, res) => {
    res.send({ message: "delete all handler" });
};

exports.findAllFavorite = (req, res) => {
    res.send({ message: "find all favorite handler" });
};

//Create and Save a new Contact
exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(
            new ApiError(400, "Name can not be empty")
        );
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creatwing the contact")
        );
    }
};

//Retrive all contacts of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;

        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};

// Find a single contact with an id