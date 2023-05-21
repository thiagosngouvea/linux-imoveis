import axios from "axios";


const getEstados = async () => await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados");

const getMunicipios = async (uf: string) => await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);

const getBairros = async (uf: string, municipio: string) => await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios/${municipio}/distritos`);

export const ibgeService = {
    getEstados,
    getMunicipios,
};
