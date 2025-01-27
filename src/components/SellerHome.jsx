import React, { useState } from 'react';

const ProductCard = ({ product, isOpen, onToggle }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      {/* Product Header - Always visible */}
      <div 
        className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
        onClick={onToggle}
      >
        <img 
          src={product.image} 
          alt={product.title}
          className="w-24 h-24 object-cover rounded-md"
        />
        <div className="ml-6">
          <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
        <svg
          className={`ml-auto w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Product Details - Expandable */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="p-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <p className="mt-1 text-sm text-gray-900">${product.price}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <p className="mt-1 text-sm text-gray-900">{product.quantity} units</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sizes</label>
              <p className="mt-1 text-sm text-gray-900">{product.sizes.join(', ')}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Colors</label>
              <div className="mt-1 flex gap-2">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SellerHome = () => {
  const [openProductId, setOpenProductId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Sample product data
  const products = [
    {
      id: 1,
      title: "Men's Winter Jacket",
      category: "Men's Outerwear",
      image: "/path/to/jacket-image.jpg",
      price: 129.99,
      quantity: 50,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['#000000', '#3B3B3B', '#6B6B6B']
    },
    // Add more products...
  ];

  const handleProductClick = (productId) => {
    setOpenProductId(openProductId === productId ? null : productId);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle product submission logic here
    console.log('Selected file:', selectedFile);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Products List */}
      <div className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Products</h2>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isOpen={openProductId === product.id}
            onToggle={() => handleProductClick(product.id)}
          />
        ))}
      </div>

      {/* Upload Section */}
      <div className="max-w-3xl mx-auto mt-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Upload New Product Image
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send product for packaging
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerHome; 