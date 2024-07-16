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

  const truncateTitle = (text: string) => {
    return text.length > 5 ? text.substring(0, 5) + '...' : text;
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="inline-block m-1"
      aria-label={`${movie.original_title}をドラッグして並べ替え`}
    >
      <div className="items-center">
        <div className="md:w-[120px] md:h-[120px] w-[90px] h-[90px] relative aspect-square grid grid-cols-3 md:mx-1">
          <Image
            src={movie.poster_path}
            alt={movie.original_title}
            fill
            priority
            sizes="120px"
            className="rounded-md object-cover border-2"
            onError={(e) => {
              e.currentTarget.src = "/path/to/fallback-image.jpg";
            }}
          />
        </div>
        <span className="mt-1 text-lg text-center w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {truncateTitle(movie.original_title)}
        </span>
      </div>
    </li>
  );
};

export default SortableMovie;