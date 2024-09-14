import React, { useState } from 'react';

interface CitySearchProps {
  onCitySubmit: (city: string) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onCitySubmit }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCitySubmit(city);
    setCity('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="p-2 border rounded mr-2"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Go to City
      </button>
    </form>
  );
};

export default CitySearch;
