const dbHelper = require('../data/dbHelper');
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let result = await dbHelper.getAllMeals(req.query.title,
            req.query.createdAfter,
            req.query.maxPrice,
            req.query.limit);

        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        let result = await dbHelper.getMealById(req.params.id);
        if (result.length === 1) {
            res.send(result[0])
            return
        }
        res.sendStatus(404);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.put('/:id', async (req, res) => {
    try {
        await dbHelper.updateMeal(req.params.id, req.body);
        let meal = await dbHelper.getMealById(req.params.id);
        res.send(meal);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await dbHelper.deleteMeal(req.params.id);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.post('/', async (req, res) => {
    try {
        await dbHelper.insertMeal(req.body);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

module.exports = router;