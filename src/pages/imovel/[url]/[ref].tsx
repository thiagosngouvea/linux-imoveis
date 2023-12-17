import React, { useState, useEffect, useCallback, useRef } from "react";
import { Image, Form, Input, Descriptions } from "antd";
import { useRouter } from "next/router";
import { FaBed, FaCar, FaExpand } from "react-icons/fa";
import { BiTagAlt } from "react-icons/bi";
import { propertiesService } from "@/services/properties.service";
import cheerio from "cheerio";
import Head from "next/head";

interface Property {
  url: string;
  title: string;
  images: string[];
  address: string;
  price: string;
  transaction: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  cep: string;
  number: string;
  complement: string;
  images_old_links: string[];
  garage: number;
  bathroom: number;
  bedroom: number;
  dining_room: number;
  kitchen: number;
  living_room: number;
  service_area: number;
  tv_room: number;
  office: number;
  closet: number;
  condominium_caracteristics: string;
  area_privative: string;
  area_privative_unit: string;
  area_total: string;
  area_total_unit: string;
  area_built: string;
  area_built_unit: string;
  area_terrain_total: string;
  area_terrain_total_unit: string;
  situation: string;
  description: any;
  condominio: any;
  condominium_name: string;
  profile: string;
}

interface HTMLRendererProps {
  htmlString: string;
}

interface ImovelProps {
  propertie: Property;
}

