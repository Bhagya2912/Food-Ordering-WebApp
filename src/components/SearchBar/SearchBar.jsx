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
    filterItems(value);
  };

  const handleIconClick = () => {
    filterItems(searchTerm);
  };

  const filterItems = (term) => {
    const results = food_list.filter(item =>
      item.name.toLowerCase().includes(term.toLowerCase())
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
      <div className="relative w-full max-w-xs">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
          className="w-100 rounded-full px-10 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={handleIconClick}
          className="absolute left-90 top-1/2 transform -translate-y-1/2 text-black hover:text-orange-500 focus:outline-none"
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      {searchTerm && (
        <ul className="absolute bg-white mt-1 w-full rounded shadow z-10 max-h-60 overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectItem(item)}
              >
                {item.name}
              </li>
            ))
          ) : (
            <li className="p-2 text-black italic cursor-default">
              Item not found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;


