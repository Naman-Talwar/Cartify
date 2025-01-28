import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Upload, X } from 'lucide-react';

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
  const location = useLocation();
  const orderedItems = location.state?.orderedItems || [];
  const [showPackagingPopup, setShowPackagingPopup] = useState(false);
  const [uploadedImages, setUploadedImages] = useState({});
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

  const handleImageUpload = (itemId, e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImages(prev => ({
        ...prev,
        [itemId]: URL.createObjectURL(file)
      }));
    }
  };

  const handleSendForPackaging = () => {
    setShowPackagingPopup(true);
    setTimeout(() => {
      setShowPackagingPopup(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-8">Seller Dashboard</h1>

        {/* Orders Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Recent Orders</h2>

          {orderedItems.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No orders to display</p>
          ) : (
            <>
              {/* Order Items List */}
              <div className="space-y-4 mb-6">
                {orderedItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    {/* Product Image */}
                    <div className="w-20 h-20">
                      <img
                        src={item.link}
                        alt={item.productDisplayName}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.productDisplayName}</h3>
                      <div className="mt-1 text-sm text-gray-500">
                        Quantity: {item.quantity} • Color: {item.baseColour}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {item.articleType} • {item.usage}
                      </div>
                    </div>

                    {/* Upload Image Button */}
                    <div className="flex flex-col items-center gap-2">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(item.id, e)}
                          className="hidden"
                        />
                        <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                          <Upload className="w-5 h-5" />
                          <span className="text-sm">Upload Image</span>
                        </div>
                      </label>
                      {uploadedImages[item.id] && (
                        <div className="relative w-20 h-20">
                          <img
                            src={uploadedImages[item.id]}
                            alt="Uploaded"
                            className="w-full h-full object-cover rounded-md"
                          />
                          <button
                            onClick={() => setUploadedImages(prev => {
                              const newImages = { ...prev };
                              delete newImages[item.id];
                              return newImages;
                            })}
                            className="absolute -top-2 -right-2 p-1 bg-black rounded-full text-white hover:bg-gray-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Send for Packaging Button */}
              <button
                onClick={handleSendForPackaging}
                className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200"
              >
                Send Product for Packaging
              </button>
            </>
          )}
        </div>
      </div>

      {/* Packaging Success Popup */}
      {showPackagingPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"></div>

          {/* Popup Content */}
          <div className="relative bg-white rounded-lg p-8 max-w-sm w-full mx-4 transform transition-all">
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Success Message */}
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Order Sent for Packaging!
              </h3>
              <p className="text-sm text-gray-500">
                The order has been successfully sent to the packaging department.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerHome; 