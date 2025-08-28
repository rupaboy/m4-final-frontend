import axios from "axios";

const rootDomain = import.meta.env.VITE_SPHEREONE_ROOT_DOMAIN;

// Create/populate the countries collection
export const createCountryCollection = async () => {
  const countryCollectionPopulate = import.meta.env.VITE_COUNTRY_POPULATE;
  try {
    const res = await axios.post(`${rootDomain}/${countryCollectionPopulate}`);
    return res.data;
  } catch (error) {
    console.error("Error populating countries collection", error);
    throw error;
  }
};

// Insert or refresh a country by code
export const createInsertCountryByCode = async (code) => {
  const countryByCode = import.meta.env.VITE_COUNTRY_CODE;
  try {
    const res = await axios.post(`${rootDomain}/${countryByCode}/${code}`);
    return res.data;
  } catch (error) {
    console.error(`Error refreshing country document by code ${code}`, error);
    throw error;
  }
};

// Delete a country by id
export const deleteCountry = async (id) => {
  const countryById = import.meta.env.VITE_COUNTRY_ID;
  try {
    const res = await axios.delete(`${rootDomain}/${countryById}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting country", error);
    throw error;
  }
};

// Purge entire countries collection
export const deletePurgeCountryCollection = async () => {
  const countryCollectionPurge = import.meta.env.VITE_COUNTRY_PURGE;
  try {
    const res = await axios.delete(`${rootDomain}/${countryCollectionPurge}`);
    return res.data;
  } catch (error) {
    console.error("Error attempting to purge the countries collection", error);
    throw error;
  }
};

// Get capital image by name
export const readCapitalImageByName = async (capitalName) => {
  const capitalImageByName = import.meta.env.VITE_CAPITAL_IMAGE_NAME;
  try {
    const res = await axios.get(`${rootDomain}/${capitalImageByName}/${encodeURIComponent(capitalName)}`);
    return res.data.thumbnail?.source || null;
  } catch (err) {
    console.error(`Error fetching capital image for ${capitalName}`, err);
    throw new Error(err?.response?.statusText || err.message);
  }
};

// Get country by code
export const readCountryByCode = async (code) => {
  const countryFetch = import.meta.env.VITE_COUNTRY_CODE;
  try {
    const res = await axios.get(`${rootDomain}/${countryFetch}/${code}`);
    return res.data;
  } catch (error) {
    console.error("Error requesting country by code:", error);
    throw error;
  }
};

// Get country by id
export const readCountryById = async (id) => {
  const countryById = import.meta.env.VITE_COUNTRY_ID;
  try {
    const res = await axios.get(`${rootDomain}/${countryById}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching country by id:${id}`, error);
    throw error;
  }
};

// Get list of country duplicates
export const readCountryDuplicates = async () => {
  const countryDuplicates = import.meta.env.VITE_COUNTRY_DUPLICATES;
  try {
    const res = await axios.get(`${rootDomain}/${countryDuplicates}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching country duplicates:', error);
    throw error;
  }
};

// Get full list of countries
export const readCountryList = async () => {
  const countriesFetch = import.meta.env.VITE_COUNTRIES_FETCH;
  try {
    const res = await axios.get(`${rootDomain}/${countriesFetch}`);
    return res.data;
  } catch (error) {
    console.error('Error requesting country data:', error);
    throw error;
  }
};

// Update country by code
export const updateRefreshCountry = async (code) => {
  const countryByCode = import.meta.env.VITE_COUNTRY_CODE;
  try {
    const res = await axios.put(`${rootDomain}/${countryByCode}/${code}`);
    return res.data;
  } catch (error) {
    console.error(`Error updating country with code:${code}`, error);
    throw error;
  }
};
