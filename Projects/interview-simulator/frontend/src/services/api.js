import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const fetchQuestions = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/questions`);
        return response.data;
    } catch (error) {
        console.error("Error fetching questions:", error);
        throw error;
    }
};

export const submitTest = async (answers) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/submit`, { answers });
        return response.data;
    } catch (error) {
        console.error("Error submitting test:", error);
        throw error;
    }
};
