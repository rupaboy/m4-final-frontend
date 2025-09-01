import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SPHEREONE_ROOT_DOMAIN,
  headers: { "Content-Type": "application/json" },
});

// Setter de token para endpoints que lo requieran
export const setCountryToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

const CountryApi = {
  // Create/populate the countries collection
  createCollection: () =>
    api.post(`/${import.meta.env.VITE_COUNTRY_POPULATE}`),

  // Insert or refresh a country by code
  insertByCode: (code) =>
    api.post(`/${import.meta.env.VITE_COUNTRY_CODE}/${code}`),

  // Delete a country by id
  delete: (id) =>
    api.delete(`/${import.meta.env.VITE_COUNTRY_ID}/${id}`),

  // Purge entire countries collection
  purgeCollection: () =>
    api.delete(`/${import.meta.env.VITE_COUNTRY_PURGE}`),

  // Get capital image by name
  capitalImageByName: (capitalName) =>
    api.get(`/${import.meta.env.VITE_CAPITAL_IMAGE_NAME}/${encodeURIComponent(capitalName)}`)
      .then(res => res.data.imageUrl || null),

  // Get country by code
  byCode: (code) =>
    api.get(`/${import.meta.env.VITE_COUNTRY_CODE}/${code}`),

  // Get country by id
  byId: (id) =>
    api.get(`/${import.meta.env.VITE_COUNTRY_ID}/${id}`),

  // Get list of country duplicates
  duplicates: () =>
    api.get(`/${import.meta.env.VITE_COUNTRY_DUPLICATES}`),

  // Get full list of countries
  list: () =>
    api.get(`/${import.meta.env.VITE_COUNTRY_LIST}`),

  // Update country by code
  refreshByCode: (code) =>
    api.put(`/${import.meta.env.VITE_COUNTRY_CODE}/${code}`),
};

export default CountryApi;
