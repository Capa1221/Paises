// src/services/api.ts
import axios from 'axios';

const API_URL = 'https://restcountries.com/v3.1'; // Asegúrate de que la URL sea correcta

export const getAllCountries = () => {
  return axios.get(`${API_URL}/all`);
};

export const getCountryByName = (name: string) => {
  return axios.get(`${API_URL}/name/${name}`);
};
