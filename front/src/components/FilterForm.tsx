import React, { useState } from 'react';
import { useRouter } from 'next/router';

const FilterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    keyword: '',
    genre: '',
    language: '',
    selected_runtime: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    console.log('Query sssssssssssssssssstring:', query); 
    console.log('handleSubmit 関数が呼び出されました');
    console.log('クエリ:', query); 

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/movies/random?${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('API responsxxxxxxxxxxxxxxxxxxxxxxe data:', data);
      const { id } = data;

      if (id) {
        router.push(`/movies/${id}`);
      } else {
        throw new Error('movie_id is not defined in the response');
      }
      
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg grid grid-cols-2 gap-8">
        <div className="form-group col-span-2">
          <label className="block text-lg font-semibold mb-2">お好み</label>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="now_playing"
              name="keyword"
              value="now_playing"
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="now_playing">映画で上映中</label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="true_story"
              name="keyword"
              value="true_story"
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="true_story">実話を元にした作品</label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="animation"
              name="keyword"
              value="animation"
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="animation">アニメ作品</label>
          </div>
        </div>
        <div className="form-group">
          <label className="block text-lg font-semibold mb-2">気分</label>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="action"
              name="genre"
              value="action"
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="action">スカッとしたい</label>
          </div>
        </div>
        <div className="form-group">
          <label className="block text-lg font-semibold mb-2">言語</label>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="ja"
              name="language"
              value="ja"
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="ja">邦画</label>
          </div>
        </div>
        <div className="form-group col-span-2">
          <label className="block text-lg font-semibold mb-2">時間指定</label>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="under_110"
              name="selected_runtime"
              value="under_110"
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="under_110">110分以内</label>
          </div>
        </div>
        <div className="submit-container col-span-2">
          <div className="text-center mb-4">一度、リロードしてからご利用ください</div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">絞り込み</button>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;