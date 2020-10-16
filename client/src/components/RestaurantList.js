import React, { useContext, useEffect } from 'react'
import axios from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useHistory } from 'react-router-dom';

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

    const handleDelete = async(id) => {
        try {
            const response = await axios.delete(`/${id}`)
            setRestaurants(restaurants.filter(r => id !== r.id))
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleUpdate = async(id) => {
        history.push(`/restaurants/${id}/update`);
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
                        <tr key={r.id}>
                            <td>{r.name}</td>
                            <td>{r.location}</td>
                            <td>{"$".repeat(r.price_range)}</td>
                            <td>{r.rating}</td>
                            <td><button onClick={() => handleUpdate(r.id)} className="btn btn-warning">Update</button></td>
                            <td><button onClick={() => handleDelete(r.id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    )
                })}

                    {/* <tr>
                        <td>McDonalds</td>
                        <td>New York</td>
                        <td>$$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
                    <tr>
                        <td>McDonalds</td>
                        <td>New York</td>
                        <td>$$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
                    <tr>
                        <td>McDonalds</td>
                        <td>New York</td>
                        <td>$$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList
