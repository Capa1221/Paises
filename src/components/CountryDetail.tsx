// src/components/CountryDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryByName } from '../services/api';

interface Country {
  name: { common: string; official: string };
  capital: string[];
  population: number;
  region: string;
  subregion: string;
  flags: { png: string; svg: string };
  languages: { [key: string]: string };
  currencies: { [key: string]: { name: string; symbol: string } };
}

const CountryDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    if (name) {
      getCountryByName(name)
        .then(response => setCountry(response.data[0]))
        .catch(error => console.error('Error fetching country details:', error));
    }
  }, [name]);

  if (!country) return <p>Cargando...</p>;

  return (
    <div className="country-detail-card">
      <Link to="/">Regresar a la lista</Link>
      <h2>{country.name.common}</h2>
      <img src={country.flags.png} alt={`Bandera de ${country.name.common}`} />
      <p><strong>Nombre oficial:</strong> {country.name.official}</p>
      <p><strong>Capital:</strong> {country.capital.join(', ')}</p>
      <p><strong>Región:</strong> {country.region}</p>
      <p><strong>Subregión:</strong> {country.subregion}</p>
      <p><strong>Población:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Idiomas:</strong> {Object.values(country.languages).join(', ')}</p>
      <p><strong>Monedas:</strong> {Object.values(country.currencies)
        .map(currency => `${currency.name} (${currency.symbol})`)
        .join(', ')}</p>
    </div>
  );
};

export default CountryDetail;
