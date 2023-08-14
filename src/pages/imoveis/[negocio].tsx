import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { propertiesService } from "@/services/properties.service";
import { Checkbox, Dropdown, Input, Pagination, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import PropertyCard from "@/components/PropertyCard";

import type { MenuProps } from "antd";

export default function ComprarAlugar() {
  const router = useRouter();

  const [properties, setProperties] = useState<any[]>([]);
  const [negocio, setNegocio] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [valorMin, setValorMin] = useState<string>("");
  const [valorMax, setValorMax] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(1000);
  const [total, setTotal] = useState<number>(0);
  const [dormitoriosFilter, setDormitoriosFilter] = useState<string | null>(
    "eq"
  );
  const [dormitorios, setDormitorios] = useState<number | null>(null);
  const [suitesFilter, setSuitesFilter] = useState<string | null>("eq");
  const [suites, setSuites] = useState<number | null>(null);
  const [garagensFilter, setGaragensFilter] = useState<string | null>("eq");
  const [garagens, setGaragens] = useState<number | null>(null);
  const [aceitaFinanciamento, setAceitaFinanciamento] =
    useState<boolean>(false);
  const [perfilImovel, setPerfilImovel] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // const [page, setPage] = useState(1)
  // const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(21)

  const getPropertieFiltered = useCallback(async () => {
    let filterBy = "";
    let filterValue = "";
    let filterType = "";

    if (router.query.negocio !== "comprar-alugar") {
      filterBy += filterBy === "" ? "transaction" : ",transaction";
      filterValue +=
        filterValue === ""
          ? (router.query.negocio as string)
          : `,${router.query.negocio as string}`;
      filterType += filterType === "" ? "ilike" : ",ilike";
    }

    if (router.query.tipo !== "") {
      filterBy += filterBy === "" ? "type" : ",type";
      filterValue +=
        filterValue === ""
          ? (router.query.tipo as string)
          : `,${router.query.tipo as string}`;
      filterType += filterType === "" ? "ilike" : ",ilike";
    }

    if (router.query.cidade !== "") {
      filterBy += filterBy === "" ? "address" : ",address";
      filterValue +=
        filterValue === ""
          ? (router.query.cidade as string)
          : `,${router.query.cidade as string}`;
      filterType += filterType === "" ? "ilike" : ",ilike";
    }

    if (router.query.bairro !== "") {
      filterBy += filterBy === "" ? "address" : ",address";
      filterValue +=
        filterValue === ""
          ? (router.query.bairro as string)
          : `,${router.query.bairro as string}`;
      filterType += filterType === "" ? "ilike" : ",ilike";
    }

    if (router.query.valor_min !== "0" || router.query.valor_max !== "0") {
      filterBy += filterBy === "" ? "price" : ",price";
      filterValue +=
        filterValue === ""
          ? `${router.query.valor_min as string}|${
              router.query.valor_max as string
            }`
          : `,${router.query.valor_min as string}|${
              router.query.valor_max as string
            }`;
      filterType += filterType === "" ? "btw_price" : ",btw_price";
    }

    if (dormitorios !== null) {
      filterBy += filterBy === "" ? "bedroom" : ",bedroom";
      filterValue += filterValue === "" ? dormitorios : `,${dormitorios}`;
      filterType +=
        filterType === "" ? dormitoriosFilter : `,${dormitoriosFilter}`;
    }

    if (suites !== null) {
      filterBy += filterBy === "" ? "suite" : ",suite";
      filterValue += filterValue === "" ? suites : `,${suites}`;
      filterType += filterType === "" ? suitesFilter : `,${suitesFilter}`;
    }

    if (garagens !== null) {
      filterBy += filterBy === "" ? "garage" : ",garage";
      filterValue += filterValue === "" ? garagens : `,${garagens}`;
      filterType += filterType === "" ? garagensFilter : `,${garagensFilter}`;
    }

    if (!!aceitaFinanciamento) {
      (filterBy += filterBy === "" ? "ficha_imovel" : ",ficha_imovel"),
        (filterValue +=
          filterValue === ""
            ? "Aceita Financiamento"
            : ",Aceita Financiamento"),
        (filterType += filterType === "" ? "ilike" : ",ilike");
    }

    if (!!perfilImovel.residencial) {
      filterBy += filterBy === "" ? "ficha_imovel" : ",ficha_imovel";
      filterValue +=
        filterValue === "" ? "Residencial" : ",Residencial";
      filterType += filterType === "" ? "ilike" : ",ilike";
    }

    if (!!perfilImovel.comercial) {
      filterBy += filterBy === "" ? "ficha_imovel" : ",ficha_imovel";
      filterValue +=
        filterValue === "" ? "Comercial" : ",Comercial";
      filterType += filterType === "" ? "ilike" : ",ilike";
    }

    if (!!perfilImovel.rural) {
      filterBy += filterBy === "" ? "ficha_imovel" : ",ficha_imovel";
      filterValue +=
        filterValue === "" ? "Rural" : ",Rural";
      filterType += filterType === "" ? "ilike" : ",ilike";
    }

    if (!!perfilImovel.industrial) {
      filterBy += filterBy === "" ? "ficha_imovel" : ",ficha_imovel";
      filterValue +=
        filterValue === "" ? "Industrial" : ",Industrial";
      filterType += filterType === "" ? "ilike" : ",ilike";
    }

    try {
      const res = await propertiesService.getAll(
        page,
        pageSize,
        filterBy,
        filterValue,
        filterType
      );
      setProperties(res.data.properties.result);
      setTotal(res.data.properties.total);
    } catch (error: any) {
      console.log(error.message);
    }
  }, [
    aceitaFinanciamento,
    suites,
    suitesFilter,
    dormitorios,
    dormitoriosFilter,
    garagens,
    garagensFilter,
    router.query,
    router.query.negocio,
    router.query.tipo,
    router.query.cidade,
    router.query.bairro,
    router.query.valor_min,
    router.query.valor_max,
    perfilImovel,
    page,
    pageSize,
  ]);

  useEffect(() => {
    if (router.query && Object.keys(router.query).length > 0) {
      getPropertieFiltered();
    }
  }, [
    getPropertieFiltered,
    router.query,
    dormitorios,
    suites,
    dormitoriosFilter,
    suitesFilter,
    garagens,
    garagensFilter,
    aceitaFinanciamento,
    perfilImovel,
    page
  ]);

  const items: MenuProps["items"] = [
    {
      label: "Exatamente Igual",
      onClick: () => {
        setDormitoriosFilter("eq");
      },
      key: "0",
    },
    {
      label: "Maior ou Igual",
      onClick: () => {
        setDormitoriosFilter("ge");
      },
      key: "1",
    },
    {
      label: "Menor ou Igual",
      onClick: () => {
        setDormitoriosFilter("le");
      },
      key: "3",
    },
  ];

  const itemsSuites: MenuProps["items"] = [
    {
      label: "Exatamente Igual",
      onClick: () => {
        setSuitesFilter("eq");
      },
      key: "0",
    },
    {
      label: "Maior ou Igual",
      onClick: () => {
        setSuitesFilter("ge");
      },
      key: "1",
    },
    {
      label: "Menor ou Igual",
      onClick: () => {
        setSuitesFilter("le");
      },
      key: "3",
    },
  ];

  const itemsGaragens: MenuProps["items"] = [
    {
      label: "Exatamente Igual",
      onClick: () => {
        setGaragensFilter("eq");
      },
      key: "0",
    },
    {
      label: "Maior ou Igual",
      onClick: () => {
        setGaragensFilter("ge");
      },
      key: "1",
    },
    {
      label: "Menor ou Igual",
      onClick: () => {
        setGaragensFilter("le");
      },
      key: "3",
    },
  ];

  return (
    <div className="w-full xl:max-w-screen-2xl 3xl:max-w-screen-3xl md:max-w-screen-lg mx-auto mt-8">
      <div className="grid xs:justify-center md:justify-start">
        <h1 className="text-lg font-medium text-gray-600 font-serif">
          Imóveis | Foram encontrados {`${total}`} imóveis
        </h1>
      </div>
      <div className="grid gap-2 sm:grid-cols-5 lg:grid-cols-5 3xl:grid-cols-5">
        <aside className="xl:col-span-1 lg:col-span-2 md:col-span-2 sm:col-span-3 sm:px-4">
          <div className="grid border p-4">
            <h2 className="text-lg font-medium text-gray-600 font-serif">
              Geral
            </h2>
            <div className="grid pt-2">
              <span className="flex pb-2 text-sm">
                Dormitórios
                <Dropdown menu={{ items }} trigger={["click"]}>
                  <div onClick={(e) => e.preventDefault()}>
                    <Space>
                      {dormitoriosFilter === "eq" && (
                        <span className="text-orange-500 pl-2">
                          (Exatamente Igual{" "}
                          <DownOutlined
                            style={{ fontSize: "16px", color: "#FA7316" }}
                            className="cursor-pointer"
                          />
                          )
                        </span>
                      )}
                      {dormitoriosFilter === "ge" && (
                        <span className="text-orange-500 pl-2">
                          (Maior ou Igual{" "}
                          <DownOutlined
                            style={{ fontSize: "16px", color: "#FA7316" }}
                            className="cursor-pointer"
                          />
                          )
                        </span>
                      )}
                      {dormitoriosFilter === "le" && (
                        <span className="text-orange-500 pl-2">
                          (Menor ou Igual{" "}
                          <DownOutlined
                            style={{ fontSize: "16px", color: "#FA7316" }}
                            className="cursor-pointer"
                          />
                          )
                        </span>
                      )}
                    </Space>
                  </div>
                </Dropdown>
              </span>
              <span className="flex gap-2">
                <button
                  className={
                    dormitorios === 1
                      ? "border bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                      : "border hover:bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                  }
                  onClick={() => setDormitorios(1)}
                >
                  1
                </button>
                <button
                  className={
                    dormitorios === 2
                      ? "border bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                      : "border hover:bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                  }
                  onClick={() => setDormitorios(2)}
                >
                  2
                </button>
                <button
                  className={
                    dormitorios === 3
                      ? "border bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                      : "border hover:bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                  }
                  onClick={() => setDormitorios(3)}
                >
                  3
                </button>
                <button
                  className={
                    dormitorios === 4
                      ? "border bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                      : "border hover:bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                  }
                  onClick={() => setDormitorios(4)}
                >
                  4
                </button>
                <button
                  className={
                    dormitorios === 5
                      ? "border bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                      : "border hover:bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                  }
                  onClick={() => setDormitorios(5)}
                >
                  5
                </button>
              </span>
            </div>
            <div className="grid pt-2">
              <span className="flex pb-2 text-sm">
                Sendo Suítes
                <Dropdown menu={{ items: itemsSuites }} trigger={["click"]}>
                  <div onClick={(e) => e.preventDefault()}>
                    <Space>
                      {suitesFilter === "eq" && (
                        <span className="text-orange-500 pl-2">
                          (Exatamente Igual{" "}
                          <DownOutlined
                            style={{ fontSize: "16px", color: "#FA7316" }}
                            className="cursor-pointer"
                          />
                          )
                        </span>
                      )}
                      {suitesFilter === "ge" && (
                        <span className="text-orange-500 pl-2">
                          (Maior ou Igual{" "}
                          <DownOutlined
                            style={{ fontSize: "16px", color: "#FA7316" }}
                            className="cursor-pointer"
                          />
                          )
                        </span>
                      )}
                      {suitesFilter === "le" && (
                        <span className="text-orange-500 pl-2">
                          (Menor ou Igual{" "}
                          <DownOutlined
                            style={{ fontSize: "16px", color: "#FA7316" }}
                            className="cursor-pointer"
                          />
                          )
                        </span>
                      )}
                    </Space>
                  </div>
                </Dropdown>
              </span>
              <span className="flex gap-2">
                <button
                  className={
                    suites === 1
                      ? "border bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                      : "border hover:bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                  }
                  onClick={() => setSuites(1)}
                >
                  1
                </button>
                <button
                  className={
                    suites === 2
                      ? "border bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                      : "border hover:bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                  }
                  onClick={() => setSuites(2)}
                >
                  2
                </button>
                <button
                  className={
                    suites === 3
                      ? "border bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                      : "border hover:bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                  }
                  onClick={() => setSuites(3)}
                >
                  3
                </button>
                <button
                  className={
                    suites === 4
                      ? "border bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                      : "border hover:bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                  }
                  onClick={() => setSuites(4)}
                >
                  4
                </button>
                <button
                  className={
                    suites === 5
                      ? "border bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                      : "border hover:bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                  }
                  onClick={() => setSuites(5)}
                >
                  5
                </button>
              </span>
            </div>
            <div className="grid pt-2 border-b pb-2">
              <span className="flex pb-2 text-sm">
                Vagas Garagem
                <Dropdown menu={{ items: itemsGaragens }} trigger={["click"]}>
                  <div onClick={(e) => e.preventDefault()}>
                    <Space>
                      {garagensFilter === "eq" && (
                        <span className="text-orange-500 pl-2">
                          (Exatamente Igual{" "}
                          <DownOutlined
                            style={{ fontSize: "16px", color: "#FA7316" }}
                            className="cursor-pointer"
                          />
                          )
                        </span>
                      )}
                      {garagensFilter === "ge" && (
                        <span className="text-orange-500 pl-2">
                          (Maior ou Igual{" "}
                          <DownOutlined
                            style={{ fontSize: "16px", color: "#FA7316" }}
                            className="cursor-pointer"
                          />
                          )
                        </span>
                      )}
                      {garagensFilter === "le" && (
                        <span className="text-orange-500 pl-2">
                          (Menor ou Igual{" "}
                          <DownOutlined
                            style={{ fontSize: "16px", color: "#FA7316" }}
                            className="cursor-pointer"
                          />
                          )
                        </span>
                      )}
                    </Space>
                  </div>
                </Dropdown>
              </span>
              <span className="flex gap-2">
                <button
                  className={
                    garagens === 1
                      ? "border bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                      : "border hover:bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                  }
                  onClick={() => setGaragens(1)}
                >
                  1
                </button>
                <button
                  className={
                    garagens === 2
                      ? "border bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                      : "border hover:bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                  }
                  onClick={() => setGaragens(2)}
                >
                  2
                </button>
                <button
                  className={
                    garagens === 3
                      ? "border bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                      : "border hover:bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                  }
                  onClick={() => setGaragens(3)}
                >
                  3
                </button>
                <button
                  className={
                    garagens === 4
                      ? "border bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                      : "border hover:bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                  }
                  onClick={() => setGaragens(4)}
                >
                  4
                </button>
                <button
                  className={
                    garagens === 5
                      ? "border bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                      : "border hover:bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-full"
                  }
                  onClick={() => setGaragens(5)}
                >
                  5
                </button>
              </span>
            </div>
            <div className="pt-2">
              <span>Aceita Financiamento</span>
              <div className="grid grid-cols-2">
                <button
                  className="border hover:bg-gray-300 text-gray-800 font-normal py-2 px-4"
                  onClick={() => setAceitaFinanciamento(true)}
                >
                  Sim
                </button>
                <button
                  className="border hover:bg-gray-300 text-gray-800 font-normal py-2 px-4"
                  onClick={() => setAceitaFinanciamento(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </div>
          <div className="grid border p-4 mt-2">
            <h2 className="text-lg font-medium text-gray-600 font-serif">
              Preço
            </h2>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div>
                Mínimo
                <Input
                  placeholder="R$ 0,00"
                  size="large"
                  onChange={(e) => {
                    const inputValue = e.target.value.replace(/\D/g, "");
                    const formatted = new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      minimumFractionDigits: 2,
                    }).format(Number(inputValue) / 100);
                    setValorMin(formatted);
                  }}
                />
              </div>
              <div className="">
                Máximo
                <Input
                  placeholder="R$ 0,00"
                  size="large"
                  onChange={(e) => {
                    const inputValue = e.target.value.replace(/\D/g, "");
                    const formatted = new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      minimumFractionDigits: 2,
                    }).format(Number(inputValue) / 100);
                    setValorMin(formatted);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="grid border p-4 mt-2">
            <h2 className="text-lg font-medium text-gray-600 font-serif">
              Perfil do Imóvel
            </h2>
            <div className="grid pt-2">
              <Checkbox onChange={(e) => setPerfilImovel({
                ...perfilImovel,
                residencial: e.target.checked
              })}>
                Residencial
              </Checkbox>
              <Checkbox onChange={(e) => setPerfilImovel({
                ...perfilImovel,
                comercial: e.target.checked
              })}>
                Comercial
              </Checkbox>
              <Checkbox onChange={(e) => setPerfilImovel({
                ...perfilImovel,
                industrial: e.target.checked
              })}>
                Industrial
              </Checkbox>
              <Checkbox onChange={(e) => setPerfilImovel({
                ...perfilImovel,
                rural: e.target.checked
              })}>
                Rural
              </Checkbox>

            </div>
          </div>
        </aside>
        <div className="xl:col-span-4 lg:col-span-3 md:col-span-3 sm:col-span-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-3 gap-12 justify-items-center">
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
  );
}
