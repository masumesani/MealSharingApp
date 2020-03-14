const pool = require('./database');

function runQuery(query) {
    return new Promise((resolve, reject) => {
        pool.query(query, function (err, result, fields) {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

function validateAndConvertToSqlDate(str) {
    let sqlTime = (new Date(str));
    if (isNaN(sqlTime.getTime())) {
        throw `invalid date ${str}`;
    }
    return sqlTime.toMysqlFormat();
}

module.exports.getAllMeals = (title, createdAfter, maxPrice, limit) => {
    let query = 'select * from Meal';
    let sqlFilter = [];
    if (title) {
        sqlFilter.push(`title regexp '${title}'`);
    }
    if (createdAfter) {
        sqlFilter.push(`created_date > '${validateAndConvertToSqlDate(createdAfter)}'`);
    }
    if (maxPrice) {
        sqlFilter.push(`price < ${maxPrice}`);
    }
    if (sqlFilter.length > 0) {
        query += ` where ${sqlFilter.join(' and ')}`
    }
    limit = parseInt(limit);
    if (isNaN(limit)) {
        limit = 10;
    }
    query += ` limit ${limit}`
    return runQuery(query);
}

module.exports.getMealById = (id) => {
    return runQuery(`select * from Meal where id='${id}'`);
}

module.exports.insertMeal = (meal) => {
    return runQuery(`insert into Meal 
    values(default, '${meal.title}','${meal.description}',
    '${meal.location}','${validateAndConvertToSqlDate(meal.serving_time)}',
    ${meal.max_reservation},${meal.price},null)`)
}

module.exports.deleteMeal = (id) => {
    return runQuery(`delete from Meal 
    where id= ${id}`)
}

module.exports.updateMeal = async (id, meal) => {
    if (meal.serving_time) {
        //TODO timezone is broken
        meal.serving_time = validateAndConvertToSqlDate(meal.serving_time);
    }

    let str = Object.entries(meal)
        .map(element => `${element[0]}='${element[1]}'`)
        .join(',');

    let query = `update Meal Set ${str} where id = ${id} `
    return runQuery(query)
}

module.exports.getReservations = () => {
    return runQuery(`select * from Reservation`)
}

module.exports.getReservationById = (id) => {
    return runQuery(`select * from Reservation where id = ${id}`)
}
module.exports.insertReservation = (resevation) => {
    return runQuery(`insert into Reservation values(default,
       ${resevation.number_of_guests} ,${resevation.meal_id},default)`)
}

module.exports.updateReservation = (id, reservation) => {
    let str = Object.entries(reservation)
        .map(element => `${element[0]}='${element[1]}'`)
        .join(',');

    let query = `update Reservation Set ${str} where id = ${id} `
    return runQuery(query)

}

module.exports.deleteReservation =(id) =>{
    let query = `delete from Reservation where id = ${id}`;
    return runQuery(query)
}