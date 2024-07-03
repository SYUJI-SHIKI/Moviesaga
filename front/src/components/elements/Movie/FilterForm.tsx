import React, { useState } from 'react';
import { useRouter } from 'next/router';
import CustomRadioButton from './CustomRadioButton';
import styles from './FilterForm.module.css'

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
    console.log('Query string:', query);

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
      console.log('API response data:', data);
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
    <div className="flex flex-col justify-center items-center min-h-screen mb-10"
      style={{ backgroundImage: 'url("/screen.png")', backgroundSize: 'cover', backgroundPosition: 'top' }}
    >
      <form onSubmit={handleSubmit} className='w-full'>
        <div className="px-20 pb-10 w-90 lg:flex md:flex mt-20 lg:mt-10 gap-4 lg:mr-5">

          <div className={`${styles['select-card']} p-5 rounded-lg shadow-md m-2 flex-1 flex flex-col`}>
            <div className="">
              <label className="block text-2xl font-semibold mb-5">お好み</label>
              <div className="flex items-center mb-4">
                <CustomRadioButton
                  checked={formData.keyword === "" }
                  name="keyword"
                  value=""
                  onChange={handleChange}
                />
                <label className="custom-radio-label" htmlFor="">指定なし</label>
              </div>
              <div className="flex items-center mb-4">
                <CustomRadioButton
                  checked={formData.keyword === "now_playing"}
                  name="keyword"
                  value="now_playing"
                  onChange={handleChange}
                />
                <label className="custom-radio-label" htmlFor="now_playing">映画で上映中</label>
              </div>
              <div className="flex items-center mb-4">
                <CustomRadioButton
                  checked={formData.keyword === "true_story"}
                  name="keyword"
                  value="true_story"
                  onChange={handleChange}
                />
                <label className="custom-radio-label" htmlFor="true_story">実話を元にした作品</label>
              </div>
              <div className="flex items-center mb-4">
                <CustomRadioButton
                  checked={formData.keyword === "animation"}
                  name="keyword"
                  value="animation"
                  onChange={handleChange}
                />
                <label className="custom-radio-label" htmlFor="animation">アニメ作品</label>
              </div>
            </div>
          </div>

          <div className={`${styles['select-card']} p-5 rounded-lg shadow-md m-2 flex-1 flex flex-col`}>
            <div className="">
              <label className="block text-2xl font-semibold mb-5">気分</label>
              <div className="flex items-center mb-4">
                <CustomRadioButton
                  checked={formData.genre === ""}
                  name="genre"
                  value=""
                  onChange={handleChange}
                />
                <label className="custom-radio-label" htmlFor="">指定なし</label>
              </div>
              <div className="flex items-center mb-4">
                <CustomRadioButton
                  checked={formData.genre === "action"}
                  name="genre"
                  value="action"
                  onChange={handleChange}
                />
                <label className="custom-radio-label" htmlFor="action">スカッとしたい</label>
              </div>
              <div className="flex items-center mb-4">
                <CustomRadioButton
                  checked={formData.genre === "comedy"}
                  name="genre"
                  value="comedy"
                  onChange={handleChange}
                />
                <label className="custom-radio-label" htmlFor="comedy">笑いたい</label>
              </div>
              <div className="flex items-center mb-4">
                <CustomRadioButton
                  checked={formData.genre === "mystery"}
                  name="genre"
                  value="mystery"
                  onChange={handleChange}
                />
                <label className="custom-radio-label" htmlFor="mystery">考察しながら観たい</label>
              </div>
              <div className="flex items-center mb-4">
                <CustomRadioButton
                  checked={formData.genre === "horror"}
                  name="genre"
                  value="horror"
                  onChange={handleChange}
                />
                <label className="custom-radio-label" htmlFor="horror">ヒヤッとしたい</label>
              </div>
              <div className="flex items-center mb-4">
                <CustomRadioButton
                  checked={formData.genre === "romance"}
                  name="genre"
                  value="romance"
                  onChange={handleChange}
                />
                <label className="custom-radio-label" htmlFor="romance">キュンとしたい</label>
              </div>
            </div>
          </div>

          <div className='flex-1 flex flex-col'>
            <div className={`${styles['select-card']} p-5 rounded-lg shadow-md m-2 flex-1 flex flex-col`}>
              <div className="">
                <label className="block text-2xl font-semibold mb-5">言語</label>
                <div className="flex items-center mb-4">
                  <CustomRadioButton
                    checked={formData.language === ""}
                    name="language"
                    value=""
                    onChange={handleChange}
                  />
                  <label className="custom-radio-label" htmlFor="">指定なし</label>
                </div>
                <div className="flex items-center mb-4">
                  <CustomRadioButton
                    checked={formData.language === "ja"}
                    name="language"
                    value="ja"
                    onChange={handleChange}
                  />
                  <label className="custom-radio-label" htmlFor="ja">邦画</label>
                </div>
                <div className="flex items-center mb-4">
                  <CustomRadioButton
                    checked={formData.language === "foreign"}
                    name="language"
                    value="foreign"
                    onChange={handleChange}
                  />
                  <label className="custom-radio-label" htmlFor="foreign">海外映画</label>
                </div>
              </div>
            </div>

            <div className={`${styles['select-card']} p-5 rounded-lg shadow-md mx-2 my-2 mt-0 flex-1 flex flex-col`}>
              <div className="">
                <label className="block text-2xl font-semibold mb-5">時間指定</label>
                <div className="flex items-center mb-4">
                  <CustomRadioButton
                    checked={formData.selected_runtime === ""}
                    name="selected_runtime"
                    value=""
                    onChange={handleChange}
                  />
                  <label className="custom-radio-label" htmlFor="">指定なし</label>
                </div>
                <div className="flex items-center mb-4">
                  <CustomRadioButton
                    checked={formData.selected_runtime === "under_110"}
                    name="selected_runtime"
                    value="under_110"
                    onChange={handleChange}
                  />
                  <label className="custom-radio-label" htmlFor="under_110">110分未満</label>
                </div>
                <div className="flex items-center mb-4">
                  <CustomRadioButton
                    checked={formData.selected_runtime === "over_111"}
                    name="selected_runtime"
                    value="over_111"
                    onChange={handleChange}
                  />
                  <label className="custom-radio-label" htmlFor="over_111">110分以上</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="submit-container flex justify-center pb-10">
          <button type="submit" className="w-60 text-white p-2 rounded-lg
            bg-gradient-to-r from-red-700 via-red-800 to-red-900 
            hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-red-300
          dark:focus:ring-red-800 shadow-xl shadow-red-500/70 dark:shadow-xl
          dark:shadow-red-800/80 transition duration-1000">映画を探す</button>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;