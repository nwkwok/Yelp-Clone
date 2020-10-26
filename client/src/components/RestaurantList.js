import React, { useContext, useEffect, Fragment } from 'react'
import axios from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useHistory } from 'react-router-dom';
import StarRating from '../components/StarRating'

const RestaurantList = (props) => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext)
    let history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/");    
                setRestaurants(response.data.data.restaurants);
                
            } catch (err) {
                console.error(err.message)
            }
        };
        fetchData();
    }, [])

    const handleDelete = async(e, id) => {
        try {
            e.stopPropagation()
            const response = await axios.delete(`/${id}`)
            setRestaurants(restaurants.filter(r => id !== r.id))
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleUpdate = async(e, id) => {
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`);
        }

    const handleRestaurantSelect = (id) => {
        history.push(`/restaurants/${id}`);
    }

    const renderRating = (restaurant) => {

        if (!restaurant.count) {
            return <span className="text-warning">0 reviews</span>
        }
        
        return (
        <Fragment>
        <StarRating rating={restaurant.average_rating} /> 
        <span className="text-warning ml-1">{restaurant.count}</span>
        </Fragment>
        )
    }
    

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>

                {restaurants && 
                    restaurants.map(r => {
                    return (
                        <tr onClick={()=> handleRestaurantSelect(r.id)} key={r.id}>
                            <td>{r.name}</td>
                            <td>{r.location}</td>
                            <td>{"$".repeat(r.price_range)}</td>
                            <td>{renderRating(r)}</td>
                            <td><button onClick={(e) => handleUpdate(e, r.id)} className="btn btn-warning">Update</button></td>
                            <td><button onClick={(e) => handleDelete(e, r.id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    )
                })}

                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList
