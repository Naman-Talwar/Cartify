import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/search-results', { state: { query: searchQuery } });
      onClose();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      {/* Backdrop */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0'}`} onClick={onClose}></div>
      
      {/* Search Box */}
      <div className="relative w-3/5 h-3/5 max-w-none px-7 py-10 bg-white rounded-lg shadow-lg z-10">
        <button className="absolute top-4 right-4 text-4xl cursor-pointer text-black hover:text-red-500" onClick={onClose}>
          ×
        </button>

        {/* Search Bar with Icon */}
        <form onSubmit={handleSearch}>
          <div className="flex items-center border-b-2 border-black relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              autoFocus
              className="w-full p-4 text-2xl bg-transparent outline-none pr-12"
            />
            <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="text-gray-500 cursor-pointer hover:text-gray-950"
              >
                <path
                  d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        </form>

        {/* Image Upload Section */}
        <div className="mt-6 flex items-center gap-4">
          <label className="flex items-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-black transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="text-gray-600"
            >
              <path
                d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 15L16 10L5 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-gray-600">Add image to search</span>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          
          <button 
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={() => {/* Handle image search */}}
          >
            Search
          </button>
        </div>

        {/* Preview uploaded image */}
        {selectedImage && (
          <div className="mt-4 relative inline-block">
            <img
              src={selectedImage}
              alt="Upload preview"
              className="max-h-32 rounded-lg object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 p-1 bg-black rounded-full text-white hover:bg-gray-800"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Quick Search Section */}
        <div className="flex items-center justify-center gap-4 font-normal mt-30">
          <p>Quick Search:</p>
          <ul className="flex list-none p-0 m-0">
            <li className="mr-4 cursor-pointer hover:underline">Jackets</li>
            <li className="mr-4 cursor-pointer hover:underline">Shirts</li>
            <li className="mr-4 cursor-pointer hover:underline">Tops</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;