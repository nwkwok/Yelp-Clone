import React, { useEffect, useContext, Fragment } from 'react'
import axios from '../apis/RestaurantFinder'
import Reviews from '../components/Reviews'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'
import AddReview from '../components/AddReview'
import StarRating from '../components/StarRating'


const RestaurantDetailPage = () => {
    const { id } = useParams()
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/${id}`)
                console.log(response)

                setSelectedRestaurant(response.data.data)
                console.log(response.data.data)

            } catch (err) {
                console.error(err.message);
            } 
        }
        fetchData();
    }, [])

    return (
        <div>
            {selectedRestaurant && (
                <Fragment>
                    <h1 className="text-center display-1">{selectedRestaurant.restaurant.name}</h1>
                    <div className="text-center">
                        <StarRating rating={selectedRestaurant.restaurant.average_rating} />
                        <span className="text-warning ml-1">
                            {selectedRestaurant.restaurant.count 
                            ? `(${selectedRestaurant.restaurant.count})` 
                            : "(0)"}
                        </span>
                    </div>
                    <div className="mt-3">
                        <Reviews reviews={selectedRestaurant.reviews} />
                    </div>
                    <AddReview />
                    
                </Fragment>
            )}
        </div>
    )
}

export default RestaurantDetailPage
