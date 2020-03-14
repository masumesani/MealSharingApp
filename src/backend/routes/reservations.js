const dbHelper = require('../data/dbHelper');
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let result = await dbHelper.getReservations();
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        let result = await dbHelper.getReservationById(req.params.id);
        if (result.length > 0) {
            res.send(result[0]);
            return;
        }
        res.sendStatus(404)
    }
    catch (err) {

        res.status(500).send(err)
    }
})

router.post('/', async (req, res) => {
    try {
        await dbHelper.insertReservation(req.body)
        res.sendStatus(200)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

router.put('/:id', async (req, res) => {
    try {
        await dbHelper.updateReservation(req.params.id, req.body);
        let result = await dbHelper.getReservationById(req.params.id);
        res.send(result[0])
    }
    catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await dbHelper.deleteReservation(req.params.id);
        res.sendStatus(200)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router;



