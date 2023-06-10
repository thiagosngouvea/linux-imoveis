import api from "./api.service";


const getAll = async (
    per_page = 8,
    page = 1,
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

export const propertiesService = {
  getAll,
  getByUrl,
};
