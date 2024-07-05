import React from "react";
import Image from "next/image";

const ProjectorGif = () => {
  return (
    <div className="flex flex-col justify-center rotate-12 z-0 items-center">
      <Image src="/projector.gif" alt="projector" width={250} height={50}
      className="lg:w-[450px] lg:h-[350px] md:w-[450px] md:h-[350px]"
      />
    </div>
  )
}

export default ProjectorGif;