import React, { useState } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PropertyCardProps {
  images: string[];
  address: string;
  description: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  images,
  address,
  description,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  };

  return (
    <div className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden">
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
        <h2 className="text-xl font-semibold mb-2">{address}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
