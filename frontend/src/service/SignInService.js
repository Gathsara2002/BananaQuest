import BASE_URL from "../url/urlConfiguration.js";
import axios from "axios";

export async function signInUser(signIn) {
    try {
        const response = await axios.post(`${BASE_URL}sign-in/save`, signIn);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function loginUser(login) {
    try {
        const response = await axios.post(`${BASE_URL}sign-in/login`, login);
        // Assuming the backend response includes a 'userId' field
        console.log(response.data);
        const userId = response.data.result.id;
        if (userId) {
            // If a user ID already exists in localStorage, remove it to avoid conflicts
            localStorage.removeItem('banana_userId');
            // Store the new user ID in localStorage
            localStorage.setItem('banana_userId', userId);
        }
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAllUsers() {
    try {
        const response = await axios.get(`${BASE_URL}sign-in/get-all`);
        return response.data;
    } catch (error) {
        console.error('Loading Error:', error.response ? error.response.data : error.message);
        throw error;
    }
}