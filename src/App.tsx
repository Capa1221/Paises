import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';
import Navbar from './components/Navbar';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/country/:countryName" element={<CountryDetail />} />
      </Routes>
    </div>
  );
};

export default App;
