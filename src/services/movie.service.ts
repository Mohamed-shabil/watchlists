import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;

export async function queryMovies(query: string, page: number) {
    const response = await axios.get(baseUrl, {
        params: {
            s: query,
            apiKey,
            page: page,
        },
    });
    return response;
}
