import api from "lib/api";

export const createCollection = async ( data: { title: string; description: string; movieIds: number[] }) => {
  try {
    const transformedData = {
      title: data.title,
      description: data.description,
      movie_ids: data.movieIds,
    };

    const response = await api.post('/collections', { collection: transformedData });
    return response.data;
  } catch (error:any) {
    console.error("保存できませんでした", error);
    throw new Error(error.response.data.message);
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
    const transformedData = {
      title: data.title,
      description: data.description,
      movie_ids: data.movieIds,
    };

    const response = await api.put(`/collections/${id}`, { collection: transformedData });
    return response.data;
  } catch (error:any) {
    console.error("更新できませんでした", error);
    throw new Error(error.response.data.message);
  }
};
