import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import Image from "next/image";
import { SimpleMovie } from "@/types/movie";

interface SortableMovieProps {
  movie: SimpleMovie;
}

const SortableMovie: React.FC<SortableMovieProps> = ({ movie }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: movie.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-move"
      aria-label={`${movie.original_title}をドラッグして並べ替え`}
    >
      <div className="flex flex-col items-center">
        <Image
          src={movie.poster_path}
          alt={movie.original_title}
          width={60}
          height={90}
          className="rounded-md"
          onError={(e) => {
            e.currentTarget.src = "/path/to/fallback-image.jpg";
          }}
        />
        <span className="mt-2 text-sm text-center">{movie.original_title}</span>
      </div>
    </li>
  );
};

export default SortableMovie;