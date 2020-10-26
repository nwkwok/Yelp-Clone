import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? '/restaurants' : "http://localhost:3000/restaurants";

export default axios.create({
    baseURL
})