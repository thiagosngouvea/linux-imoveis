import React, { useState, useEffect, useCallback } from "react"
import Background from "@/assets/background.jpg"
import Image from "next/image"
import PropertyCard from "@/components/PropertyCard"
import { propertiesService } from "@/services/properties.service"
import { useRouter } from "next/router"

interface Property {
  id: string
  title_formatted: string
  images: string[]
  address: string
  description: string
  price: string
  transaction: string
  rooms: {
    bathroom: {
      title_formated: string
    }
    bedroom: {
      title_formated: string
    }
    closet: {
      title_formated: string
    }
    garage: {
      title_formated: string
    }
  }
  areas: {
    primary_area: {
      measure: string
      title: string
      value: string
    }
    total_area: {
      measure: string
      title: string
      value: string
    }
    built_area: {
      measure: string
      title: string
      value: string
    }
    private_area: {
      measure: string
      title: string
      value: string
    }
  }
  url: string
  reference: string
}


export default function Home() {

  const [properties, setProperties] = useState<Property[]>([])

  const router = useRouter()

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
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-56">
        <div className="py-8">
          <span className="grid w-full justify-center mb-8 font-bold text-2xl text-gray-600 font-serif">Imóveis em Destaque</span>
          <div className="grid justify-items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4">
            {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    title_formatted={property.title_formatted}
                    images={property.images}
                    address={property.address}
                    description={property.description}
                    price={property.price}
                    transaction={property.transaction}
                    bedrooms={property.rooms.bedroom.title_formated}
                    garage={property.rooms.garage.title_formated}
                    private_area={property.areas.private_area}
                    total_area={property.areas.total_area}
                    built_area={property.areas.built_area}
                    primary_area={property.areas.primary_area}
                    url={property.url}
                    reference={property.reference}
                  />
            ))}
          </div>
        </div>
      </div>
   </div>
  )
}
