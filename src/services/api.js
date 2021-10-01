import axios from 'axios';

export const key = '959a52c4d8c75a1a0f4f6e4ad8983d28'

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3'
})

export default api;