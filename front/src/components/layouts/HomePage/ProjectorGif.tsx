import React from "react";
import Image from "next/image";

const ProjectorGif = () => {
  return (
    <div className="flex flex-col justify-center rotate-12 z-10 items-center">
      <Image 
        src="/projector.gif"
        alt="projector" 
        width={250} 
        height={50}
        className="lg:w-[350px] lg:h-[250px] md:w-[450px] md:h-[350px]"
        unoptimized
      />
    </div>
  )
}

export default ProjectorGif;