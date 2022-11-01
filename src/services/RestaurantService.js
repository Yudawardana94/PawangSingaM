import axios from 'axios'
import { getBaseUrl } from '../config/api'

export const getRestaurants = async () => {
    try {
        const restaurants = await axios.get(`${getBaseUrl()}/r/pawangSinga/rst`)
        return restaurants.data.data
    } catch (error) {
        console.log(error, "--error")
        return []
    }
}

export const getRandom = async () => {
    try {
        const randomRes = await axios.get(`${getBaseUrl()}/r/pawangSinga/rst/random`)
        return randomRes.data.data[0]
    } catch (error) {
        console.log(error, "--error")
        return {}
    }
}