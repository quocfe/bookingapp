import express from 'express';

import { verifyAdmin } from '../utils/verifyToken.js';
import {
	createRoom,
	deleteRoom,
	getRoom,
	getRooms,
	updateAvailabilityRoom,
	updateRoom,
} from '../controllers/room.js';

const router = express.Router();

//ADD
router.post('/:hotelId', verifyAdmin, createRoom);

//UPDATE
router.put('/availability/:id', updateAvailabilityRoom);
router.patch('/:id', verifyAdmin, updateRoom);

//DELETE
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom);

//GET BY ID
router.get('/:id', getRoom);

//GET ALL
router.get('/', getRooms);

export default router;
