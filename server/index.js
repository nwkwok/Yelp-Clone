require('dotenv').config();
const { PRIORITY_LOW } = require('constants');
const pool = require('./db')
const express = require('express');
const app = express();
const port = process.env.PORT; 
const morgan = require('morgan');
const cors = require('cors');

//middlware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'))

//Create Restaurant 
app.post('/restaurants', async(req, res) => {
    try {
        const { name, location, price_range } = req.body
        const createRestaurant = await pool.query(
            `INSERT INTO restaurants(name, location, price_range) VALUES ($1, $2, $3) RETURNING *`, 
            [name, location, price_range]);

        res.status(200).json({
            status: 'success',
            data: {
                restaurant: createRestaurant.rows[0]
            }
        })
    } catch (err) {
        console.error(err.message)
    }
})

//Get All Restaurants
app.get('/restaurants', async(req, res) => {
    try {
    const getRestaurants = await pool.query(
        'SELECT * FROM restaurants')
        res.status(200).json({
            status: 'success',
            results: getRestaurants.rows.length,
            data: {
                restaurants: getRestaurants.rows,
                },
            });
    } catch (err) {
        console.error(err.message)
    }
})

//Get One Restaurant
app.get('/restaurants/:id', async(req, res) => {
    const { id } = req.params
    try {
        const getRestaurantsById = await pool.query(
            'SELECT * FROM restaurants WHERE id = $1',
             [id])

        res.status(200).json({
            status: 'success',
            data: {
                restaurant: getRestaurantsById.rows[0]
            },
        });
        
    } catch (err) {
        console.error(err.message)
    }
})

//Update
app.put('/restaurants/:id', async(req, res) => {
    const { id } = req.params
    const { name, location, price_range } = req.body
    try {
        const updateRestaurant = await pool.query(
            'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING * ', 
            [name, location, price_range, id]
        )
        res.status(200).json({
            status: 'success',
            data: {
                restaurants: updateRestaurant.rows[0]
            }
        })
    } catch (err) {
        console.error(err.message)
        
    }
})

//Delete

app.delete('/restaurants/:id', async(req, res) => {
    const { id } = req.params
    try {
        const deleteRestaurant = await pool.query(
            'DELETE FROM restaurants WHERE id = $1',
            [id]
        )

        res.status(204).json({status: 'success'})
           
    } catch (err) {
        console.error(err.message);
    }
})


app.listen(port || 3005, () => {
    console.log("You are listening on port 3000");
});
