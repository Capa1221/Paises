import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryByName } from '../services/api';

interface Country {
  name: { common: string };
  flags: { svg: string };
  capital?: string[];
  population: number;
  region: string;
  subregion?: string;
  area?: number;
  languages?: { [key: string]: string };
  currencies?: { [key: string]: { name: string; symbol: string } };
  borders?: string[];
}

const CountryDetail: React.FC = () => {
  const { countryName } = useParams<{ countryName: string }>();
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    if (countryName) {
      getCountryByName(countryName)
        .then(response => {
          setCountry(response.data[0]);
        })
        .catch(error => console.error('Error fetching country:', error));
    }
  }, [countryName]);

  if (!country) {
    return <p>Loading...</p>;
  }

  // Valores predeterminados para propiedades opcionales
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map(currency => `${currency.name} (${currency.symbol})`)
        .join(', ')
    : 'N/A';
  const borders = country.borders ? country.borders.join(', ') : 'None';

  return (
    <div className="country-detail-card">
      <h2>{country.name.common}</h2>
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className="country-flag" />
      <div className="country-info">
        <p><strong>Capital:</strong> {country.capital ? country.capital.join(', ') : 'N/A'}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
        <p><strong>Area:</strong> {country.area ? `${country.area.toLocaleString()} km²` : 'N/A'}</p>
        <p><strong>Languages:</strong> {languages}</p>
        <p><strong>Currencies:</strong> {currencies}</p>
        <p><strong>Bordering Countries:</strong> {borders}</p>
      </div>
      <Link to="/" className="back-link">Back to list</Link>
    </div>
  );
};

export default CountryDetail;
