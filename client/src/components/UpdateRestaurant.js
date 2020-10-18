import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../apis/RestaurantFinder'

function UpdateRestaurant(props) {
    const { id } = useParams();
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("")
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/${id}`)
            console.log(response.data.data);
            setName(response.data.data.restaurant.name)
            setLocation(response.data.data.restaurant.location)
            setPriceRange(response.data.data.restaurant.price_range)
        }

        fetchData();
    }, [])

    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        className="form-control"
                        value={name}
                        onChange={e => setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input 
                        type="text" 
                        id="location" 
                        className="form-control"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input 
                        type="number" 
                        id="price_range" 
                        className="form-control"
                        value={priceRange}
                        onChange={e => setPriceRange(e.target.value)}/>
                </div>
            </form>
        <button type="submit" className="btn btn-primary">Submit</button>
        </div>
    ) 
}

export default UpdateRestaurant
