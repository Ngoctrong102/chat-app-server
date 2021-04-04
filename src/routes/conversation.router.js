var express = require('express');
var router = express.Router();
var ConversationController = require('../controllers/Conversation.Controller');

const checkAuth = require('../middleware/checkAuth');

router.post('/', checkAuth, ConversationController.getConversation)

module.exports = router;