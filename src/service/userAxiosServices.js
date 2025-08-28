import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_SPHEREONE_ROOT_DOMAIN,
  headers: { 'Content-Type': 'application/json' }
});

// === USERS ===
export const signInUser = async (userData) => {
  const url = import.meta.env.VITE_AUTH_SIGNIN;
  const { data } = await api.post(url, userData);
  return data;
};

export const signUpUser = async (userData) => {
  const url = import.meta.env.VITE_AUTH_SIGNUP;
  const { data } = await api.post(url, userData);
  return data;
};

export const createUser = async (userData) => {
  const url = import.meta.env.VITE_USER_CREATE;
  const { data } = await api.post(url, userData);
  return data;
};

export const deleteAllUsersByAdmin = async () => {
  const url = import.meta.env.VITE_USER_ALLBUTADMIN;
  const { data } = await api.delete(url);
  return data;
};

export const deleteUser = async (id) => {
  const url = `${import.meta.env.VITE_USER_ID}/${id}`;
  const { data } = await api.delete(url);
  return data;
};

export const readUserByEmail = async (email) => {
  const url = `${import.meta.env.VITE_USER_EMAIL}/${email}`;
  const { data } = await api.get(url);
  return data;
};

export const readUserById = async (id) => {
  const url = `${import.meta.env.VITE_USER_ID}/${id}`;
  const { data } = await api.get(url);
  return data;
};

export const readUserByUsername = async (username) => {
  const url = `${import.meta.env.VITE_USER_USERNAME}/${username}`;
  const { data } = await api.get(url);
  return data;
};

export const readUserDuplicates = async (field) => {
  const url = `${import.meta.env.VITE_USER_DUPLICATES}/${field}`;
  const { data } = await api.get(url);
  return data;
};

export const readUserList = async (countryCode = '') => {
  const url = countryCode
    ? `${import.meta.env.VITE_USER_LIST}/${countryCode}`
    : import.meta.env.VITE_USER_LIST;
  const { data } = await api.get(url);
  return data;
};

export const updateUser = async (id, userData) => {
  const url = `${import.meta.env.VITE_USER_ID}/${id}`;
  const { data } = await api.put(url, userData);
  return data;
};
