import express from 'express';
import { getMessagesController, sendMessageController } from '../controllers/message.controller.js';
import requireSignIn from '../middleware/requireSignIn.js'

const router = express.Router();

router.get('/getMessages/:id',requireSignIn,getMessagesController);
router.post('/sendMessage/:id', requireSignIn, sendMessageController);
router.delete('/deleteMessage/:id', requireSignIn)


export default router;
