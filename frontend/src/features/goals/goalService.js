import axios from "axios";

const API_URL = "http://localhost:5000/api/goals";
const getGoals = async () => {
  const { token } = JSON.parse(localStorage.getItem("user"));

  const response = await axios.get(API_URL, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (response.data) {
    return response.data;
  }
};

const addGoals = async (goalData) => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const response = await axios.post(API_URL, goalData, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (response.data) {
    return response.data;
  }
};

const updateGoals = async (goalData) => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const response = await axios.put(API_URL + `/${goalData._id}`, goalData, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (response.data) {
    return response.data;
  }
};

const deleteGoals = async (goalData) => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const response = await axios.delete(API_URL + `/${goalData._id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (response.data) {
    return response.data;
  }
};

const goalService = { getGoals, addGoals, updateGoals, deleteGoals };

export default goalService;
