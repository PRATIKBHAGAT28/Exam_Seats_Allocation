import axios from 'axios';

const API_URL = 'http://localhost:5000/api/exams';

export const createExam = (examData) => {
  return axios.post(API_URL, examData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const getMyExams = () => {
  return axios.get(`${API_URL}/my-exams`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const getExamById = (examId) => {
  return axios.get(`${API_URL}/${examId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const updateExam = (examId, examData) => {
  return axios.put(`${API_URL}/${examId}`, examData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const deleteExam = (examId) => {
  return axios.delete(`${API_URL}/${examId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
