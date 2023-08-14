import React, { useState, useEffect, useCallback } from "react"
import { Form, Col, Row, Select, Input, InputNumber, Carousel, Pagination } from "antd"
import numeral from "numeral"
import Background from "@/assets/background.jpg"
import Image from "next/image"
import PropertyCard from "@/components/PropertyCard"
import CarouselItem from "@/components/Carousel"
import Slider from 'react-slick';
import { propertiesService } from "@/services/properties.service"
import { useRouter } from "next/router"
import { SlArrowLeft, SlArrowRight } from "react-icons/sl"

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

// const contentStyle: React.CSSProperties = {
//   margin: 0,
//   height: '160px',
//   color: '#fff',
//   lineHeight: '160px',
//   textAlign: 'center',
//   background: '#364d79',
// };

function SampleNextArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={className}
    >
      <SlArrowRight size={40} color="gray" />
    </button>
  );
}

function SamplePrevArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={className}
    >
      <SlArrowLeft size={40} color="gray" />
    </button>
  );
}

export default function Home() {

  const [properties, setProperties] = useState<Property[]>([])

  //        current={page}
  // total={total}
  // pageSize={pageSize}
  // onChange={handlePagination}

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(8)


  const [formattedValue, setFormattedValue] = useState('');

  const [negocio, setNegocio] = useState<string | null>(null)
  const [tipo, setTipo] = useState<string | null>(null)
  const [valorMin, setValorMin] = useState<string | null>(null)
  const [valorMax, setValorMax] = useState<string | null>(null)
  const [cidade, setCidade] = useState<string | null>(null)
  const [bairro, setBairro] = useState<string | null>(null)
  const [condominios, setCondominios] = useState<string | null>(null)

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };


  const router = useRouter()

  const getProperties = useCallback(async () => {
    await propertiesService.getAll(
      page,
      pageSize,
    )
    .then((response) => {
      setProperties(response.data.properties.result)
      setTotal(response.data.properties.total)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [page, pageSize])

  useEffect(() => {
    getProperties()
  }, [getProperties, page, pageSize])

  // const handlePagination = useCallback(async (page: number, pageSize: number | undefined) => {
    
  // }, [])



  const handleSearch = useCallback(async () => {
    //remover toda a formatacao de preco de valorMin e valorMax remover os pontos e o R$ e o , e o que tiver apos a ,

    const valorMinFormatado = valorMin?.replace("R$", "").replace(".", "").replace(/,.*$/g, "").replace(/\s/g, "");
    const valorMaxFormatado = valorMax?.replace("R$", "").replace(".", "").replace(/,.*$/g, "").replace(/\s/g, "");
    

    console.log(valorMinFormatado);

    router.push({
      pathname: `/imoveis/${negocio ?? "comprar-alugar"}`,
      query: {
        tipo: tipo,
        valor_min: valorMinFormatado ?? 0,
        valor_max: valorMaxFormatado ?? 0,
        cidade: cidade,
        bairro: bairro,
        condominios: condominios,
      },
    })

  }, [valorMin, valorMax, negocio, tipo, cidade, bairro, condominios])

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
   <div className="">
     <Image
        src={Background}
        alt="Workflow"
        width={5000}
        quality={100}
      />
      <div className="w-full xl:max-w-screen-xl 3xl:max-w-screen-3xl md:max-w-screen-lg mx-auto mt-8">
        <div className="py-8">
          <div className="grid">
            <div className="flex justify-between w-full xl:max-w-screen-lg 3xl:max-w-screen-lg md:max-w-screen-lg mx-auto">
              <span className="font-medium">Encontre o seu imóvel ideal</span>
              <span className="font-light">Referência</span>
            </div>
            <div className="w-full xl:max-w-screen-lg 3xl:max-w-screen-lg md:max-w-screen-lg mx-auto">
              <Form 
                layout="vertical"
                fields={[
                  {
                    name: ["negocio"],
                    value: negocio,
                  },
                  {
                    name: ["tipo_imovel"],
                    value: tipo,
                  },
                  {
                    name: ["valor_min"],
                    value: valorMin,
                  },
                  {
                    name: ["valor_max"],
                    value: valorMax,
                  },
                  {
                    name: ["cidade"],
                    value: cidade,
                  },
                  {
                    name: ["bairro"],
                    value: bairro,
                  },
                  {
                    name: ["condominios"],
                    value: condominios,
                  },
                ]}
              >
                <Row gutter={16}>
                  <Col span={6}>
                    <Form.Item label={<span className="font-bold">Negócio</span>} name="negocio">
                      <Select
                        placeholder="Selecione"
                        allowClear
                        size="large"
                        onChange={(value) => {
                          setNegocio(value)
                        }}
                      >
                        <Select.Option value="venda">Comprar</Select.Option>
                        <Select.Option value="aluguel">Alugar</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label={<span className="font-bold">Tipo de imóvel</span>} name="tipo_imovel">
                      <Select
                        placeholder="Selecione"
                        allowClear
                        size="large"
                        onChange={(value) => {
                          setTipo(value)
                        }}
                      >
                        <Select.Option value="Apartamento">Apartamento</Select.Option>
                        <Select.Option value="Casa">Casa</Select.Option>
                        <Select.Option value="Terreno">Terreno</Select.Option>
                        <Select.Option value="Fazenda">Fazenda</Select.Option>
                        <Select.Option value="Chácara">Chácara</Select.Option>
                        <Select.Option value="Sala">Sala</Select.Option>
                        <Select.Option value="Prédio">Prédio</Select.Option>
                        <Select.Option value="Pavilhão/Galpão">Pavilhão/Galpão</Select.Option>
                        <Select.Option value="Ponto Comercial">Ponto Comercial</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label={<span className="font-bold">Valor mínimo</span>} name="valor_min">
                      <Input
                        placeholder="Digite o valor mínimo"
                        size="large"
                        onChange={(e) => {
                          const inputValue = e.target.value.replace(/\D/g, '');
                          const formatted = new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 2,
                          }).format(Number(inputValue) / 100);
                          setValorMin(formatted);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label={<span className="font-bold">Valor Máximo</span>} name="valor_max">
                      <Input
                        placeholder="Digite o valor máximo"
                        size="large"
                        value={formattedValue}
                        onChange={(e) => {
                          const inputValue = e.target.value.replace(/\D/g, '');
                          const formatted = new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 2,
                          }).format(Number(inputValue) / 100);
                          setValorMax(formatted);
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                <Col span={8}>
                    <Form.Item label={<span className="font-bold">Cidade</span>} name="cidade">
                      <Select
                        placeholder="Selecione"
                        allowClear
                        size="large"
                        onChange={(value) => {
                          setCidade(value)
                        }}
                        options={[
                          {
                            label: <span className="font-bold text-gray-800">Pernambuco</span>,
                            options: [
                              {label: "Agrestina", value: "Agrestina"},
                              {label: "Altinho", value: "Altinho"},
                              {label: "Belém de Maria", value: "Belém de Maria"},
                              {label: "Bezerros", value: "Bezerros"},
                              {label: "Bonito", value: "Bonito"},
                              {label: "Canhotinho", value: "Canhotinho"},
                              {label: "Caruaru", value: "Caruaru"},
                              {label: "Gravatá", value: "Gravatá"},
                              {label: "Ipojuca", value: "Ipojuca"},
                              {label: "Recife", value: "Recife"},
                              {label: "Riacho das Almas", value: "Riacho das Almas"},
                              {label: "São Caetano", value: "São Caetano"},
                              {label: "São Joaquim do Monte", value: "São Joaquim do Monte"},
                              {label: "Tamandaré", value: "Tamandaré"},
                            ],
                          }
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={<span className="font-bold">Bairro</span>} name="bairro">
                      <Select
                        placeholder="Selecione"
                        allowClear
                        size="large"
                        onChange={(value) => {
                          setBairro(value)
                        }}
                      >
                        <Select.Option value="1">Centro</Select.Option>
                        </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={<span className="font-bold">Condomínios</span>} name="condominios">
                      <Select
                        placeholder="Selecione"
                        allowClear
                        size="large"
                        onChange={(value) => {
                          setCondominios(value)
                        }}
                      >
                        <Select.Option value="1">Centro</Select.Option>
                        </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                        <div className="flex justify-between w-full">
                          <div>
                            <span className="font-medium">Últimas pesquisas</span>
                          </div>
                          <div>
                            <button 
                              className="ml-2 bg-orange-400 p-2 text-white font-bold hover:text-gray-800"
                              onClick={handleSearch}
                            >
                              Pesquisar
                            </button>
                          </div>
                        </div>
                </Row>
              </Form>
            </div>
          </div>
          <div>
          <section className="my-8 flex justify-center items-center">
            <Slider {...settings} className="w-full">
              {properties.map((item, index) => (
                <CarouselItem 
                  key={index} 
                  imageSrc={item.images[0].replace("{size}", "600x450").replace("{type}", "outside")} 
                  text={item.title_formatted} 
                  description={item.description}
                  price={item.price}
                />
              ))}
            </Slider>
          </section>
          </div>
          <span className="grid w-full justify-center mb-8 font-bold text-2xl text-gray-600 font-serif">Imóveis em Destaque</span>
          <div className="grid justify-items-center grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 xl:-mx-8">
            {properties.map((property) => (
                  <PropertyCard
                    key={property?.id}
                    title_formatted={property?.title_formatted}
                    images={property?.images}
                    address={property?.address}
                    description={property?.description}
                    price={property?.price}
                    transaction={property?.transaction}
                    bedrooms={property?.rooms?.bedroom?.title_formated}
                    garage={property?.rooms?.garage?.title_formated}
                    private_area={property?.areas?.private_area}
                    total_area={property?.areas?.total_area}
                    built_area={property?.areas?.built_area}
                    primary_area={property?.areas?.primary_area}
                    url={property?.url}
                    reference={property?.reference}
                  />
            ))}
          </div>
          <Pagination
            current={page}
            total={total}
            pageSize={pageSize}
            onChange={(page) => {
                setPage(page)
              }}
            showSizeChanger={false}
            className="flex justify-center items-center mt-8"
          />
        </div>
      </div>
   </div>
  )
}
