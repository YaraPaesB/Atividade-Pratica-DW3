var User = require('../models/userModel');

exports.getUser = async function (req, res) {
    try {
        const result = await User.find();
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.create = function (req, res) {
    let user = new User(
        {
            name: req.body.name,
            age: req.body.age
        }
    );
    user.save()
        .then(res.status(201).send(user.toJSON()))
        .catch((err) => {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar usuário.` })
        })
};

exports.details = async function (req, res) {
    try {
        const result = await User.findById(req.params.id);
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.update = async function (req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteUser = async function (req, res) {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).send(); 
    } catch (err) {
        res.status(500).json(err);
    }
};
