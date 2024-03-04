import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

export const createHotel = async (req, res, next) => {
	const newHotel = new Hotel(req.body);
	try {
		const savedHotel = await newHotel.save();
		res.status(200).json(savedHotel);
	} catch (err) {
		next(err);
	}
};

export const updateHotel = async (req, res, next) => {
	try {
		const updateHotel = await Hotel.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updateHotel);
	} catch (error) {
		next(error);
	}
};

export const deleteHotel = async (req, res, next) => {
	try {
		await Hotel.findByIdAndRemove(req.params.id);
		res.status(200).json('Item has been deleted');
	} catch (error) {
		next(error);
	}
};

export const getHotel = async (req, res, next) => {
	console.log(req);
	try {
		const hotel = await Hotel.findById(req.params.id);
		res.status(200).json(hotel);
	} catch (error) {
		next(error);
	}
};

export const getHotels = async (req, res, next) => {
	const { min, max, ...others } = req.query;
	const limit = req.query.limit ? +req.query.limit : 4;
	try {
		const hotels = await Hotel.find({
			...others,
			cheapestPrice: { $gt: min || 1, $lt: max || 9999999999 },
		}).limit(limit);
		res.status(200).json(hotels);
	} catch (err) {
		next(err);
	}
};

export const countByCity = async (req, res, next) => {
	const cities = req.query.cities.split(',');

	try {
		const list = await Promise.all(
			cities.map((city) => {
				return Hotel.countDocuments({ city: city });
			})
		);
		res.status(200).json(list);
	} catch (err) {
		next(err);
	}
};

export const countByType = async (req, res, next) => {
	try {
		const hotelCount = await Hotel.countDocuments({ type: 'Hotel' });
		const penhouseCount = await Hotel.countDocuments({ type: 'Penhouse' });
		const houseCount = await Hotel.countDocuments({ type: 'House' });
		const resortCount = await Hotel.countDocuments({ type: 'Resort' });
		const list = [
			{ type: 'Hotel', count: hotelCount },
			{ type: 'Penhouse', count: penhouseCount },
			{ type: 'House', count: houseCount },
			{ type: 'Resort', count: resortCount },
		];
		res.status(200).json(list);
	} catch (err) {
		next(err);
	}
};

export const getHotelRooms = async (req, res, next) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		const list = await Promise.all(
			hotel.rooms.map((room) => {
				return Room.findById(room);
			})
		);
		res.status(200).json(list);
	} catch (error) {
		next(error);
	}
};
