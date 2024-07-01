import CollectionIndexForm from "@/components/elements/Collection/CollectionIndexForm";
import React from "react";

const BookmarkCollection: React.FC = () => {
  return <CollectionIndexForm apiEndpoint="/collections/bookmark" />
}

export default BookmarkCollection;