import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "antd";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";

interface PropertyCardProps {
  images?: string[] | undefined;
  address?: string | undefined;
  description?: string | undefined;
  title_formatted: string;
  price?: string | undefined;
  transaction?: string | undefined;
  bedrooms?: string | undefined;
  garage?: string | undefined;
  private_area?: {
    measure: string;
    title: string;
    value: string;
  }
  built_area?: {
    measure: string;
    title: string;
    value: string;
  }
  total_area?: {
    measure: string;
    title: string;
    value: string;
  }
  primary_area?:{
    measure: string;
    title: string;
    value: string;
  }
  url?: string | undefined;
  reference?: string | undefined;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  images = [],
  address,
  description,
  title_formatted,
  price,
  transaction,
  bedrooms,
  garage,
  private_area,
  built_area,
  total_area,
  primary_area,
  url,
  reference,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const router = useRouter();

  const handlePrevImage = () => {
    setCurrentImageIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  };

  //refatorar os links das imagens e remover o /{size}/{type}
  const imagesRefactored = images.map((image) => {
    return image.replace("{size}", "600x450").replace("{type}", "outside");
  });

  const adressFormatted = JSON.parse(address || "{}");

  const replaceAcessUrl = (url: string, reference: string) => {
    //se o link não tiver / na string adiciona
    if (!url.includes("/")) {
      return `imovel/${url}/${reference}`;
    } else {
      return `imovel/${url}`;
    }
  }

  return (
    <Badge.Ribbon text={<span className="font-medium">{transaction}</span>} color="orange">
      <div 
        className="max-w-xs w-96 bg-white shadow-md rounded-lg overflow-hidden cursor-pointer" 
        onClick={() => router.push(replaceAcessUrl(url || "", reference || ""))}
      >
        <div className="relative h-48">
          <button
            className="z-10 absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-white focus:outline-none"
            onClick={handlePrevImage}
          >
            <IoIosArrowBack size={20} />
          </button>
          <button
            className="z-10 absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-white focus:outline-none"
            onClick={handleNextImage}
          >
            <IoIosArrowForward size={20} />
          </button>
          <Image
            src={imagesRefactored[currentImageIndex]}
            alt="Property image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4">
          <h1 className="text-sm text-gray-600 font-semibold mb-2 truncate">{title_formatted}</h1>
          <h2 className="text-gray-500 text-sm truncate">{adressFormatted.formatted}</h2>
          <span className="text-orange-500 text-xl font-bold truncate">{price}</span>
          <p className="text-gray-500 text-sm truncate">{bedrooms}</p>
          <p className="text-gray-500 text-sm truncate">{garage}</p>
          <p className="text-gray-500 text-sm truncate">{primary_area?.value} {primary_area?.measure} {`(${primary_area?.title})`}</p>
        </div>
      </div>
    </Badge.Ribbon>
    
  );
};

export default PropertyCard;
