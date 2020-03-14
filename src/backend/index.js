const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors())
const router = express.Router();
const port = 3000;
const fs = require('fs');
const path = require('path');

app.use(express.json())

const mealsRouter = require('./routes/meals.js');
const reservationsRouter = require('./routes/reservations.js');
const reviewsRouter = require('./routes/reviews.js');

app.use(function (req, res, next) {
    const msg = `${(new Date()).toLocaleString()} request received for path: ${req.url}`;
    console.log(msg);
    fs.appendFile('logs', msg + '\r\n', () => {
        next()
    });
})

app.use(express.static(path.join(__dirname, '../frontend')));

app.use("/api", router);

router.use('/meals', mealsRouter);

router.use('/reservations', reservationsRouter);

router.use('/reviews', reviewsRouter);

router.use(function (req, res, next) {
    res.status(404).send('Unknown Route')
})

app.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname,'../frontend/404.html'));
})

app.listen(port, () => console.log(`listening on port ${port}`));