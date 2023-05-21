import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "antd";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PropertyCardProps {
  images?: string[] | undefined;
  address?: string | undefined;
  description?: string | undefined;
  title: string;
  price?: string | undefined;
  type_business?: string | undefined;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  images = [],
  address,
  description,
  title,
  price,
  type_business,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  };

  return (
    <Badge.Ribbon text={<span className="font-medium">{type_business}</span>} color="orange">
      <div className="max-w-xs w-full bg-white shadow-md rounded-lg overflow-hidden">
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
            src={images[currentImageIndex]}
            alt="Property image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4">
          <h1 className="text-sm text-gray-600 font-semibold mb-2 truncate">{title}</h1>
          <h2 className="text-gray-500 text-sm truncate">{address}</h2>
          <span className="text-orange-500 text-xl font-bold truncate">{price}</span>
        </div>
      </div>
    </Badge.Ribbon>
  );
};

export default PropertyCard;