export default function Imovel({ propertie }: ImovelProps) {
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(false);

  console.log("***", propertie);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.innerHTML = propertie?.description || "";
    }
  }, [propertie?.description]);

  const router = useRouter();

  console.log(propertie);

  const imagesRefactored =
    propertie?.images_old_links?.map((image) => {
      return image.replace("{size}", "600x450").replace("{type}", "outside");
    }) || [];

  const condominio = propertie?.condominio;

  //remover do array de condominio todos os valores que comecem com um numero de 0 a 9
  const condominioRefactored = condominio?.filter((condominio: string) => {
    return !condominio.match(/^[0-9]/);
  });

  console.log(propertie?.address);

  const verifyIfIsJson = (string: any) => {
    try {
      JSON.parse(string);
      return {
        isJson: true,
        json: JSON.parse(string),
      };
    } catch (error) {
      return {
        isJson: false,
        json: string,
      };
    }
  };

  const caracteristicasCondominio = verifyIfIsJson(
    propertie?.condominium_caracteristics
  );

  console.log("caracteristicasCondominio", caracteristicasCondominio.json);

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

  // function removerTagsHTML(textoHTML: any) {
  //   return textoHTML?.replace(/<[^>]*>/g, '\n');
  // }

  // const textoSemTags = removerTagsHTML(propertie?.description);

  // const $ = cheerio.load(textoSemTags);

  // // Extrair o texto
  // const plainText = $.text();

  let addressParts = [
    propertie?.street,
    propertie?.number,
    propertie?.complement,
    propertie?.neighborhood,
    propertie?.city,
    propertie?.state,
    propertie?.cep,
  ];

  let formattedAddress = addressParts.filter(Boolean).join(" - ");

  return !!propertie ? (
    <div className="grid">
      <Head>
        {propertie?.title && <title>{propertie?.title}</title>}

        {propertie?.title && (
          <meta property="og:title" content={propertie?.title} />
        )}
        {imagesRefactored[0] && (
          <meta property="og:image" content={`${imagesRefactored[0]}`} />
        )}
        {propertie?.description && (
        <meta property="og:description" content={propertie?.description} />
      )}
      </Head>
      <div className="grid grid-cols-3 w-full xl:max-w-screen-4xl md:max-w-screen-lg mx-auto ">
        <div className="col-span-2">
          <Image
            src={imagesRefactored[0] || "https://via.placeholder.com/1200x800"}
            alt="Left Image"
            className="w-full"
            height={400}
            width="100%"
            onClick={() => setVisible(true)}
            preview={{ visible: false }}
          />
        </div>
        <div className="grid grid-rows-2 col-span-1">
          <Image
            src={imagesRefactored[1] || "https://via.placeholder.com/1200x800"}
            alt="Top Right Image"
            className="w-full row-span-1 mb-0"
            height={203}
            width="100%"
            onClick={() => setVisible(true)}
            preview={{ visible: false }}
          />

          <Image
            src={imagesRefactored[2] || "https://via.placeholder.com/1200x800"}
            alt="Bottom Right Image"
            className="w-full row-span-1 mb-0"
            height={197}
            width="100%"
            onClick={() => setVisible(true)}
            preview={{ visible: false }}
          />
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
          {imagesRefactored.map((image, index) => (
            <Image key={index} src={image} />
          ))}
        </Image.PreviewGroup>
      </div>
      <div className="flex justify-between w-full 3xl:max-w-screen-3xl xl:max-w-screen-xl md:max-w-screen-lg mx-auto mt-8">
        <div>
          <h1 className="text-4xl font-serif text-gray-800 font-bold">
            {propertie?.title}
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
      {(propertie?.garage ||
        propertie?.bedroom ||
        propertie?.garage ||
        propertie?.area_privative ||
        propertie?.area_built ||
        propertie?.area_terrain_total ||
        propertie?.area_total) && (
        <div className="flex h-48 w-full bg-[#FEF1EA] mt-8 justify-center align-center items-center gap-x-8">
          {propertie?.bedroom && (
            <div className="grid justify-center items-center">
              <span className="grid justify-center text-orange-500">
                <FaBed size={32} />
              </span>
              <span className="font-bold text-gray-600 text-md justify-center grid">
                {propertie?.bedroom}{" "}
                {propertie?.bedroom > 1 ? "Quartos" : "Quarto"}
              </span>
            </div>
          )}
          {propertie?.garage && (
            <div className="grid justify-center items-center">
              <span className="grid justify-center text-orange-500">
                <FaCar size={32} />
              </span>
              <span className="font-bold text-gray-600 text-md justify-center grid">
                {propertie?.garage}{" "}
                {propertie?.garage > 1 ? "Garagens" : "Garagem"}
              </span>
            </div>
          )}
          {propertie?.area_privative ? (
            <div className="grid justify-center items-center">
              <span className="grid justify-center text-orange-500">
                <FaExpand size={32} />
              </span>
              <span className="font-bold text-gray-600 text-md justify-center grid">
                {propertie?.area_privative} {propertie?.area_privative_unit}
              </span>
              <span
                className={`font-medium text-gray-600 text-[10px] justify-center grid`}
              >
                ÁREA PRIVATIVA
              </span>
            </div>
          ) : propertie?.area_built ? (
            <div className="grid justify-center items-center">
              <span className="grid justify-center text-orange-500">
                <FaExpand size={32} />
              </span>
              <span className="font-bold text-gray-600 text-md justify-center grid">
                {propertie?.area_built} {propertie?.area_built_unit}
              </span>
              <span
                className={`font-medium text-gray-600 text-[10px] justify-center grid`}
              >
                ÁREA CONSTRUIDA
              </span>
            </div>
          ) : propertie?.area_terrain_total ? (
            <div className="grid justify-center items-center">
              <span className="grid justify-center text-orange-500">
                <FaExpand size={32} />
              </span>
              <span className="font-bold text-gray-600 text-md justify-center grid">
                {propertie?.area_terrain_total}{" "}
                {propertie?.area_terrain_total_unit}
              </span>
              <span
                className={`font-medium text-gray-600 text-[10px] justify-center grid`}
              >
                ÁREA DO TERRENO
              </span>
            </div>
          ) : (
            propertie?.area_total && (
              <div className="grid justify-center items-center">
                <span className="grid justify-center text-orange-500">
                  <FaExpand size={32} />
                </span>
                <span className="font-bold text-gray-600 text-md justify-center grid">
                  {propertie?.area_total} {propertie?.area_total_unit}
                </span>
                <span
                  className={`font-medium text-gray-600 text-[10px] justify-center grid`}
                >
                  ÁREA TOTAL
                </span>
              </div>
            )
          )}
          {propertie?.situation && (
            <div className="grid justify-center items-center">
              <span className="grid justify-center text-orange-500">
                <BiTagAlt size={32} />
              </span>
              <span className="font-bold text-gray-600 text-md justify-center grid">
                {propertie?.situation}
              </span>
            </div>
          )}
        </div>
      )}
      <div className="flex  justify-between w-full xl:max-w-screen-xl 3xl:max-w-screen-3xl md:max-w-screen-lg mx-auto mt-8">
        <div className="grid w-2/3">
          <div className="grid">
            <p className="font-serif text-lg font-bold text-gray-600">
              Cômodos
            </p>
            <div className="flex flex-wrap gap-4 mt-2 items-center">
              {propertie?.bedroom && (
                <span className="bg-[#FDEAE1] px-2 py-1 rounded-lg text-gray-600 3xl:text-md xl:text-sm">
                  {propertie?.bedroom}{" "}
                  {propertie?.bedroom > 1 ? "quartos" : "quarto"}
                </span>
              )}
              {propertie?.garage && (
                <span className="bg-[#FDEAE1] px-2 py-1 rounded-lg text-gray-600 3xl:text-md xl:text-sm">
                  {propertie?.garage}{" "}
                  {propertie?.garage > 1 ? "garagens" : "garagem"}
                </span>
              )}
              {propertie?.bathroom && (
                <span className="bg-[#FDEAE1] px-2 py-1 rounded-lg text-gray-600 3xl:text-md xl:text-sm">
                  {propertie?.bathroom}{" "}
                  {propertie?.bathroom > 1 ? "banheiros" : "banheiro"}
                </span>
              )}
              {/* {propertie?.bedroom && (
                <span className="bg-[#FDEAE1] px-2 py-1 rounded-lg text-gray-600 3xl:text-md xl:text-sm">
                  {propertie?.bedroom} {propertie?.bedroom > 1 ? "quartos" : "quarto"}
                </span>
              )} */}
              {propertie?.kitchen && (
                <span className="bg-[#FDEAE1] px-2 py-1 rounded-lg text-gray-600 3xl:text-md xl:text-sm">
                  {propertie?.kitchen}{" "}
                  {propertie?.kitchen > 1 ? "cozinhas" : "cozinha"}
                </span>
              )}
              {propertie?.dining_room && (
                <span className="bg-[#FDEAE1] px-2 py-1 rounded-lg text-gray-600 3xl:text-md xl:text-sm">
                  {propertie?.dining_room}{" "}
                  {propertie?.dining_room > 1
                    ? "salas de jantar"
                    : "sala de jantar"}
                </span>
              )}
              {propertie?.living_room && (
                <span className="bg-[#FDEAE1] px-2 py-1 rounded-lg text-gray-600 3xl:text-md xl:text-sm">
                  {propertie?.living_room}{" "}
                  {propertie?.living_room > 1
                    ? "salas de estar"
                    : "sala de estar"}
                </span>
              )}
              {propertie?.service_area && (
                <span className="bg-[#FDEAE1] px-2 py-1 rounded-lg text-gray-600 3xl:text-md xl:text-sm">
                  {propertie?.service_area}{" "}
                  {propertie?.service_area > 1
                    ? "áreas de serviço"
                    : "área de serviço"}
                </span>
              )}
              {propertie?.tv_room && (
                <span className="bg-[#FDEAE1] px-2 py-1 rounded-lg text-gray-600 3xl:text-md xl:text-sm">
                  {propertie?.tv_room}{" "}
                  {propertie?.tv_room > 1 ? "salas de tv" : "sala de tv"}
                </span>
              )}
              {propertie?.office && (
                <span className="bg-[#FDEAE1] px-2 py-1 rounded-lg text-gray-600 3xl:text-md xl:text-sm">
                  {propertie?.office}{" "}
                  {propertie?.office > 1 ? "escritórios" : "escritório"}
                </span>
              )}
              {propertie?.closet && (
                <span className="bg-[#FDEAE1] px-2 py-1 rounded-lg text-gray-600 3xl:text-md xl:text-sm">
                  {propertie?.closet}{" "}
                  {propertie?.closet > 1 ? "closets" : "closet"}
                </span>
              )}
            </div>
          </div>
          {caracteristicasCondominio.json &&
          caracteristicasCondominio.json.Caracateristica &&
            caracteristicasCondominio.json?.Caracateristica.length > 0 && (
              <div className="grid mt-4">
                <p className="font-serif text-lg font-bold text-gray-600">
                  Condomínio
                </p>
                <div className="flex flex-wrap gap-4 mt-2 items-center">
                  {caracteristicasCondominio.json.Caracateristica.map(
                    (condominio: any, index: number) => (
                      <span
                        key={index}
                        className="bg-[#FDEAE1] px-2 py-1 rounded-lg text-gray-600 3xl:text-md xl:text-sm"
                      >
                        {condominio?.Titulo[0]}
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
            <span className="border p-2 w-full text-gray-600 bg-orange-100">
              {formattedAddress}
            </span>
          </div>
        </div>
        <div className="grid w-1/4">
          <h3 className="font-serif text-lg font-bold text-gray-600 flex justify-start">
            Ficha do Imóvel
          </h3>
          <div className="mt-2 mb-8">

            {propertie?.condominium_name && (
              <div className={`flex justify-between p-1  bg-[#FEF8F5]`}>
                <p className="text-gray-600">Condomínio</p>
                <p className="text-gray-600 font-bold">{propertie.condominium_name}</p>
              </div>
            )}
            {propertie?.profile && (
              <div className={`flex justify-between p-1`}>
                <p className="text-gray-600">Perfil</p>
                <p className="text-gray-600 font-bold">{propertie.profile.charAt(0).toUpperCase() + propertie.profile.slice(1)}</p>
              </div>
            )}
            {propertie?.situation && (
              <div className={`flex justify-between p-1 bg-[#FEF8F5]`}>
                <p className="text-gray-600">Situação</p>
                <p className="text-gray-600 font-bold">{propertie.situation}</p>
              </div>
            )}
            {propertie?.area_privative && (
              <div className={`flex justify-between p-1`}>
                <p className="text-gray-600">Área Construída</p>
                <p className="text-gray-600 font-bold">{propertie.area_built}{propertie.area_built_unit}</p>
              </div>
            )}
            {propertie?.area_privative && (
              <div className={`flex justify-between p-1  bg-[#FEF8F5]`}>
                <p className="text-gray-600">Área Privativa</p>
                <p className="text-gray-600 font-bold">{propertie.area_privative}{propertie.area_privative_unit}</p>
              </div>
            )}


          </div>
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
  ) : (
    <div className="flex justify-center items-center w-full h-screen">
      <p className="text-4xl font-bold text-gray-600">Carregando...</p>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { query } = context;
  const { ref } = query;

  try {
    const response = await propertiesService.getByUrl(ref as string);
    const propertie = response.data.properties;

    return {
      props: {
        propertie,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}
