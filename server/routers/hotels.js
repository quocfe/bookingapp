import express from 'express';
import {
	countByCity,
	countByType,
	createHotel,
	deleteHotel,
	getHotel,
	getHotelRooms,
	getHotels,
	updateHotel,
} from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//ADD
router.post('/', verifyAdmin, createHotel);

//UPDATE
router.patch('/:id', verifyAdmin, updateHotel);

//DELETE
router.delete('/:id', verifyAdmin, deleteHotel);

//GET BY ID
router.get('/find/:id', getHotel);

//GET ALL
router.get('/', getHotels);

// COUNTBYCITY
router.get('/room/:id', getHotelRooms);
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);

export default router;
