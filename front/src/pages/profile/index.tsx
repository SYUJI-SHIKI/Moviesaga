import React, { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "lib/ProfileApi";
import Image from "next/image";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface Movies {
  id: number;
  original_title: string;
  poster_path: string;
}

interface Collections {
  id: number;
  title: string; 
  movies: Movies[];
}

interface ProfileProps {
  user: User;
  movies: Movies[];
  collections: Collections[];
}

const ProfilePage: React.FC<ProfileProps> = ({ user, movies, collections }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [moviesData, setMoviesData] = useState<Movies[]>([]);
  const [collectionsData, setCollectionsData] = useState<Collections[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const avatarSrc = userData && userData.avatar ? userData.avatar : '/avatar_sample.png';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted){
      const getData = async () => {
        const data = await fetchProfile();
        setUserData(data.user);
        setMoviesData(data.movies);
        setCollectionsData(data.collections);
      };

      getData();
    } 
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {userData && (
        <div className="bg-black h-full min-h-screen text-gray-200">
          <div className="flex flex-col items-center h-full w-full justify-center">
            <div className="float-center mt-20">
              <Image
                src="/avatar_sample.png"
                alt="User Avatar"
                width={150}
                height={200}
                className="rounded-full border-2  border-white"
              />
            </div>
            <div className="text-xl">
              <div>{userData.name}</div>
              <div>{userData.email}</div>
            </div>
            
            <div className="collections-section">
              <h2>Collections</h2>
              <Link href="/collections/myList">
                <div>
                  自分の特集
                </div>
              </Link>
              <Link href="/collections/bookmark">
                <div>
                  お気に入りした特集
                </div>
              </Link>
            </div>

            <div className="favorites-section">
              <h2>Favorites</h2>
              <div className="movie-profile-container pt-3">
                <div className="show-collection-movies-container">
                  {moviesData.map(movie => (
                    <div key={movie.id} className="show-collection-movie-item">
                      <h3>{movie.original_title}</h3>
                      {/* <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.poster_path}
                        className="show-collection-movie-image"
                      /> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;