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
import { Property } from "@/types/property"

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
  const [propertiesHighlight, setPropertiesHighlight] = useState<Property[]>([])

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

  const [neighborhoods, setNeighborhoods] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [condominiums, setCondominiums] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])

  const [tipoBuscaReferencia, setTipoBuscaReferencia] = useState<boolean | null>(false)
  const [referencia, setReferencia] = useState<string | null>(null)

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };


  const router = useRouter()

  const getProperties = useCallback(async () => {
    let filterBy = "status";
    let filterValue = "Disponível";
    let filterType = "eq";

    await propertiesService.getAll(
      page,
      pageSize,
      filterBy,
      filterValue,
      filterType
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


  const getNeighborhoods = useCallback(async () => {
    await propertiesService.getNeighborhoods()
    .then((response: any) => {
      setNeighborhoods(response.data.neighborhoods)
    })
    .catch((error) => {
      console.log(error)
    })
  } , [])

  useEffect(() => {
    getNeighborhoods()
  }, [getNeighborhoods])

  const getCities = useCallback(async () => {
    await propertiesService.getCities()
    .then((response: any) => {
      setCities(response.data.cities)
    })
    .catch((error) => {
      console.log(error)
    })
  } , [])

  useEffect(() => {
    getCities()
  }, [getCities])

  const getCondominiums = useCallback(async () => {
    await propertiesService.getCondominiums()
    .then((response: any) => {
      setCondominiums(response.data.condominiums)
    })
    .catch((error) => {
      console.log(error)
    })
  } , [])

  useEffect(() => {
    getCondominiums()
  }, [getCondominiums])

  const getTypes = useCallback(async () => {
    await propertiesService.getTypes()
    .then((response: any) => {
      setTypes(response.data.types)
    })
    .catch((error) => {
      console.log(error)
    })
  } , [])

  useEffect(() => {
    getTypes()
  }, [getTypes])


  const getPropertiesHighlight = useCallback(async () => {
    let filterBy = "highlight_website";
    let filterValue = "true";
    let filterType = "eq";

    await propertiesService.getAll(
      page,
      pageSize,
      filterBy,
      filterValue,
      filterType
    )
    .then((response) => {
      setPropertiesHighlight(response.data.properties.result)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [page, pageSize])

  useEffect(() => {
    getPropertiesHighlight()
  }, [getPropertiesHighlight, page, pageSize])

  const handleSearch = useCallback(async () => {
    //remover toda a formatacao de preco de valorMin e valorMax remover os pontos e o R$ e o , e o que tiver apos a ,

    const valorMinFormatado = valorMin?.replace("R$", "").replace(".", "").replace(/,.*$/g, "").replace(/\s/g, "");
    const valorMaxFormatado = valorMax?.replace("R$", "").replace(".", "").replace(/,.*$/g, "").replace(/\s/g, "");
    
    router.push({
      pathname: `/imoveis/${negocio ?? "comprar-alugar"}`,
      query: {
        tipo: tipo,
        valor_min: valorMinFormatado ?? 0,
        valor_max: valorMaxFormatado ?? 0,
        cidade: cidade,
        bairro: bairro,
        condominios: condominios,
        referencia: referencia,
      },
    })

  }, [valorMin, valorMax, negocio, tipo, cidade, bairro, condominios, referencia])

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
   <div className="xs:px-4 md:px-0">
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
              <button 
                className="font-light underline"
                onClick={() => {
                  setTipoBuscaReferencia(!tipoBuscaReferencia)
                }}
              >{!!tipoBuscaReferencia ? "Voltar" : "Referência"}</button>
            </div>
            <div className="w-full xl:max-w-screen-lg 3xl:max-w-screen-lg md:max-w-screen-lg mx-auto">
              {!tipoBuscaReferencia ? (
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
                    <Col xs={{ span: 24 }} md={{ span: 6 }}>
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
                    <Col xs={{ span: 24 }} md={{ span: 6 }}>
                      <Form.Item label={<span className="font-bold">Tipo de imóvel</span>} name="tipo_imovel">
                        <Select
                          placeholder="Selecione"
                          allowClear
                          size="large"
                          onChange={(value) => {
                            setTipo(value)
                          }}
                        >
                          {types.map((type) => (
                            <Select.Option key={type} value={type}>{type}</Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 6 }}>
                      <Form.Item label={<span className="font-bold">Valor Mínimo</span>} name="valor_min">
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
                    <Col xs={{ span: 24 }} md={{ span: 6 }}>
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
                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                      <Form.Item label={<span className="font-bold">Cidade</span>} name="cidade">
                        <Select
                          placeholder="Selecione"
                          allowClear
                          size="large"
                          onChange={(value) => {
                            setCidade(value)
                          }}
                          >
                            {cities.map((city) => (
                              <Select.Option key={city} value={city}>{city}</Select.Option>
                            ))}
                          </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 8 }}>
                      <Form.Item label={<span className="font-bold">Bairro</span>} name="bairro">
                        <Select
                          placeholder="Selecione"
                          allowClear
                          size="large"
                          onChange={(value) => {
                            setBairro(value)
                          }}
                        >
                          {neighborhoods.map((neighborhood) => (
                            <Select.Option key={neighborhood} value={neighborhood}>{neighborhood}</Select.Option>
                          ))}
                          </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 8 }}>
                      <Form.Item label={<span className="font-bold">Condomínios</span>} name="condominios">
                        <Select
                          placeholder="Selecione"
                          allowClear
                          size="large"
                          onChange={(value) => {
                            setCondominios(value)
                          }}
                        >
                          {condominiums.map((condominium) => (
                            <Select.Option key={condominium} value={condominium}>{condominium}</Select.Option>
                          ))}
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
              ) : (
                <Form
                  layout="vertical"
                  fields={[
                    {
                      name: ["referencia"],
                      value: referencia,
                    },
                  ]}
                >
                  <Form.Item label={<span className="font-bold">Referência</span>} name="referencia">
                    <Input
                      placeholder="Digite a referência"
                      size="large"
                      onChange={(e) => {
                        setReferencia(e.target.value)
                      }}
                    />
                </Form.Item>
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
              )}
            </div>
          </div>
          <div>
          <section className="my-8 flex justify-center items-center mx-10">
            <Slider {...settings} className="w-full">
              {properties.map((item, index) => (
                <CarouselItem 
                  key={index} 
                  imageSrc={item.images_old_links ? item?.images_old_links[0] : "linuximoveis.nyc3.digitaloceanspaces.com/propertiesImages/ab774d90f94834844bdcc5858a047a90-Resultado-PPGEC.pn"} 
                  text={item.meta_title} 
                  description={item.description}
                  price={item.price}
                  link={`/imovel/${item.url}`}
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
                    meta_title={property?.meta_title}
                    images_old_links={property?.images_old_links}
                    price={property?.price}
                    transaction={property?.transaction}
                    bedroom={property?.bedroom}
                    garage={property?.garage}
                    suites={property?.suites}
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
