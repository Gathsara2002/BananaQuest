import BASE_URL from "../url/urlConfiguration.js";
import axios from "axios";

export async function signInUser(signIn) {
    try {
        const response = await axios.post(`${BASE_URL}/sign-in/save`, signIn);
        return response.data;
    } catch (error) {
        console.error('Sign-in Error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function loginUser(login) {
    try {
        const response = await axios.post(`${BASE_URL}/sign-in/login`, login);
        return response.data;
    } catch (error) {
        console.error('Login Error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function getAllUsers() {
    try {
        const response = await axios.get(`${BASE_URL}/sign-in/get-all`);
        return response.data;
    } catch (error) {
        console.error('Loading Error:', error.response ? error.response.data : error.message);
        throw error;
    }
}