import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

export const createRoom = async (req, res, next) => {
	const hotelId = req.params.hotelId;
	const newRoom = new Room(req.body);

	try {
		const savedRoom = await newRoom.save();
		try {
			await Hotel.findByIdAndUpdate(hotelId, {
				$push: { rooms: savedRoom._id },
			});
		} catch (error) {
			next(error);
		}
		res.status(200).json(savedRoom);
	} catch (error) {
		next(error);
	}
};

export const updateRoom = async (req, res, next) => {
	try {
		const updateRoom = await Room.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updateRoom);
	} catch (error) {
		next(error);
	}
};

export const updateAvailabilityRoom = async (req, res, next) => {
	try {
		await Room.updateOne(
			{ 'roomNumbers._id': req.params.id },
			{
				$push: {
					'roomNumbers.$.unavailableDates': req.body.dates,
				},
			}
		);
		res.status(200).json('Room status has been updated.');
	} catch (error) {
		next(error);
	}
};

export const deleteRoom = async (req, res, next) => {
	const hotelId = req.params.hotelId;
	try {
		await Room.findByIdAndRemove(req.params.id);
		try {
			await Hotel.findByIdAndUpdate(hotelId, {
				$pull: { rooms: req.params.id },
			});
		} catch (error) {
			next(error);
		}
		res.status(200).json('Item has been deleted');
	} catch (error) {
		next(error);
	}
};

export const getRoom = async (req, res, next) => {
	try {
		const hotel = await Room.findById(req.params.id);
		res.status(200).json(hotel);
	} catch (error) {
		next(error);
	}
};

export const getRooms = async (req, res, next) => {
	try {
		const rooms = await Room.find();
		res.status(200).json(rooms);
	} catch (err) {
		next(err);
	}
};
