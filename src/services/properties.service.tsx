import api from "./api.service";


const getAll = async (
    page = 1,
    per_page = 8,
    filterBy = "",
    filterValue?: string,
    filterType = ""
) =>
  await api.get(
    `/properties?page=${page}&per_page=${per_page}&orderBy=created_at&orderType=DESC${
    !!filterValue
    ? `&filterBy=${filterBy}&filterValue=${filterValue}&filterType=${filterType}`
    : ""
  }`
);

const getByUrl = async (url: string) => await api.get(`/properties/${url}`);

const getNeighborhoods = async () => await api.get(`/properties/neighborhoods/list`);

const getCities = async () => await api.get(`/properties/cities/list`);

const getCondominiums = async () => await api.get(`/properties/condominiums/list`);

const getTypes = async () => await api.get(`/properties/types/list`);

export const propertiesService = {
  getAll,
  getByUrl,
  getNeighborhoods,
  getCities,
  getCondominiums,
  getTypes
};
