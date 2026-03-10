const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.getUsers = async (req, res) => {
    try {
        const { username } = req.query;
        let query = { isDeleted: false };

        if (username) {
            query.username = { $regex: username, $options: 'i' };
        }

        const users = await User.find(query).populate('role', 'name');
        res.json(users);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id, isDeleted: false }).populate('role');
        if (!user) return res.status(404).json({ message: 'Không tìm thấy User' });
        res.json(user);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            req.body,
            { new: true }
        );
        res.json(user);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { isDeleted: true });
        res.json({ message: 'Đã xoá mềm User thành công' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const toggleStatus = async (req, res, targetStatus) => {
    try {
        const { email, username } = req.body;
        const user = await User.findOne({ email, username, isDeleted: false });

        if (!user) return res.status(404).json({ message: 'Email hoặc username không đúng!' });

        user.status = targetStatus;
        await user.save();

        res.json({ message: `Đã ${targetStatus ? 'enable' : 'disable'} user thành công`, user });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.enableUser = (req, res) => toggleStatus(req, res, true);
exports.disableUser = (req, res) => toggleStatus(req, res, false);