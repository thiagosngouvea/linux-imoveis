import React, { useEffect, useState } from "react";
import { Form, Row, Col, Input, Radio, Select, InputNumber } from "antd";
import cep from "cep-promise";

export default function Negocie() {

    const [venderAlugar, setVenderAlugar] = useState<string>("vender");
    const [residencialComercial, setResidencialComercial] = useState<string>("residencial");
    const [cepEndereco, setCepEndereco] = useState<string>("");

    const { Option } = Select;
    const { TextArea } = Input;

    const buscarCep = async (cepEndereco: string) => {
        const endereco = await cep(cepEndereco)
        .then((endereco) => {
            return endereco;
        })
        .catch((error) => {
            console.log(error);
        });
        console.log(endereco);
    }


    return (
        <div>
            <h1 className="font-medium text-lg font-serif">Negocie seu imóvel</h1>
            <Form
                layout="vertical"
                >
                    <h1 className="font-bold text-gray-600 text-lg py-2">Seus dados:</h1>
                    <Row gutter={16}>
                        <Col
                            //tornar responsivo
                            xs={24}
                            sm={12}
                            md={8}
                            lg={8}
                        >
                            <Form.Item
                                label="Nome"
                                name="name"
                            >
                                <Input
                                    placeholder="Nome"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Telefone"
                                name="phone"
                            >
                                <Input
                                    placeholder="Telefone"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="E-mail"
                                name="email"
                                rules={[{ type: 'email' }]}
                            >
                                <Input
                                    placeholder="E-mail"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h1 className="font-bold text-gray-600 text-lg py-2">Você gostaria de:</h1>
                    <Row gutter={16}>
                        <Col span={8}>
                            {/* VAI TER UM SWITCH COM DOIS BOTOES VENDER E ALUGAR */}
                            <Form.Item
                                name="venderAlugar"
                            >
                                <div className="flex flex-row justify-center">
                                    <button
                                        className={venderAlugar === "vender" ? "bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4" : "bg-white border hover:bg-gray-300 text-gray-800 font-bold py-2 px-4"}
                                        type="button"
                                        onClick={() => setVenderAlugar("vender")}
                                    >
                                        Vender
                                    </button>
                                    <button
                                        className={venderAlugar === "alugar" ? "bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4" : "bg-white border hover:bg-gray-300 text-gray-800 font-bold py-2 px-4"}
                                        type="button"
                                        onClick={() => setVenderAlugar("alugar")}
                                    >
                                        Alugar
                                    </button>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                    <h1 className="font-bold text-gray-600 text-lg py-2">Seu imóvel é:</h1>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="venderAlugar"
                                // label="Residencial ou comercial?"
                            >
                                <div className="flex flex-row items-center justify-center align-center mt-6">
                                    <button
                                        className={residencialComercial === "residencial" ? "bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4" : "bg-white border hover:bg-gray-300 text-gray-800 font-bold py-2 px-4"}
                                        type="button"
                                        onClick={() => setResidencialComercial("residencial")}
                                    >
                                        Residencial
                                    </button>
                                    <button
                                        className={residencialComercial === "comercial" ? "bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4" : "bg-white border hover:bg-gray-300 text-gray-800 font-bold py-2 px-4"}
                                        type="button"
                                        onClick={() => setResidencialComercial("comercial")}
                                    >
                                        Comercial
                                    </button>
                                </div>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Tipo do imóvel"
                                name="tipoImovel"
                            >
                                <Select
                                    placeholder="Tipo do imóvel"
                                    options={[
                                        {
                                            label: <span className="font-bold text-sm text-black">Apartamento</span>,
                                            options: [
                                                {label: "Alto Padrão", value: "apartamento-alto-padrao"},
                                                {label: "Cobertura", value: "apartamento-cobertura"},
                                                {label: "Cobertura Duplex", value: "apartamento-cobertura-duplex"},
                                                {label: "Cobertura Linear", value: "apartamento-cobertura-linear"},
                                                {label: "Cobertura Triplex", value: "apartamento-cobertura-triplex"},
                                                {label: "Com área externa", value: "apartamento-area-externa"},
                                                {label: "Conjugado", value: "apartamento-conjugado"},
                                                {label: "Duplex", value: "apartamento-duplex"},
                                                {label: "Flat", value: "apartamento-flat"},
                                                {label: "Garden", value: "apartamento-garden"},
                                                {label: "Kitnet", value: "apartamento-kitnet"},
                                                {label: "Loft", value: "apartamento-loft"},
                                                {label: "Padrão", value: "apartamento-padrao"},
                                                {label: "Penthouse", value: "apartamento-penthouse"},
                                                {label: "Studio", value: "apartamento-studio"},
                                                {label: "Triplex", value: "apartamento-triplex"},
                                                {label: "Térreo", value: "apartamento-terreo"},
                                            ],
                                        },
                                        {
                                            label: <span className="font-bold text-sm text-black">Casa</span>,
                                            options: [
                                                {label: "Alto Padrão", value: "casa-alto-padrao"},
                                                {label: "Alvenaria", value: "casa-alvenaria"},
                                                {label: "Chalé", value: "casa-chale"},
                                                {label: "Duplex", value: "casa-duplex"},
                                                {label: "Geminada", value: "casa-geminada"},
                                                {label: "kitnet", value: "casa-kitnet"},
                                                {label: "Linear", value: "casa-linear"},
                                                {label: "Madeira", value: "casa-madeira"},
                                                {label: "Mista", value: "casa-mista"},
                                                {label: "Padrão", value: "casa-padrao"},
                                                {label: "Sobrado", value: "casa-sobrado"},
                                                {label: "Pré-moldada", value: "casa-pre-moldada"},
                                                {label: "Sobreloja", value: "casa-sobreloja"},
                                                {label: "Sobreposta", value: "casa-sobreposta"},
                                                {label: "Triplex", value: "casa-triplex"},
                                                {label: "Térrea", value: "casa-terrea"},
                                                {label: "Vila", value: "casa-vila"},
                                                {label: "em Condomínio", value: "casa-em-condominio"},
                                            ],
                                        },
                                        {
                                            label: <span className="font-bold text-sm text-black">Terreno</span>,
                                            options: [
                                                {label: "Lote", value: "terreno-lote"},
                                                {label: "Terreno", value: "terreno"},
                                                {label: "em Condomínio", value: "terreno-em-condominio"},
                                                {label: "em Loteamento", value: "terreno-em-loteamento"},
                                            ],
                                        },
                                        {
                                            label: <span className="font-bold text-sm text-black">Sítio</span>,
                                            options: [
                                                {label: "Sítio", value: "sitio"},
                                                {label: "Haras", value: "sitio-haras"},
                                            ],
                                        },
                                        {
                                            label: <span className="font-bold text-sm text-black">Garagem</span>,
                                            options: [
                                                {label: "Box", value: "garagem-box"},
                                                {label: "Garagem Externa", value: "garagem-externa"},
                                                {label: "Garagem Externa Coberta", value: "garagem-externa-coberta"},
                                                {label: "Garagem Interna", value: "garagem-interna"},
                                            ],
                                        },
                                        {
                                            label: <span className="font-bold text-sm text-black">Fazenda</span>,
                                            options: [
                                                {label: "Fazenda", value: "fazenda"},
                                                {label: "Haras", value: "fazenda-haras"},
                                                {label: "Lavoura", value: "fazenda-lavoura"},
                                                {label: "Mista", value: "fazenda-mista"},
                                                {label: "Pecuária", value: "fazenda-pecuaria"},
                                            ],
                                        },
                                        {
                                            label: <span className="font-bold text-sm text-black">Chácara</span>,
                                            options: [
                                                {label: "Chácara", value: "chacara"},
                                            ],
                                        },
                                        {
                                            label: <span className="font-bold text-sm text-black">Rancho</span>,
                                            options: [
                                                {label: "Rancho", value: "rancho"},
                                            ],
                                        },
                                        {
                                            label: <span className="font-bold text-sm text-black">Pousada</span>,
                                            options: [
                                                {label: "Pousada", value: "pousada"},
                                            ],
                                        },
                                        {
                                            label: <span className="font-bold text-sm text-black">Sala</span>,
                                            options: [
                                                {label: "Andar Comercial", value: "sala-andar-comercial"},
                                                {label: "Comercial", value: "sala-comercial"},
                                            ],
                                        },
                                        {
                                            label: <span className="font-bold text-sm text-black">Loja</span>,
                                            options: [
                                                {label: "Loja", value: "loja"},
                                                {label: "Ponto Comercial", value: "loja-ponto-comercial"},
                                            ],
                                        },
                                        {
                                            label: <span className="font-bold text-sm text-black">Flat</span>,
                                            options: [
                                                {label: "Flat", value: "flat"},
                                            ],
                                        },
                                        {
                                            label: <span className="font-bold text-sm text-black">Sobrado</span>,
                                            options: [
                                                {label: "Alto padrão", value: "sobrado-alto-padrao"},
                                                {label: "Geminado", value: "sobrado-geminado"},
                                                {label: "Padrão", value: "sobrado-padrao"},
                                                {label: "em Condomínio", value: "sobrado-em-condominio"},
                                            ],
                                        },
                                        {
                                            label: <span className="font-bold text-sm text-black">Prédio</span>,
                                            options: [
                                                {label: "Comercial", value: "predio-comercial"},
                                                {label: "Residencial", value: "predio-comercial"},
                                            ],
                                        },
                                        {
                                            label: <span className="font-bold text-sm text-black">Indústria</span>,
                                            options: [
                                                {label: "Indústria", value: "industria"},
                                            ],
                                        },
                                        {
                                            label: <span className="font-bold text-sm text-black">Pavilhão/Galpão</span>,
                                            options: [
                                                {label: "Em condomínio", value: "pavilhao-galpao-condominio"},
                                                {label: "Industrial", value: "pavilhao-galpao-industrial"},
                                                {label: "Logístico", value: "pavilhao-galpao-logistico"},
                                                {label: "Salão Comercial", value: "pavilhao-galpao-salao-comercial"},
                                            ],
                                        },
                                        {
                                            label: <span className="font-bold text-sm text-black">Área</span>,
                                            options: [
                                                {label: "Comercial", value: "area-comercial"},
                                                {label: "Industrial", value: "area-industrial"},
                                                {label: "Reflorestamento", value: "area-reflorestamento"},
                                                {label: "Residencial", value: "area-residencial"},
                                                {label: "Residencial/Comercial", value: "area-residencial-comercial"},
                                                {label: "Rural", value: "area-rural"},
                                            ],
                                        },
                                        {
                                            label: <span className="font-bold text-sm text-black">Ponto Comercial</span>,
                                            options: [
                                                {label: "Andar Comercial", value: "ponto-comercial-andar-comercial"},
                                                {label: "Comercio", value: "ponto-comercial-comercio"},
                                                {label: "Indústria", value: "ponto-comercial-industria"},
                                            ],
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h1 className="font-bold text-gray-600 text-lg py-2">Onde fica o imóvel?</h1>
                    <Row gutter={16}>
                        <Col span={8}>
                            <div className="flex">
                                <Form.Item
                                    name="cep"
                                    label="CEP"
                                >
                                    <Input 
                                        placeholder="Digite o CEP" 
                                        onBlur={() => buscarCep(cepEndereco)}
                                        onChange={(e) => setCepEndereco(e.target.value)}
                                    />
                                </Form.Item>
                                <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="-blank" rel="noreferrer" className="text-blue-500 mt-8 ml-2">Não sei meu CEP</a>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item
                                name="estado"
                                label="Estado"
                            >
                                <Select placeholder="Selecione o estado">
                                    <Option value="acre">Acre</Option>
                                    <Option value="alagoas">Alagoas</Option>
                                    <Option value="amapa">Amapá</Option>
                                    <Option value="amazonas">Amazonas</Option>
                                    <Option value="bahia">Bahia</Option>
                                    <Option value="ceara">Ceará</Option>
                                    <Option value="distrito-federal">Distrito Federal</Option>
                                    <Option value="espirito-santo">Espírito Santo</Option>
                                    <Option value="goias">Goiás</Option>
                                    <Option value="maranhao">Maranhão</Option>
                                    <Option value="mato-grosso">Mato Grosso</Option>
                                    <Option value="mato-grosso-do-sul">Mato Grosso do Sul</Option>
                                    <Option value="minas-gerais">Minas Gerais</Option>
                                    <Option value="para">Pará</Option>
                                    <Option value="paraiba">Paraíba</Option>
                                    <Option value="parana">Paraná</Option>
                                    <Option value="pernambuco">Pernambuco</Option>
                                    <Option value="piaui">Piauí</Option>
                                    <Option value="rio-de-janeiro">Rio de Janeiro</Option>
                                    <Option value="rio-grande-do-norte">Rio Grande do Norte</Option>
                                    <Option value="rio-grande-do-sul">Rio Grande do Sul</Option>
                                    <Option value="rondonia">Rondônia</Option>
                                    <Option value="roraima">Roraima</Option>
                                    <Option value="santa-catarina">Santa Catarina</Option>
                                    <Option value="sao-paulo">São Paulo</Option>
                                    <Option value="sergipe">Sergipe</Option>
                                    <Option value="tocantins">Tocantins</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item
                                name="cidade"
                                label="Cidade"
                            >
                                <Select placeholder="Selecione a cidade">
                                    <Option value="acre">Acre</Option>
                                    <Option value="alagoas">Alagoas</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="bairro"
                                label="Bairro"
                            >
                                <Select placeholder="Selecione o bairro">
                                    <Option value="acre">Acre</Option>
                                    <Option value="alagoas">Alagoas</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="endereço"
                                label="Endereço"
                                >
                                <Input placeholder="Digite o endereço" />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                name="numero"
                                label="Número"
                                >
                                <Input placeholder="Digite o número" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="complemento"
                                label="Complemento"
                                >
                                <Input placeholder="Digite o complemento" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h1 className="font-bold text-gray-600 text-lg py-2">Dados Financeiros</h1>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="preço-imovel"
                                label="Preço do imóvel"
                                >
                                <InputNumber 
                                    placeholder="Digite o preço do imóvel"
                                    formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="preço-condominio"
                                label="Condomínio (R$/mês)"
                                >
                                <InputNumber
                                    placeholder="Digite o preço do condomínio"
                                    formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="preço-iptu"
                                label="IPTU (R$/ano)"
                                >
                                <InputNumber
                                    placeholder="Digite o preço do IPTU"
                                    formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h1 className="font-bold text-gray-600 text-lg py-2">Detalhes do imóvel</h1>
                    <p className="text-gray-600">
                        Informe dados para ajudar a valorizar o anúncio, como situação do imóvel, pontos fortes do bairro em que se localiza,
                         vizinhança, ventilação, iluminação, etc.
                    </p>
                    <Row gutter={16}>
                        <TextArea 
                            rows={4} 
                            placeholder="Digite os detalhes do imóvel"
                        />
                    </Row>
                                

                </Form>
        </div>
    );
}