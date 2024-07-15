import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from 'lib/api';
import BookmarkButton from '@/components/elements/Buttons/BookmarkButton';
import CollectionCarousel from '@/components/elements/Collection/CollectionCarousel';
import YouTube, { YouTubeEvent } from 'react-youtube';
import Link from 'next/link';
import { CustomNextPage } from '@/types/next-page';

interface Movie {
  id: number;
  tmdb_id: number;
  original_title: string;
  poster_path: string;
  youtube_trailer_id: string;
  release_date: string;
}

interface Collection {
  id: number;
  title: string;
  description: string;
  movies: Movie[];
}

interface CollectionResponse {
  collection: Collection;
  bookmarked: boolean;
  is_creator: boolean;
}

const CollectionShow: CustomNextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [collectionData, setCollectionData] = useState<CollectionResponse | null>(null);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [shouldLoadYouTube, setShouldLoadYouTube] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldLoadYouTube(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (id) {
      api.get(`/collections/${id}`)
        .then(response => {
          setCollectionData(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the collection!", error);
        });
    }
  }, [id]);

  const handleEdit = () => {
    router.push(`/collections/edit/${id}`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('本当にこの特集を削除しますか？');
    if (confirmed) {
      try {
        await api.delete(`/collections/${id}`);
        router.push('/collections');
      } catch (error) {
        console.error('There was an error deleting the collection!', error);
      }
    }
  };

  const handleBookmarkToggle = async () => {
    if (!collectionData) return;
    try {
      const newBookmarkStatus = !collectionData.bookmarked;
      if (newBookmarkStatus) {
        await api.post(`/bookmarks`, { collection_id: collectionData.collection.id })
      } else {
        await api.delete(`bookmarks/${collectionData.collection.id}`);
      }
      setCollectionData(prevData => prevData ? {...prevData, bookmarked: newBookmarkStatus} : null);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  }

  const onError = (event: YouTubeEvent) => {
    console.error('Youtube player error:', event.data);
    return (
      <div className="text-white">
        動画の読み込みでエラーが発生しました。<br />
        リロードを試みるか、1作品のみの登録だと <br />
        再生されないことがあるのでご容赦ください 
      </div>
    )
  }

  if (!collectionData) return <p>Loading...</p>;

  const currentMovie = collectionData.collection.movies[currentMovieIndex];

  const onReady = (event: YouTubeEvent) => {
    setIsReady(true);
  };

  return (
    <div className='w-full min-h-screen'>
      <div className="bg-black text-white ">
        <div className=" px-10 md:py-8 overflow-hidden">
          <div className="relative md:mt-14  lg:mb-12 rounded-lg shadow-3xl">
            {shouldLoadYouTube && (
              <YouTube
                videoId={currentMovie.youtube_trailer_id}
                opts={{
                  height: '500',
                  width: '100%',
                  playerVars: {
                    autoplay: 1,
                    controls: 0,
                    modestbranding: 1,
                    showinfo: 0,
                    loop: 1,
                    rel: 0,
                    playlist: currentMovie.youtube_trailer_id,
                  },
                }}
                onError={onError}
                onReady={onReady}
                className="w-full"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute lg:bottom-0 bottom-12  lg:left-0 md:left-[-20px] left-[-30px]  p-8">
              <h2 className="text-4xl text-slate-300 font-bold text-opacity-80 mb-2 ">{currentMovie.original_title}</h2>
              <p className="text-gray-300 text-xl mb-4">{currentMovie.release_date}</p>
            </div>
          </div>
          <div className="mb-12">
            <div className='flex lg:items-end flex-col lg:flex-row'>
              <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">{collectionData.collection.title}</h1>
              <div className="flex items-center space-x-4 lg:ml-6 mb-4">
                {collectionData.is_creator ? (
                  <>
                    <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">編集</button>
                    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300">削除</button>
                  </>
                ) : (
                  <BookmarkButton isBookmarked={collectionData.bookmarked} onToggle={handleBookmarkToggle} />
                )}
              </div>
            </div>
            <p className="text-xl text-gray-300 mb-6">{collectionData.collection.description}</p>
          </div>

          <div className=' flex items-center justify-center'>
            <CollectionCarousel
              movies={collectionData.collection.movies}
              currentIndex={currentMovieIndex}
              onSelectMovie={setCurrentMovieIndex}
            />
          </div>
          <Link href={`/movies/${currentMovie.tmdb_id}`}>
            <div className='text-2xl max-sm:text-xl font-bold flex items-center justify-center mt-10 max-sm:mb-20 mb-14 hover:text-blue-500'>
              「{currentMovie.original_title}」の詳細はこちら
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

CollectionShow.noFilmBackground = true

export default CollectionShow;