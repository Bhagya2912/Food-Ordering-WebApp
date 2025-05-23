import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { food_list } from '../../assets/assets';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const results = food_list.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(results);
  };

  const handleSelectItem = (item) => {
    navigate("/product-detail", { state: item });
    setSearchTerm('');
    setFilteredItems([]);
  };

  return (
    <div className="relative">
      <div className="flex">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
          className="rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button className="ml-2 bg-orange-600 text-white px-4 py-2 rounded-full">Search</button>
      </div>

      {searchTerm && (
        <ul className="absolute bg-black mt-1 w-full rounded shadow z-10 max-h-60 overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li
                key={index}
                className="p-2  cursor-pointer"
                onClick={() => handleSelectItem(item)}
              >
                {item.name}
              </li>
            ))
          ) : (
            <li className="p-2 text-white italic cursor-default">
              Item not found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

