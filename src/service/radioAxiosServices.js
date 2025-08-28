import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SPHEREONE_ROOT_DOMAIN,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true, //cookies/sessions
});

const RadioApi = {
  create: (data) =>
    api.post(`/${import.meta.env.VITE_RADIO_CREATE}`, data),

  deletePurgeCollection: (id) =>
    api.delete(`/${import.meta.env.VITE_RADIO_USER}/${id}/purge`),

  delete: (id) =>
    api.delete(`/${import.meta.env.VITE_RADIO_ID}/${id}`),

  browseByCountry: (code) =>
    api.get(`/${import.meta.env.VITE_RADIO_BROWSE}/${code}`),

  browseByCountryPage: (code, page) =>
    api.get(`/${import.meta.env.VITE_RADIO_BROWSE}/${code}/${page}`),

  byId: (id) =>
    api.get(`/${import.meta.env.VITE_RADIO_ID}/${id}`),

  byUser: (id) =>
    api.get(`/${import.meta.env.VITE_RADIO_USER}/${id}/list`),

  userByCountry: (id, code) =>
    api.get(`/${import.meta.env.VITE_RADIO_USER}/${id}/country/${code}`),

  userByStationName: (id, stationName) =>
    api.get(`/${import.meta.env.VITE_RADIO_NAMESEARCH}/${id}/${stationName}`),

  userCountries: (id) =>
    api.get(`/${import.meta.env.VITE_RADIO_USER}/${id}/countries`),

  updateScore: (id, score) =>
    api.put(`/${import.meta.env.VITE_RADIO_SCORE}/${id}/${score}`),

  refresh: (id) =>
    api.put(`/${import.meta.env.VITE_RADIO_REFRESH}/${id}`),
};

export default RadioApi;
