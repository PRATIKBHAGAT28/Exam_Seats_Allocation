import axios from 'axios';

const API_URL = 'http://localhost:5000/api/seats';

export const getMySeatAllocations = (examId) => {
  const url = examId ? `${API_URL}/my-seats?examId=${examId}` : `${API_URL}/my-seats`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const allocateSeats = (examId) => {
  return axios.post(`${API_URL}/allocate/${examId}`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const getSeatsByExam = (examId) => {
  return axios.get(`${API_URL}/exam/${examId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
