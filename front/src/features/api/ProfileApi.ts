import api from "lib/api";

export const fetchProfile = async () => {
  const response = await api.get('/profile')
  return response.data;
}

export const updateProfile = async (formData: FormData) => {
  console.log(formData);

  const response = await api.put('/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

