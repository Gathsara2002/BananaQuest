import BASE_URL from "../url/urlConfiguration.js";
import axios from "axios";

export async function getAllPlayers() {
    try {
        const response = await axios.get(`${BASE_URL}player/get-all`);
        return response.data;
    } catch (error) {
        console.error('Players Loading Error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function getPlayerById(id) {
    try {
        const response = await axios.get(`${BASE_URL}player/get-by-id`,
            {params: id});
        return response.data;
    } catch
        (error) {
        console.error('Player Loading Error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function score(player) {
    try {
        const response = await axios.post(`${BASE_URL}player/score`,player);
        console.log(response)
        return response.data;
    } catch
        (error) {
        console.error('Player scoring Error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function getPlayerByFkId(fkId) {
    try {
        const response = await axios.get(`${BASE_URL}player/get-by-fk-id`,
            {params: {fkId}});
        console.log(response);
        return response.data;
    } catch
        (error) {
        console.error('Player Loading Error:', error.response ? error.response.data : error.message);
        throw error;
    }
}