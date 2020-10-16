import React, { useState, useContext } from 'react'
import axios from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext';



function AddRestaurant() {
    const { addRestaurants } = useContext(RestaurantsContext)
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post('/', {
            name,
            location,
            price_range: priceRange
        })
        addRestaurants(response.data.data.restaurant);

    } catch (err) {
        console.error(err.message)
    }
}

    return (
        <div className="mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input 
                        type="text" 
                        onChange={(e) => setName(e.target.value)} 
                        className="form-control" 
                        placeholder="name"
                        value={name}/>
                    </div>      
                    <div className="col">
                        <input 
                        type="text" 
                        onChange={(e) => setLocation(e.target.value)} 
                        className="form-control" 
                        placeholder="location"
                        value={location}/>
                    </div>      
                    <div className="col">
                        <select 
                        onChange={e => setPriceRange(e.target.value)}
                        value={priceRange}
                        className="custom-select my-1 mr-sm-2">
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>  
                    <button 
                        type="submit" 
                        onClick={handleSubmit}
                        className="btn btn-primary">Add</button>    
                </div>   
            </form>
        </div>
    )
}



export default AddRestaurant
