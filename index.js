require('dotenv').config();
const { PRIORITY_LOW } = require('constants');
const pool = require('./db')
const path = require('path')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; 
const morgan = require('morgan');
const cors = require('cors');



//middlware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'))

if (process.env.NODE_ENV === "production") {
    app.use(path.join(__dirname, "client/build"));
}

//Create Restaurant or Review
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

app.post('/restaurants/:id/addReview', async (req, res) => {
    const { id } = req.params
    const { name, review, rating } = req.body
    try {
        const addReview = await pool.query(
            'INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *',
            [id, name, review, rating])
        
            res.status(201).json({
                status: 'success',
                data: {
                    review: addReview.rows[0]
                }
            });
    } catch (err) {
        console.error(err.message);
    }
})


//Get All Restaurants
app.get('/restaurants', async(req, res) => {
    try {
    // const getRestaurants = await pool.query('SELECT * FROM restaurants')
    const restaurantRatingsData = await pool.query('SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;'
        )

        res.status(200).json({
            status: 'success',
            results: restaurantRatingsData.rows.length,
            data: {
                restaurants: restaurantRatingsData.rows,
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
            'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1;',
             [id])

        const getReviewById = await pool.query(
            'SELECT * FROM reviews WHERE restaurant_id = $1',
             [id])

        res.status(200).json({
            status: 'success',
            data: {
                restaurant: getRestaurantsById.rows[0],
                reviews: getReviewById.rows
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

app.get('*', (req, res) => {
    res.sendFile(path.join(__firname, "client/build/index.html"));
})

app.listen(PORT || 3005, () => {
    console.log("You are listening on port 3000");
});
