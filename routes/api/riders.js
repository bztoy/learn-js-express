import express from "express";
import { riders } from "../../data/riders.js";
import { v4 as uuidv4 } from 'uuid';

const rider_router = express.Router();

// Get all riders
rider_router.get('/', (req, res) => {
    res.json(riders);
});

// Get single riders
rider_router.get('/:number', (req, res) => {
    const rider_number = req.params.number;
    const found = riders.some(rider => rider.number === parseInt(rider_number));
    if (found) {
        res.json(riders.filter(rider => rider.number === parseInt(rider_number)));
    } else {
        res.status(400).json({msg: `No rider number: ${rider_number}`});
    }
});

// Create Rider
rider_router.post('/', (req, res) => {

    const newRider = {
        id: uuidv4(),
        number: parseInt(req.body.number),
        name: req.body.name,
        team: req.body.team
    }

    if (!newRider.number || !newRider.name) {
        return res.status(400).json({ msg: "Please include a number and name" });
    }

    riders.push(newRider);
    res.json(riders);
});

// Update
rider_router.put('/:number', (req, res) => {
    const rider_number = req.params.number;

    const found = riders.some(rider => rider.number === parseInt(rider_number));
    if (found) {
        const updRider = req.body;
        
        riders.forEach(rider => {
            if (rider.number === parseInt(rider_number)) {
                rider.name = updRider.name ? updRider.name : rider.name;
                rider.team = updRider.team ? updRider.team : rider.team;

                res.json({ msg: 'Rider updated', rider: rider});
            }
        });
    } else {
        res.status(400).json({msg: `No rider number: ${rider_number}`});
    }
});

// Delete
rider_router.delete('/:number', (req, res) => {
    const rider_number = req.params.number;
    const found = riders.some(rider => rider.number === parseInt(rider_number));
    if (found) {
        res.json({
            msg: `Rider number ${rider_number} deleted`,
            riders: riders.filter(rider => rider.number !== parseInt(rider_number))
        });
    } else {
        res.status(400).json({msg: `No rider number: ${rider_number}`});
    }
})

export { rider_router };
