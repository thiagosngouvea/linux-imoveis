import React, { useState, useEffect, useCallback, useRef } from "react";
import { Image, Form, Input, Descriptions } from "antd";
import { useRouter } from "next/router";
import { FaBed, FaCar, FaExpand } from "react-icons/fa";
import { BiTagAlt } from "react-icons/bi";
import { propertiesService } from "@/services/properties.service";
import Head from "next/head";

interface Property {
  url: string;
  title_formatted: string;
  images: string[];
  address: string;
  price: string;
  transaction: string;
  rooms: {
    bathroom: {
      title_formated: string;
    };
    bedroom: {
      title_formated: string;
    };
    diningroom: {
      title_formated: string;
    };
    garage: {
      title_formated: string;
    };
    kitchen: {
      title_formated: string;
    };
    livingroom: {
      title_formated: string;
    };
  };
  description: any;
  condominio: any;
  ficha_imovel: {
    title: string;
    value: string;
  }[];
  infos_principais: {
    title: string;
    subtitle: string;
  }[];
}

interface HTMLRendererProps {
  htmlString: string;
}

export default function Imovel() {
  const [propertie, setPropertie] = useState<Property>();
  const [url, setUrl] = useState("");
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.innerHTML = propertie?.description || "";
    }
  }, [propertie?.description]);

  const router = useRouter();

  const getPropertie = useCallback(async () => {
    try {
      const response = await propertiesService.getByUrl(
        router?.query?.url as string
      );
      setPropertie(response.data.properties);
    } catch (error) {
      console.log(error);
    }
  }, [router.query.url]);

  useEffect(() => {
    if (router?.query?.url) getPropertie();
  }, [getPropertie, router.query]);

  const imagesRefactored =
    propertie?.images?.map((image) => {
      return image.replace("{size}", "600x450").replace("{type}", "outside");
    }) || [];

  //transformar rooms em um array de objetos e cada objeto vai ser um indice do array
  const rooms = Object.entries(propertie?.rooms || {}).map((room) => {
    return {
      title_formated: room[1].title_formated,
    };
  });

  const condominio = propertie?.condominio;

  //remover do array de condominio todos os valores que comecem com um numero de 0 a 9
  const condominioRefactored = condominio?.filter((condominio: string) => {
    return !condominio.match(/^[0-9]/);
  });

  console.log(propertie?.address);

  const verifyIfIsJson = (string: any) => {
    try {
      JSON.parse(string);
    } catch (error) {
      return false;
    }
    return true;
  };

  const adress = verifyIfIsJson(propertie?.address)
    ? JSON.parse(propertie?.address || "{}")
    : { formatted: propertie?.address };

  useEffect(() => {
    divRef.current?.querySelectorAll("h3").forEach((h3) => {
      h3.classList.add("text-md", "font-serif", "text-gray-600", "font-bold");
    });

    divRef.current?.querySelectorAll("p").forEach((p) => {
      p.classList.add("text-md", "text-gray-600", "font-normal");
    });

    divRef.current?.querySelectorAll("li").forEach((p) => {
      p.classList.add("text-md", "text-gray-600", "font-normal");
    });

    divRef.current?.querySelectorAll("ul").forEach((ul) => {
      ul.classList.add("list-disc", "ml-8");
    });
  }, [propertie]);

  return (
    <div className="grid">
      <Head>
      <title>{propertie?.title_formatted}</title>
      {propertie?.title_formatted && <meta property="og:title" content={propertie?.title_formatted} />}
      {imagesRefactored[0] && <meta property="og:image" content={`https://${imagesRefactored[0]}`} />}
      <meta property="og:description" content="Sua descrição aqui" />
      </Head>
      <div className="grid grid-cols-3 w-full xl:max-w-screen-4xl md:max-w-screen-lg mx-auto ">
        <div className="grid col-span-2">
          <Image
            src={
              "https://" + imagesRefactored[0] ||
              "https://via.placeholder.com/1200x800"
            }
            alt="Left Image"
            className="w-full"
            height={444}
            width="100%"
          />
        </div>
        <div className="grid grid-rows-2">
          <div className="h-1/2">
            <Image
              src={
                "https://" + imagesRefactored[1] ||
                "https://via.placeholder.com/1200x800"
              }
              alt="Top Right Image"
              className="w-full"
              height={219}
              width="100%"
            />
          </div>
          <div className="h-1/2">
            <Image
              src={
                "https://" + imagesRefactored[2] ||
                "https://via.placeholder.com/1200x800"
              }
              alt="Bottom Right Image"
              className="w-full"
              height={219}
              width="100%"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full 3xl:max-w-screen-3xl xl:max-w-screen-xl md:max-w-screen-lg mx-auto mt-8">
        <div>
          <h1 className="text-4xl font-serif text-gray-800 font-bold">
            {propertie?.title_formatted}
          </h1>
          <p className="text-4xl  text-orange-500 font-bold">
            {propertie?.price}{" "}
            <span className="text-xl">/ {propertie?.transaction}</span>
          </p>
        </div>
        <div className="gap-2">
          <button
            className="bg-green-500 hover:bg-orange-400 text-white font-normal py-2 px-4"
            onClick={() => {
              const mensagem = window.location.href;
              const numeroWhatsApp = "5581991080294"; // Substitua pelo número desejado
              const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(
                mensagem
              )}`;
              window.open(urlWhatsApp, "_blank");
            }}
          >
            Compartilhar no Whatsapp
          </button>
          <button className="bg-white hover:bg-orange-400 text-black border font-normal py-2 px-4 ml-1">
            Salvar nos Favoritos
          </button>
          <button className="bg-orange-500 hover:bg-orange-400 text-white font-normal py-2 px-4 ml-1">
            Imprimir
          </button>
        </div>
      </div>
      {propertie?.infos_principais && (
        <div className="flex h-48 w-full bg-[#FEF1EA] mt-8 justify-center align-center items-center gap-x-8">
          {propertie?.infos_principais.map((item, index) => {
            return (
              <div key={index} className="grid justify-center items-center">
                <span className="grid justify-center text-orange-500">
                  {item.title.includes("Garage") ? (
                    <FaCar size={32} />
                  ) : item.title.includes("Suíte") ? (
                    <FaBed size={32} />
                  ) : item.title.includes("m²") ? (
                    <FaExpand size={32} />
                  ) : (
                    <BiTagAlt size={32} />
                  )}
                </span>
                <span className="font-bold text-gray-600 text-md justify-center grid">
                  {item.title}
                </span>
                <span
                  className={`font-normal text-gray-600 text-md justify-center grid ${
                    !item.subtitle && "invisible"
                  }`}
                >
                  {item.subtitle ?? "-"}
                </span>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex  justify-between w-full xl:max-w-screen-xl 3xl:max-w-screen-3xl md:max-w-screen-lg mx-auto mt-8">
        <div className="grid w-2/3">
          <div className="grid">
            <p className="font-serif text-lg font-bold text-gray-600">
              Cômodos
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              {rooms.map((room, index) => (
                <span
                  key={index}
                  className="bg-[#FDEAE1] px-2 rounded-lg text-gray-600 3xl:text-md xl:text-sm"
                >
                  {room.title_formated}
                </span>
              ))}
            </div>
          </div>
          {condominioRefactored?.length > 0 && (
            <div className="grid mt-4">
              <p className="font-serif text-lg font-bold text-gray-600">
                Condomínio
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                {condominioRefactored.map(
                  (condominio: string, index: number) => (
                    <span
                      key={index}
                      className="bg-[#FDEAE1] px-2 rounded-lg text-gray-600 3xl:text-md xl:text-sm"
                    >
                      {condominio}
                    </span>
                  )
                )}
              </div>
            </div>
          )}
          <div
            className="grid justify-between w-full xl:max-w-screen-xl 3xl:max-w-screen-3xl md:max-w-screen-lg mx-auto mt-8 border-y py-8"
            ref={divRef}
          />
          <div className="grid justify-between w-full xl:max-w-screen-xl 3xl:max-w-screen-3xl md:max-w-screen-lg mx-auto mt-8 w-full">
            <p className="font-serif text-lg font-bold text-gray-600">
              Localização
            </p>
            <span className="border p-2 w-full text-gray-600">
              {adress.formatted}
            </span>
          </div>
        </div>
        <div className="grid w-1/4">
          {propertie?.ficha_imovel && (
            <>
              <h3 className="font-serif text-lg font-bold text-gray-600 flex justify-start">
                Ficha do Imóvel
              </h3>
              <div className="mt-2 mb-8">
                {propertie?.ficha_imovel.map((ficha, index) => (
                  <div
                    key={index}
                    className={`flex justify-between p-1 ${
                      index % 2 === 0 ? "bg-[#FEF8F5]" : ""
                    }`}
                  >
                    <p className="text-gray-600">{ficha.title}</p>
                    <p className="text-gray-600 font-bold">{ficha.value}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="border p-4">
            <h3 className="font-bold text-md text-gray-600">Linux Imóveis</h3>
            <p className="text-md text-gray-600">CRECI: 123456</p>
            <span>
              <p className="text-md text-orange-400 mt-4">(81) 9 9476-4467</p>
              <p className="text-md text-gray-600">Ver e-mail</p>
            </span>
            <Form layout="vertical" className="mt-8">
              <Form.Item
                label={<span className="text-md text-gray-600">Nome</span>}
                name="name"
              >
                <Input placeholder="Seu nome" />
              </Form.Item>
              <Form.Item
                label={<span className="text-md text-gray-600">Telefone</span>}
                name="phone"
              >
                <Input placeholder="Seu telefone" />
              </Form.Item>
              <Form.Item
                label={<span className="text-md text-gray-600">Email</span>}
                name="email"
              >
                <Input placeholder="Seu email" />
              </Form.Item>
              <Form.Item
                label={<span className="text-md text-gray-600">Mensagem</span>}
                name="message"
              >
                <Input.TextArea placeholder="Seu nome" />
              </Form.Item>
              <div className="flex w-full">
                <button className="bg-green-600 hover:bg-orange-400 text-white font-normal py-2 px-4 ml-1 w-1/2">
                  Whatsapp
                </button>
                <button className="bg-orange-500 hover:bg-orange-400 text-white border font-normal py-2 px-4 ml-1 w-1/2">
                  E-mail
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
