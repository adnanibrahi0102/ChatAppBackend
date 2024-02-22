import express from 'express';
import requireSignIn from '../middleware/requireSignIn.js';
import { getAllUsersController } from '../controllers/users.controller.js';

const router =express.Router();

router.get('/getAllUsers',requireSignIn,getAllUsersController)
export default router;