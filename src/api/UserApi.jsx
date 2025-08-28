import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SPHEREONE_ROOT_DOMAIN,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true, // activar si tu backend usa cookies/sesiones
});

const UserApi = {
  api,
  signIn: (data) =>
    api.post(`/${import.meta.env.VITE_AUTH_SIGNIN}`, data),

  signUp: (data) =>
    api.post(`/${import.meta.env.VITE_AUTH_SIGNUP}`, data),

  create: (data) =>
    api.post(`/${import.meta.env.VITE_USER_CREATE}`, data),

  deleteAllByAdmin: () =>
    api.delete(`/${import.meta.env.VITE_USER_ALLBUTADMIN}`),

  delete: (id) =>
    api.delete(`/${import.meta.env.VITE_USER_ID}/${id}`),

  readByEmail: (email) =>
    api.get(`/${import.meta.env.VITE_USER_EMAIL}/${email}`),

  readById: (id) =>
    api.get(`/${import.meta.env.VITE_USER_ID}/${id}`),

  readByUsername: (username) =>
    api.get(`/${import.meta.env.VITE_USER_USERNAME}/${username}`),

  readDuplicates: (field) =>
    api.get(`/${import.meta.env.VITE_USER_DUPLICATES}/${field}`),

  readList: (countryCode = "") =>
    countryCode
      ? api.get(`/${import.meta.env.VITE_USER_LIST}/${countryCode}`)
      : api.get(`/${import.meta.env.VITE_USER_LIST}`),

  update: (id, data) =>
    api.put(`/${import.meta.env.VITE_USER_ID}/${id}`, data),
};

export default UserApi;
