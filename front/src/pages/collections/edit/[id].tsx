import React, { useEffect, useState } from "react";
import {
  fetchCollection,
  updateCollection,
} from "@/features/api/CollectionApi";
import CollectionForm from "@/components/elements/Collection/CollectionForm";
import { useRouter } from "next/router";

interface Movie {
  id: number;
  original_title: string;
  poster_path: string;
}

interface CollectionData {
  id: number;
  title: string;
  description: string;
  movies: Movie[];
  addMovies: Movie[];
}

const CollectionEdit: React.FC = () => {
  const [collectionData, setCollectionData] = useState<CollectionData | null>(
    null
  );
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchCollection(Number(id));
        console.log("Fetched data:", data);
        setCollectionData(data);
      } catch (error) {
        console.error("Error fetching collection data", error);
      }
    };

    if (id) {
      console.log("Router ID:", id);
      console.log("Converted ID:", Number(id));
      getData();
    }
  }, [id]);

  useEffect(() => {
    if (collectionData) {
      console.log("Title:", collectionData.title);
      console.log("Description:", collectionData.description);
      console.log("Movies:", collectionData.movies);
      console.log("AddMovies:", collectionData.addMovies);
    }
  }, [collectionData]);

  const handleSubmit = async (data: {
    title: string;
    description: string;
    movieIds: number[];
  }) => {
    try {
      await updateCollection(Number(id), data);
    } catch (error) {
      console.error("Error submitting collection form", error);
    }
  };

  return (
    <div>
      {collectionData && (
        <>
          <div className="flex items-center justify-center bg-black">
            <div className="text-3xl text-white font-bold mb-4 mt-6">
              特集編集
            </div>
          </div>
          {console.log("CollectionForm props:", collectionData)}
          <CollectionForm
            title={collectionData.title}
            description={collectionData.description}
            // movies={collectionData.movies}
            // addMovies={collectionData.addMovies}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
};

export default CollectionEdit;
