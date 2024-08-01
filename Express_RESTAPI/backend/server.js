// import modules
const express = require('express');
const dotenv =  require('dotenv').config();
// reads .env file from root directory, map key-value pairs to dotenv object.
// config is used to load environment variables from dotenv object.
const {errorHandler} = require('./middlewares/errorMiddleware.js');
const connectDB = require('./config/db.js');

const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/goals', require('./routes/goalRoutes.js'));
app.use('/api/users', require('./routes/userRoutes.js'));

app.use(errorHandler); // overwrite default error handler by express

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});