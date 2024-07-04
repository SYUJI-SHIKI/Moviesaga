import api from "lib/api";

export const fetchProfile = async () => {
  const response = await api.get('/profile')
  return response.data;
}

export const updateProfile = async (formData: FormData) => {
  try {
    const response = await api.put('/profile', formData, {
      headers: {
        'Content-Type': "application/json",
      },
    });
    return response.data;
  } catch (error:any) {
    console.error("更新できませんでした", error);
    throw new Error(error.response.data.message);
  }
}