import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Missing ID parameter' });
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/movies/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
};