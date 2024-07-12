import React, { useState } from 'react';
import { useRouter } from 'next/router';
import api from 'lib/api';
import Loading from '../Loading/Loading';
import RadioGroup from '../RadioButton/RadioGroup';
import useForm from '@/hooks/useForm';
import { keywordOptions, genreOptions, languageOptions, runtimeOptions } from './filterOptions';

const FilterForm = () => {
  const router = useRouter();
  const [loading, setLoading] =useState(false)
  const [formData, handleChange] = useForm({
    keyword: '',
    genre: '',
    language: '',
    selected_runtime: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);    
    try {
      const query = new URLSearchParams(formData).toString();
      const response = await api.get(`/movies/random?${query}`, {   
      });

      if (!response.data) {
        throw new Error('Network response was not ok');
      }

      const { id } = response.data;

      if (id) {
        router.push(`/movies/${id}`);
      } else {
        throw new Error('movie_id is not defined in the response');
      }
      
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(true);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen mb-10"
      style={{ backgroundImage: 'url("/screen.png")', backgroundSize: 'cover', backgroundPosition: 'top' }}
    >
      <form onSubmit={handleSubmit} className='w-full'>
        <div className="px-20 pb-10 w-90 lg:flex md:flex mt-20 lg:mt-18 gap-4 lg:mr-5">
          <RadioGroup
            title="お好み"
            name="keyword"
            options={keywordOptions}
            selectedValue={formData.keyword}
            onChange={handleChange}
          />

          <RadioGroup
            title="気分"
            name="genre"
            options={genreOptions}
            selectedValue={formData.genre}
            onChange={handleChange}
          />

          <div className='flex-1 flex flex-col'>
            <RadioGroup
              title="言語"
              name="language"
              options={languageOptions}
              selectedValue={formData.language}
              onChange={handleChange}
            />

            <RadioGroup
              title="時間指定"
              name="selected_runtime"
              options={runtimeOptions}
              selectedValue={formData.selected_runtime}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="submit-container flex justify-center pb-10">
          <button 
            type="submit" 
            className="w-60 text-white p-2 rounded-lg
            bg-gradient-to-r from-red-700 via-red-800 to-red-900 
            hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-red-300
          dark:focus:ring-red-800 shadow-xl shadow-red-500/70 dark:shadow-xl
          dark:shadow-red-800/80 transition duration-1000"
          >
            映画を探す
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;