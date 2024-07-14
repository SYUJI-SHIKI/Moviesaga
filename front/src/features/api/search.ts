import type { NextApiRequest, NextApiResponse } from 'next';

const searchHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { query, category, page } = req.query as { query: string; category: string; page: string };
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error('NEXT_PUBLIC_TEST_API_URL is not defined');
    }

    const response = await fetch(`${apiUrl}/api/v1/search?query=${query}&category=${category}&page=${page}`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default searchHandler;