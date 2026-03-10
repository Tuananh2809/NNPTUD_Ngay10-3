require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const userController = require('./controllers/userController');

const app = express();

app.use(express.json());

connectDB();

app.use('/roles', roleRoutes);
app.use('/users', userRoutes);

app.post('/enable', userController.enableUser);
app.post('/disable', userController.disableUser);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});