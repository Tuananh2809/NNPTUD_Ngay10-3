const Role = require('../models/Role');
const User = require('../models/User');

exports.createRole = async (req, res) => {
    try {
        const role = await Role.create(req.body);
        res.status(201).json(role);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find({ isDeleted: false });
        res.json(roles);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findOne({ _id: req.params.id, isDeleted: false });
        if (!role) return res.status(404).json({ message: 'Không tìm thấy Role' });
        res.json(role);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.updateRole = async (req, res) => {
    try {
        const role = await Role.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            req.body,
            { new: true }
        );
        res.json(role);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.deleteRole = async (req, res) => {
    try {
        await Role.findByIdAndUpdate(req.params.id, { isDeleted: true });
        res.json({ message: 'Đã xoá mềm Role thành công' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getUsersByRoleId = async (req, res) => {
    try {
        const users = await User.find({ role: req.params.id, isDeleted: false });
        res.json(users);
    } catch (error) { res.status(500).json({ error: error.message }); }
};