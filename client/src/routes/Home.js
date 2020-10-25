import React from 'react'
import AddRestaurant from '../components/AddRestaurant'
import Header from '../components/Header'
import RestaurantList from '../components/RestaurantList'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <div>
            <Header />
            <AddRestaurant />
            <RestaurantList />

        </div>
    )
}

export default Home
