import axios from "axios";
import { API_PATHS } from "./apipath.js";


// backend url 
const baseUrl = import.meta.env.VITE_BASE_URL;


export const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axios.post(`${baseUrl}${API_PATHS.IMAGE.UPLOAD_IMAGE}`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        return response.data

    } catch (error) {
        console.error('Error uploading the image:', error);
        throw error;
    }
}