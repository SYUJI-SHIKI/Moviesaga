import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from "next/link";

interface Collection {
  id: number;
  title: string;
  description: string;
}

const CollectionsIndex = () => {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    axios.get('/api/v1/collections')
      .then(response => {
        setCollections(response.data);
      })
      .catch(error => {
        console.error('Getエラーだよ', error)
      });
  }, []);

  return (
    <div>
      <h1>Collections</h1>
      <div>
        {collections.map(collection => (
          <div key={collection.id}>
            <Link href={`/collections/${collection.id}`}>
              <div>{collection.title}</div>
              <div>{collection.description}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsIndex;