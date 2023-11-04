// components/CarouselItem.tsx
import React, { useEffect, useRef } from 'react';

interface CarouselItemProps {
  imageSrc: string;
  text: string;
  description: any;
  price?: string;
  link: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ imageSrc, text, description, price, link }) => {

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.innerHTML = description || "";
    }
  }, [description]);

  useEffect(() => {
    divRef.current?.querySelectorAll("h3").forEach((h3) => {
      h3.remove();
    })

    divRef.current?.querySelectorAll("p").forEach((p) => {
      p.classList.add("text-md", "text-gray-600", "font-normal");
    })

    divRef.current?.querySelectorAll("li").forEach((p) => {
      p.classList.add("text-md", "text-gray-600", "font-normal");
    })

    divRef.current?.querySelectorAll("ul").forEach((ul) => {
      ul.classList.add("list-disc", "ml-8");
    })
  }, [description]);

  return (
    <div 
      className="md:flex xs:grid justify-center items-center mx-4"
      onClick={()=> window.open(link, "_blank")}
      >
        <img 
        src={'https://'+imageSrc} 
        alt="Imagem do Carrossel" 
        className="mx-4"
        style={{
          clipPath: "polygon(0px 0px, 100% 0px, 84% 93%, 0% 100%)",
        }}
        width={600}
        />
      <div className="lg:w-1/2 sm:w-1/2 sm:grid justify-center items-center align-center">
        <div className='grid'>
          <span className='text-4xl font-serif text-gray-700'>{text}</span>
          <span className='text-2xl font-serif font-bold text-orange-500 my-4'>{price}</span>
        </div>
        <div className="" ref={divRef} />
      </div>
    </div>
  );
};

export default CarouselItem;
