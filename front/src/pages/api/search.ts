import type { NextApiRequest, NextApiResponse } from 'next';

const searchHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, category, page } = req.query as { [key: string]: string };
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/search?query=${query}&category=${category}&page=${page}`);
  const data = await response.json();
  res.status(200).json(data);
};

export default searchHandler;