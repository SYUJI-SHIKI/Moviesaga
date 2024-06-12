import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, category, page } = req.query as { [key: string]: string };
  const response = await fetch(`${process.env.SEARCH_API_URL}/api/v1/search?query=${query}&category=${category}&page=${page}`);
  const data = await response.json();
  res.status(200).json(data);
};