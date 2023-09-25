import axios from "axios";
import * as constants from "./constants.js";

export async function searchImage(searchWord) {
    const url = `${constants.DOMAIN}${constants.API}/?key=${constants.PIXABAY_API_KEY}&q=${searchWord}&image_type=photo&per_page=50`;

    try {
        const response = await axios.get(url);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new RequestError(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        if (error.isAxiosError) {
            throw new NetworkError("Network error occurred");
        } else {
            console.error("Error fetching images:", error);
            throw error;
        }
    }
}


export async function getImageById(imageId) {
    const url = `${constants.DOMAIN}${constants.API}/?key=${constants.PIXABAY_API_KEY}&id=${imageId}`;

    try {
        const response = await axios.get(url);

        if (response.status === 200) {
            console.log(response);
            return response.data.hits[0]; // Assuming you want the first image in the hits array
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching image by ID:', error);
        throw error;
    }
}

class RequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "RequestError";
    }
}

class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}