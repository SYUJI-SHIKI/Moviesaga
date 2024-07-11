import React, { useEffect, useState } from 'react';
import api from 'lib/api';
import PaginationStyle from '../Pagination/PaginationStyle';
import CollectionCard from '@/components/elements/Collection/CollectionCard';

interface Collection {
  id: number;
  title: string;
  description: string;
  Image: string;
}

interface CollectionIndexFormProps {
  apiEndpoint: string;
}

const CollectionIndexForm: React.FC<CollectionIndexFormProps> = ({ apiEndpoint }) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640 ) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(8);
      }
    };  
    window.addEventListener("resize", updateItemsPerPage);
    updateItemsPerPage();
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    api.get(`${apiEndpoint}?page=${page}&per=${itemsPerPage}`)
      .then(response => {
        setCollections(response.data.collections as Collection[]);
        setTotalPages(response.data.total_pages)
      })
      .catch(error => {
        console.error("There was an error fetching the collections!", error);
      });
  }, [apiEndpoint, page, itemsPerPage]);

  return (
    <>
    <div className='flex flex-col items-center justify-center'>
      {collections.length > 0 && (
        <div className=" bg-gray-950 mt- md:mt-32">
          <div className="flex items-center justify-center">
            <div className="text-3xl text-white font-bold mb-4 mt-4">Collections</div>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {collections.map(collection => (
              <CollectionCard
                id = {collection.id}
                key={collection.id}
                title={collection.title}
                description={collection.description}
                imageUrl={`${collection.Image}?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ`}
              />
            ))}
          </div>
        </div>
      )}
      </div>
      <div className='bottom-1 mr-6'>
        <PaginationStyle
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
          />
      </div>
    </>
  );
};

export default CollectionIndexForm;