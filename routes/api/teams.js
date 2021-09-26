import express from "express";
import { teams } from "../../data/teams.js";

const team_router = express.Router();

// Get all teams
team_router.get('/', (req, res) => {
    res.json(teams);
});

// Get single teams
team_router.get('/:id', (req, res) => {
    const team_id = req.params.id;
    const found = teams.some(team => team.id === team_id.toUpperCase());
    if (found) {
        res.json(teams.filter(team => team.id === team_id.toUpperCase()));
    } else {
        res.status(400).json({msg: `There is no team: ${team_id} in the GP`});
    }
});

export { team_router };