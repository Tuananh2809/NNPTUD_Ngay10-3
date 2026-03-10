const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbURI = process.env.MONGO_URI;

        await mongoose.connect(dbURI);
        console.log('Đã kết nối MongoDB thành công!');
    } catch (error) {
        console.error('Lỗi kết nối MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;