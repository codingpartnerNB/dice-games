const express = require('express');
const router = express.Router();
const matchController = require('../controller/snakeController');

router.post('/create', matchController.createMatch); 
router.put('/update-score/:matchId', matchController.updateScore);
router.put('/winner/:matchId', matchController.determineWinner);
// router.get('/:matchId', matchController.getMatchDetails); 
router.get('/get/allmatch', matchController.getAllMatches); 
router.delete("/reset", matchController.resetAll);

module.exports = router;