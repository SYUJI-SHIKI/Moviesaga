import React from 'react';
import Image from 'next/image';
import styles from './Collection.module.css';
import Link from 'next/link';

interface CollectionCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  userName: string;
}

const truncateDescription = (text: string) => {
  return text.length > 30 ? text.substring(0, 30) + '...' : text;
};

const truncateTitle = (text: string) => {
  return text.length > 8 ? text.substring(0, 8) + '...' : text;
};

const CollectionCard: React.FC<CollectionCardProps> = ({ id, title, description, imageUrl }) => {
  return (
    <Link href={`/collections/${id}`}>
      <div className='relative group md:w-64 w-96 '>
        <div className="relative flex items-end overflow-hidden p-5 lg:h-80 w-30 m-5 text-center text-whitesmoke bg-whitesmoke shadow-lg transition-transform z-10 group rounded-lg">
          <div className="absolute top-0 left-0 w-full h-[100%]">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes='200px'
              priority
              className={`transition-transform ${styles.customPosition} md:object-center object-cover aspect-square w-12`}
              style={{ transition: 'transform calc(var(--d) * 1.5) var(--e)' }}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-slate-100 transition-opacity group-hover:opacity-50 .bg-gradient-to-b from-transparent to-bg-slate-200 opacity-20"></div>
          </div>
          <div className="relative flex flex-col items-center w-full p-4 transition-transform transform translate-y-full group-hover:translate-y-0 duration-300 group-focus-within:translate-y-0 text-gray-950">
            <div className="text-2xl font-bold leading-tight truncate">
              {truncateTitle(title)}
            </div>
            <div className="opacity-0 transform translate-y-4 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 mt-4 hidden md:block">
              <div className="font-serif text-lg leading-relaxed whitespace-pre-line h-30 overflow-hidden">
                {truncateDescription(description)}
              </div>
            </div>
          </div>
        </div>
        <div className='absolute bottom-[-30px] left-0 w-full text-center transition-all duration-300 transform group-hover:-translate-y-full group-hover:opacity-0'>
          <div className="text-2xl text-white font-bold">
            {truncateTitle(title)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;