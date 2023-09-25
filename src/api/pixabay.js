import axios from "axios";
import * as constants from "./constants.js";

export async function searchImage(searchWord) {
    const url = `${constants.DOMAIN}${constants.API}/?key=${constants.PIXABAY_API_KEY}&q=${searchWord}&image_type=photo`;

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