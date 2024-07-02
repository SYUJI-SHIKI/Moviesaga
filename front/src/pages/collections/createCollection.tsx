import React, { useEffect, useState } from "react";
import api from "lib/api";
import { createCollection } from "@/features/api/CollectionApi";
import CollectionForm from "@/components/elements/Collection/CollectionForm";

interface Movie {
  id: number;
  original_title: string;
  poster_path: string;
}

const CollectionCreate: React.FC = () => {
  const [addMovies, setAddMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/collections/new");
        console.log("API response:", response.data);
        if (response.data && response.data.addMovies) {
          setAddMovies(response.data.addMovies);
        } else {
          setError("Movies data is not in expected format.");
        }
      } catch (error) {
        setError("Error fetching movies data: ");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleSubmit = async (data: {
    title: string;
    description: string;
    movieIds: number[];
  }) => {
    try {
      await createCollection(data);
    } catch (error) {
      console.error("Error submitting collection form", error);
    }
  };

  return (
    <div>
      {addMovies.length > 0 ? (
        <>
          <div className="flex items-center justify-center bg-black">
            <div className="text-3xl text-white font-bold mb-4 mt-6">
              特集作成
            </div>
          </div>
          {console.log("CollectionForm props:", addMovies)}
          <CollectionForm addMovies={addMovies} onSubmit={handleSubmit} />
        </>
      ) : (
        <div>No movies available to add.</div>
      )}
    </div>
  );
};

export default CollectionCreate;
