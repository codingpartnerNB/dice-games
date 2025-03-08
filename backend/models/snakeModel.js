const mongoose = require('mongoose');

// const playerSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   score: { type: Number, default: 0 },
// });

const snakeLadderSchema = new mongoose.Schema({
  matchId: { type: String },
  playerCount: { type: Number },
  players: [{
    name: { type: String, required: true },
    score: { type: Number, default: 0 },
  }],
  winner: {
    name: { type: String },
    score: { type: Number }
  },
  createdAt: { type: Date, default: Date.now }
});

// Model
// const Player = mongoose.model('Player', playerSchema);
const Match = mongoose.model('snake', snakeLadderSchema);

module.exports = { Match };