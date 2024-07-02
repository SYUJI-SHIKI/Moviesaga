import api from "lib/api";

export const fetchProfile = async () => {
  const response = await api.get('/profile')
  return response.data;
}

export const updateProfile = async () => {
  const response = await api.post('/profile')
  return response.data;
}

