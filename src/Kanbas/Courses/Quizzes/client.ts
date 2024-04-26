import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;

export const createQuiz = async (courseId: string, quizData: object) => {
    return axios.post(`${COURSES_API}/${courseId}/quiz`, quizData);
};

export const updateQuiz = async (quizId: string, updateData: object) => {
    return axios.put(`${QUIZZES_API}/${quizId}`, updateData);
};
export const getQuiz = async(quizId: string) => {
    return axios.get(`${QUIZZES_API}/${quizId}`);
}
export const getQuizzesWithCourseId = async (courseId: string) => {
    return axios.get(`${COURSES_API}/${courseId}/quizzes`);
};

export const deleteQuiz = async (quizId: string) => {
    return axios.delete(`${QUIZZES_API}/quizzes/${quizId}`);
};