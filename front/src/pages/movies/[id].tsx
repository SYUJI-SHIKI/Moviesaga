import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FavoriteButton from "@/components/elements/Favorite/FavoriteButton";
import Image from "next/image";
import React from "react";

interface Movie {
  id: number;
  tmdb_id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  runtime: number;
  original_language: string;
  status: string;
  release_date: string;
  genres: { id: number; name: string }[];
  youtube_trailer_id: string;
}

const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const movieId = Array.isArray(id) ? id[0] : id;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("Router is ready:", router.isReady);
  console.log("Movie ID:", movieId);
  console.log("API URL:", process.env.NEXT_PUBLIC_TEST_API_URL);
  useEffect(() => {
    if (!router.isReady) return;

    if (!movieId) {
      setLoading(false);
      setError("Movie ID is not available.");
      return;
    }

    const fetchMovie = async () => {
      try {
        console.log("Fetching movie with id:", movieId); // 追加
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_TEST_API_URL}/api/v1/movies/${movieId}`
        );
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error("Failed to fetch movie");
        }
        const data = await response.json();
        console.log("Response data: data.movie"); // 追加 
        setMovie(data.movie);
        console.log("Movie set:", data.movie); // 追加
      } catch (error: any) {
        console.error("Fetch error:", error.message); // 追加
        setError(error.message);
      } finally {
        setLoading(false);
        console.log("Loading finished"); // 追加
      }
    };
    fetchMovie();
  }, [movieId, router.isReady]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {movie && (
        <div className="relative flex flex-col p-3 min-h-screen text-gray-300 bg-cover bg-center"
          style={{backgroundImage: `url(${movie.poster_path})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
            <div className="relative z-10 max-w-screen-md mx-auto mt-20">
              <div className="w-full h-0 pb-[56.25%] relative">
                <div className="">
                  {movie.youtube_trailer_id ? (
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${movie.youtube_trailer_id}?autoplay=1&mute=1&loop=1&rel=0&playlist=${movie.youtube_trailer_id}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="flex flex-col mt-20 items-center ">
                      <Image
                        src="/video_loading_error.png"
                        alt={movie.original_title}
                        height={300}
                        width={300}
                      />
                    </div>
                  )}
                </div>
              </div>
            <div className="relative z-10 flex flex-row justify-center p-2 my-5 items-end backdrop-blur-md ">
              <div className="mr-4 shadow-2xl">
                {movie.poster_path ? (
                  <Image
                    src={movie.poster_path}
                    alt={`${movie.original_title} poster`}
                    width={250}
                    height={350}
                    className="object-cover  rounded-lg"
                  />
                ) : (
                  <div>Poster not available</div>
                )}
              </div>
              <div className="p-5">
                <div className="text-4xl mb-5">
                  {movie.original_title || "Title not available"}
                </div>
                <FavoriteButton movieId={Number(movieId)} />
                <div className="mb-2">
                  上映時間:{" "}
                  {movie.runtime
                    ? `${movie.runtime}分`
                    : "Runtime not available"}
                </div>
                <div className="mb-5">
                  上映日: {movie.release_date || "Release date not available"}
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-10 w-full max-w-screen-md mx-auto bg-gradient-to-r from-indigo-900 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... p-4 mt-7">
            <div>{movie.overview}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
