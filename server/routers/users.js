import express from 'express';
import {
	createUser,
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
// 	res.send('Hello user, you are logged in');
// });

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
// 	res.send('hello user, you are logged in and you can delete you account');
// });

// router.get('/checkadmin/:id', verifyUser, (req, res, next) => {
// 	res.send('hello admin, you are logged in and you can delete all account');
// });

//UPDATE
router.patch('/:id', verifyUser, updateUser);

//DELETE
router.delete('/:id', verifyUser, deleteUser);

//GET BY ID
router.get('/:id', verifyUser, getUser);

//GET ALL
router.get('/', verifyAdmin, getUsers);

export default router;
