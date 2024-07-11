import React, { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "@/features/api/ProfileApi";
import Image from "next/image";
import Link from "next/link";
import EditProfileDialog from "@/components/elements/Dialog/EditProfileDialog";
import { useRouter } from "next/router";
import FavoriteMoviesCarousel from "@/components/elements/Carousel/FavoriteMoviesCarousel";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface Movies {
  id: number;
  tmdb_id: number;
  original_title: string;
  poster_path: string;
}

interface ProfileProps {
  user: User;
  movies: Movies[];
}

const ProfilePage: React.FC<ProfileProps> = ({ user, movies }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [moviesData, setMoviesData] = useState<Movies[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const avatarSrc = userData && userData.avatar ? userData.avatar : '/avatar_sample.png';
  const lastMoviePoster = moviesData.length > 0 ? moviesData[moviesData.length - 1].poster_path : null;
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const getData = async () => {
        const data = await fetchProfile();
        setUserData(data.user);
        setMoviesData(data.movies);
      };
      getData();
    }
  }, [isMounted]);

  const handleEditProfile = async (formData: FormData) => {
    try {
      const response = await updateProfile(formData);
      setUserData(response.user);
      router.replace('/profile')
    } catch (error) {
      console.error("更新失敗", error);
    }
  };

  if (!isMounted || !userData) {
    return null;
  }

  return (
    <div className="bg-black w-full min-h-screen text-gray-200">
      {/* ヒーローセクション */}
      <div className="relative h-64 md:h-96 bg-cover bg-top" style={{backgroundImage: `url(${lastMoviePoster})`}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="mx-auto flex items-end space-x-8">
            <Image
              src="/avatar_sample.png"
              alt="User Avatar"
              width={150}
              height={150}
              className="rounded-full border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-4xl max-sm:text-xl font-bold text-white">{userData.name}</h1>
              <p className="text-xl max-sm:text-lg text-gray-300">{userData.email}</p>
              <div className="mt-4">
                <EditProfileDialog user={userData} onSave={handleEditProfile} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 mt-5 mb-12 max-sm:mt-0">
        <section className="mb-16 max-sm:mb-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-100">お気に入りの映画</h2>
          <FavoriteMoviesCarousel movies={moviesData} />
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-100">コレクション</h2>
            <Link href="/collections/myList">
              <div className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 mb-4 transition duration-300">
                自分の特集
              </div>
            </Link>
            <Link href="/collections/bookmark">
              <div className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 transition duration-300">
                お気に入りした特集
              </div>
            </Link>
          </section>

          <section className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-100">お気に入り</h2>
            <Link href="/movies/favorites">
              <div className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 transition duration-300">
                いいねした映画の一覧
              </div>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;