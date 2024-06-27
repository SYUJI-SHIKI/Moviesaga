import api from "lib/api";

export const createCollection = async ( data: { title: string; descroption: string; movieId: number[] }) => {
  try {
    const response = await api.post('/collections', { collection: data });
    return response.data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const fetchCollection = async (id: number) => {
  try {
    const response = await api.get(`/collections/${id}/edit`);
    return response.data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const updateCollection = async (id: number, data: { title: string; description: string; movieIds: number[] }) => {
  try {
    const response = await api.put(`/collections/${id}`, { collections: data });
    return response.data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};
