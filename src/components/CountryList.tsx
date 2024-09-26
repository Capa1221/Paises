import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCountries } from '../services/api';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

interface Country {
  name: { common: string };
  cca3: string;
  flags: { svg: string };
}

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getAllCountries()
      .then(response => setCountries(response.data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Resetea la página actual a 1 cuando se realiza una nueva búsqueda
  };

  return (
    <div className="country-list">
      <h1>Lista de Países</h1>
      <SearchBar onSearch={handleSearch} />
      <ul>
        {currentCountries.map(country => (
          <li key={country.cca3} className="country-item">
            <Link to={`/country/${country.name.common}`}>
              <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className="country-flag" />
              {country.name.common}
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CountryList;
