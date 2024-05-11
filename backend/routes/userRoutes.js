import express from 'express';
import * as user from '../controllers/userController.js';

const router = express.Router();

router.get('/all-users', user.getAllUsers);

router.get('/:id', user.getSingle);

router.post('/register', user.createUser);

router.post('/send-friend-request', user.sendFriendRequest);

router.delete('/delete/:id', user.deleteUser);

router.post('/login', user.loginUser);

export default router;
