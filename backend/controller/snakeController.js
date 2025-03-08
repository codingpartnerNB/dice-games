const { Match } = require('../models/snakeModel');

// Create a new match with players
exports.createMatch = async (req, res) => {
    try {
        const { playerCount, players, matchId } = req.body;
        const match = new Match({
            matchId,
            playerCount,
            players: players, // Initialize players with 0 score
            winner: {
                name: null,
                score: 0
            }
        });

        await match.save();
        res.status(201).json({ message: "Match created successfully", match });

    } catch (error) {
        console.error("Match creation error:", error);
        res.status(500).json({ error: error.message });
    }
};


exports.updateScore = async (req, res) => {
    try {
        const { matchId } = req.params; // matchId is actually _id in MongoDB
        const { players, winner } = req.body; // Expecting players array and winner object

        // Find the match using matchId (_id in MongoDB)
        const match = await Match.findOne({ matchId });
        if (!match) return res.status(404).json({ message: 'Match not found' });

        // Update players' scores
        match.players = players;

        // If a winner is set, update their score
        if (winner && winner.name) {
            const playerIndex = match.players.findIndex(player => player.name === winner.name);
            if (playerIndex !== -1) {
                match.players[playerIndex].score = winner.score; // Update winner's score
            }
            match.winner = winner; // Update the winner field
        }

        // Save the updated match
        await match.save();

        res.json({ message: 'Score updated', match });
    } catch (error) {
        console.error("Error updating score:", error);
        res.status(500).json({ error: error.message });
    }
};




exports.determineWinner = async (req, res) => {
    try {
        const { winner } = req.body; // Expecting { name: "Winner Name" }
        const { matchId } = req.params;

        // Find the match by matchId
        const match = await Match.findOne({ matchId: matchId });
        if (!match) return res.status(404).json({ message: 'Match not found' });

        // Find the winning player in the players array
        const playerIndex = match.players.findIndex(player => player.name === winner.name);
        if (playerIndex === -1) {
            return res.status(400).json({ message: 'Winner not found in the match' });
        }

        console.log(playerIndex)

        // Increment the winner's score
        match.players[playerIndex].score = match.players[playerIndex].score + 1;

        // Update the winner field in match
        match.winner = {
            name: winner.name,
            score: winner.score
        };

        // Save the updated match
        await match.save();

        res.json({ message: `Winner determined: ${winner.name}`, match });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getMatchDetails = async (req, res) => {
    try {
        const { matchId } = req.params;

        const match = await Match.findOne({ _id: matchId });
        if (!match) return res.status(404).json({ message: 'Match not found' });

        res.json(match);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllMatches = async (req, res) => {
    console.log("okkk")
    try {
        console.log("ok")
        // const { matchId } = req.params;

        const match = await Match.find();
        // if (!match) return res.status(404).json({ message: 'Match not found' });

        res.json(match);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.resetAll = async (req, res) => {
    try {
        await Match.deleteMany({});
        res.json({ message: 'All matches have been reset' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};