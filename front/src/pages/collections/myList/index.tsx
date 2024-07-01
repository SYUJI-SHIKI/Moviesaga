import CollectionIndexForm from "@/components/elements/Collection/CollectionIndexForm";
import React from "react";

const MyListCollection: React.FC = () => {
  return <CollectionIndexForm apiEndpoint="/collections/my_lists" />
}

export default MyListCollection;