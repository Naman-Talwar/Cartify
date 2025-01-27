import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

const CategoryButton = ({ icon, label, isActive }) => (
  <Link 
    to={`/${label.toLowerCase()}`} 
    className={`flex flex-col items-center gap-2 p-4 ${
      isActive ? 'opacity-100' : 'opacity-50 hover:opacity-75'
    }`}
  >
    <img src={icon} alt={label} className="w-12 h-12 object-contain" />
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

const Search = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { icon: './assets/Search/Outerwear.jpg', label: 'Outerwear' },
    { icon: './assets/Search/Outerwear.jpg', label: 'Sweaters' },
    { icon: './assets/Search/Outerwear.jpg', label: 'T-Shirts' },
    { icon: './assets/Search/Outerwear.jpg', label: 'Shirts' },
    { icon: './assets/Search/Outerwear.jpg', label: 'Bottoms' },
    { icon: './assets/Search/Outerwear.jpg', label: 'Dresses' },
    { icon: './assets/Search/Outerwear.jpg', label: 'Sport' },
    { icon: './assets/Search/Outerwear.jpg', label: 'Innerwear' },
    { icon: './assets/Search/Outerwear.jpg', label: 'Loungewear' },
    { icon: './assets/Search/Outerwear.jpg', label: 'Accessories' },
    { icon: './assets/Search/Outerwear.jpg', label: 'Maternity' },
    { icon: './assets/Search/Outerwear.jpg', label: 'UV Protection' },
    { icon: './assets/Search/Outerwear.jpg', label: 'HEATTECH' },
    { icon: './assets/Search/Outerwear.jpg', label: 'Special' },
    { icon: './assets/Search/Outerwear.jpg', label: 'AIRism' },
    { icon: './assets/Search/Outerwear.jpg', label: 'UT' },
    { icon: './assets/Search/Outerwear.jpg', label: 'Peace' },
    { icon: './assets/Search/Outerwear.jpg', label: 'Sale' },
    { icon: './assets/Search/Outerwear.jpg', label: 'New Arrival' },
    { icon: './assets/Search/Outerwear.jpg', label: 'Extra Sizes' }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Categories Grid */}
        <div className="p-4">
          <div className="grid grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <CategoryButton
                key={index}
                icon={category.icon}
                label={category.label}
                isActive={index === 0}
              />
            ))}
          </div>

          {/* From CARTIFY Section */}
          <div className="mt-8 mb-24"> {/* Added bottom margin for search bar */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">From CARTIFY</h2>
              <Link to="/all" className="text-blue-600 text-sm">VIEW ALL</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="aspect-square bg-gray-100 rounded-lg"></div>
              <div className="aspect-square bg-gray-100 rounded-lg"></div>
              <div className="aspect-square bg-gray-100 rounded-lg"></div>
              <div className="aspect-square bg-gray-100 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Search Bar at Bottom */}
      <div className="fixed bottom-24 left-0 right-0 bg-white px-4 py-3 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by keyword"
              className="flex-1 bg-transparent outline-none ml-2 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Image Upload Button */}
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </label>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav onSearchOpen={onClose} />
    </div>
  );
};

export default Search; 