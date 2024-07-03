import api from "lib/api";

export const fetchProfile = async () => {
  const response = await api.get('/profile')
  return response.data;
}

export const updateProfile = async (formData: FormData) => {
  console.log(FormData.name);
  console.log(formData);

  const response = await api.put('/profile', formData)
  return response.data;
}

