import React from "react";
import Image, { StaticImageData } from "next/image";

interface CardProps {
  //imagem png nao pode ser tipo string
  imageUrl: StaticImageData;
  linkUrl: string;
}

export function CardFinanciamento({ imageUrl, linkUrl }: CardProps) {
  return (
    <div className="w-full bg-gray-100 rounded-lg shadow-xl">
    <div className="relative h-24">
      <Image src={imageUrl} alt="Banco" layout="fill" objectFit="cover" />
    </div>
    {/* <div className=""> */}
      <a href={linkUrl} target="_blank" className="w-full grid justify-center inline-block bg-orange-400 hover:bg-white text-white hover:text-orange-400 font-bold p-4 py-2 px-4">
        Simular
      </a>
    {/* </div> */}
  </div>
  );
}
