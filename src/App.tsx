
// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:name" element={<CountryDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
