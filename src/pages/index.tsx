import React from "react"
import Background from "@/assets/background.jpg"
import Image from "next/image"
import PropertyCard from "@/components/PropertyCard"
import Link from "next/link"

export default function Home() {
  return (
   <div className="">
     <Image
        src={Background}
        alt="Workflow"
        width={5000}
        quality={100}
      />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <span className="grid w-full justify-center mb-8 font-bold text-2xl text-gray-600">Imóveis em Destaque</span>
          <div className="grid justify-items-center grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <PropertyCard
              address="Apartamento"
              description="Apartamento com 2 quartos, 1 banheiro, sala, cozinha, área de serviço e 1 vaga de garagem."
              images={[
                "https://via.placeholder.com/600/771796",
                "https://media3.gerenciarimoveis-cf.com.br/media/2ce595b7-840e-46f9-be4a-b6aed940c590/properties/cf3b9df1-6d9b-4def-9179-aaa5e7ff1a52/images/600x450/outside/7bc2321e-7ce0-40da-a749-395937b3473616692353718VnQ.jpg",
                "https://via.placeholder.com/600/771796",
              ]}
            />
            <PropertyCard
              address="Apartamento"
              description="Apartamento com 2 quartos, 1 banheiro, sala, cozinha, área de serviço e 1 vaga de garagem."
              images={[
                "https://via.placeholder.com/600/771796",
                "https://media3.gerenciarimoveis-cf.com.br/media/2ce595b7-840e-46f9-be4a-b6aed940c590/properties/cf3b9df1-6d9b-4def-9179-aaa5e7ff1a52/images/600x450/outside/7bc2321e-7ce0-40da-a749-395937b3473616692353718VnQ.jpg",
                "https://via.placeholder.com/600/771796",
              ]}
            />
            <PropertyCard
              address="Apartamento"
              description="Apartamento com 2 quartos, 1 banheiro, sala, cozinha, área de serviço e 1 vaga de garagem."
              images={[
                "https://via.placeholder.com/600/771796",
                "https://media3.gerenciarimoveis-cf.com.br/media/2ce595b7-840e-46f9-be4a-b6aed940c590/properties/cf3b9df1-6d9b-4def-9179-aaa5e7ff1a52/images/600x450/outside/7bc2321e-7ce0-40da-a749-395937b3473616692353718VnQ.jpg",
                "https://via.placeholder.com/600/771796",
              ]}
            />
            <PropertyCard
              address="Apartamento"
              description="Apartamento com 2 quartos, 1 banheiro, sala, cozinha, área de serviço e 1 vaga de garagem."
              images={[
                "https://via.placeholder.com/600/771796",
                "https://media3.gerenciarimoveis-cf.com.br/media/2ce595b7-840e-46f9-be4a-b6aed940c590/properties/cf3b9df1-6d9b-4def-9179-aaa5e7ff1a52/images/600x450/outside/7bc2321e-7ce0-40da-a749-395937b3473616692353718VnQ.jpg",
                "https://via.placeholder.com/600/771796",
              ]}
            />
          </div>
        </div>
      </div>
   </div>
  )
}
