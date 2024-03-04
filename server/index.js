import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoute from './routers/auth.js';
import hotelsRoute from './routers/hotels.js';
import roomsRoute from './routers/rooms.js';
import usersRoute from './routers/users.js';
import cors from 'cors'

const app = express();
dotenv.config();

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO);
		console.log('connect mongodb');
	} catch (error) {
		console.log(error);
	}
};

mongoose.connection.on('disconnected', () => {
	console.log('MONGO disconnected');
});

mongoose.connection.on('connected', () => {
	console.log('MONGO connected');
});

// middlewares

app.use(cookieParser());
app.use(express.json());
app.use(cors())

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || 'Something went wrong!';
	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	});
});

//
app.listen(8800, () => {
	connect();
	console.log('connected to backend!');
});
