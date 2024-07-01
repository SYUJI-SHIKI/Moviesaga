import CollectionIndexForm from "@/components/elements/Collection/CollectionIndexForm";
import React from "react";

const CollectionIndex: React.FC = () => {
  return <CollectionIndexForm apiEndpoint="/collections" />;
};

export default CollectionIndex;