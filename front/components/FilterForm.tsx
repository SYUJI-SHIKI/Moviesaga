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
    <div>
      <form onSubmit={handleSubmit} className='form-container'>
        <div className="form-group">
          <label>お好み</label><br />
          <input
            type="radio"
            id="now_playing"
            name="keyword"
            value="now_playing"
            onChange={handleChange}
          />
          <label htmlFor="now_playing">映画で上映中</label><br />
          <input
            type="radio"
            id="true_story"
            name="keyword"
            value="true_story"
            onChange={handleChange}
          />
          <label htmlFor="true_story">実話を元にした作品</label><br />
          <input
            type="radio"
            id="animation"
            name="keyword"
            value="animation"
            onChange={handleChange}
          />
          <label htmlFor="animation">アニメ作品</label><br />
        </div>
        <div className="form-group">
          <label>気分</label><br />
          <input
            type="radio"
            id="action"
            name="genre"
            value="action"
            onChange={handleChange}
          />
          <label htmlFor="action">スカッとしたい</label><br />
        </div>
        <div className="form-group">
          <label>言語</label><br />
          <input
            type="radio"
            id="ja"
            name="language"
            value="ja"
            onChange={handleChange}
          />
          <label htmlFor="ja">邦画</label><br />
        </div>
        <div className="form-group">
          <label>時間指定</label><br />
          <input
            type="radio"
            id="under_110"
            name="selected_runtime"
            value="under_110"
            onChange={handleChange}
          />
          <label htmlFor="under_110">110分以内</label><br />
        </div>
        <div className="submit-container">
          <div>一度、リロードしてからご利用ください</div>
          <button type="submit">絞り込み</button>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;