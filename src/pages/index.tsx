import React, { useState, useEffect, useCallback } from "react"
import Background from "@/assets/background.jpg"
import Image from "next/image"
import PropertyCard from "@/components/PropertyCard"
import { propertiesService } from "@/services/properties.service"

interface Property {
  id: string
  title: string
  images: string[]
  localization: string
  description: string
  price: string
  type_business: string
}


export default function Home() {

  const [properties, setProperties] = useState<Property[]>([])

  const getProperties = useCallback(async () => {
    await propertiesService.getAll()
    .then((response) => {
      setProperties(response.data.properties.result)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    getProperties()
  }, [getProperties])

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
          <span className="grid w-full justify-center mb-8 font-bold text-2xl text-gray-600 font-serif">Imóveis em Destaque</span>
          <div className="grid justify-items-center grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    title={property.title}
                    images={property.images}
                    address={property.localization}
                    description={property.description}
                    price={property.price}
                    type_business={property.type_business}
                  />
            ))}
          </div>
        </div>
      </div>
   </div>
  )
}
