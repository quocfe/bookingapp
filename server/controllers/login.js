import User from '../models/User.js';
import { createError } from './../utils/error.js';

export const login = async (req, res, next) => {
	try {
		const user = User.findOne({
			username: req.body.username,
		});
		if (!user) return next(createError(404, 'User not found'));
		res.status(200).send('user has been created');
	} catch (error) {
		next(error);
	}
};
