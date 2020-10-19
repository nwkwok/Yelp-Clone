import React, { useEffect, useContext } from 'react'
import axios from '../apis/RestaurantFinder'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'


const RestaurantDetailPage = () => {
    const { id } = useParams()
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/${id}`)
                setSelectedRestaurant(response.data.data.restaurant)
            } catch (err) {
                console.errorr(err.message);
            } 
        }

        fetchData();
    }, [])

    return (
        <div>
            {selectedRestaurant && selectedRestaurant.name}
        </div>
    )
}

export default RestaurantDetailPage
