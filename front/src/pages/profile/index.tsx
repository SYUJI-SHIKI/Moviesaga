import React, { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "@/features/api/ProfileApi";
import Image from "next/image";
import Link from "next/link";
import EditProfileDialog from "@/components/elements/Dialog/EditProfileDialog";
import { useRouter } from "next/router";
import useLoading from "@/components/elements/Loading/useLoading";

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

interface ProfileProps {
  user: User;
  movies: Movies[];
}

const ProfilePage: React.FC<ProfileProps> = ({ user, movies, collections }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [moviesData, setMoviesData] = useState<Movies[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const avatarSrc = userData && userData.avatar ? userData.avatar : '/avatar_sample.png';
  const router = useRouter();
  const { loading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted){
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
      startLoading();
      const response = await updateProfile(formData);
      setUserData(response.user);
      router.push('/profile')
    } catch (error) {
      console.error("更新失敗", error);
    } finally {
      stopLoading();
    }
  };



  if (!isMounted || !userData) {
    return null;
  }  

  if (loading) {
    return <div>ロード中</div>
  }

  return (
    <>
      {userData && (
        <div className="bg-black h-full min-h-screen text-gray-200">
          <div className="flex flex-col items-center h-full w-full justify-center">
            <div className="flex flex-col lg:flex-row mt-20 items-center lg:items-end">
              <div className="float-center">
                <Image
                  src="/avatar_sample.png"
                  alt="User Avatar"
                  width={150}
                  height={200}
                  className="rounded-full border-2  border-white"
                />
              </div>
              <div className="text-xl mt-5 lg:ml-3">
                <EditProfileDialog user={userData} onSave={handleEditProfile} />
                <div>{userData.name}</div>
                <div>{userData.email}</div>
              </div>
            </div>
            
            <div className="mt-8">
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
              <Link href="/movies/favorites">
                <div>
                  いいねした映画
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;