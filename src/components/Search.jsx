import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sample product data with article types
  const productDatabase = [
    {
      articleType: "Tshirts",
      baseColour: "Grey",
      gender: "Men",
      id: 53759,
      link: "http://assets.myntassets.com/v1/images/style/properties/Puma-Men-Grey-T-shirt_32668f8a61454d0cc028a808cf21b383_images.jpg",
      masterCategory: "Apparel",
      productDisplayName: "Puma Men Grey T-shirt",
      season: "Summer",
      subCategory: "Topwear",
      usage: "Casual",
      year: 2012.0
    },
    // Add more sample products with different article types
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      try {
        // Simulate API call with local search
        const searchResults = productDatabase.filter(product => 
          product.articleType.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Navigate to search results with the filtered data
        navigate('/search-results', { 
          state: { 
            products: searchResults,
            query: searchQuery 
          } 
        });
        onClose();
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
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
              list="article-types"
            />
            {/* Datalist for article type suggestions */}
            <datalist id="article-types">
              {Array.from(new Set(productDatabase.map(product => product.articleType))).map((type, index) => (
                <option key={index} value={type} />
              ))}
            </datalist>
            <button 
              type="submit" 
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
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
              )}
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




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Search = ({ isOpen, onClose }) => {
//   const navigate = useNavigate();
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [similarImages, setSimilarImages] = useState([]); // Store image URLs
//   const [isImageSearching, setIsImageSearching] = useState(false);

//   // Sample product data with article types
//   const productDatabase = [
//     {
//       articleType: "Tshirts",
//       baseColour: "Grey",
//       gender: "Men",
//       id: 53759,
//       link: "http://assets.myntassets.com/v1/images/style/properties/Puma-Men-Grey-T-shirt_32668f8a61454d0cc028a808cf21b383_images.jpg",
//       masterCategory: "Apparel",
//       productDisplayName: "Puma Men Grey T-shirt",
//       season: "Summer",
//       subCategory: "Topwear",
//       usage: "Casual",
//       year: 2012.0
//     },
//     // Add more sample products with different article types
//   ];

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(URL.createObjectURL(file));
//       setSimilarImages([]); // Clear previous results
//     }
//   };

//   const handleImageSearch = async () => {
//     if (!selectedImage) return;

//     setIsImageSearching(true);
//     setError(null);

//     try {
//       // Create FormData to send the image
//       const formData = new FormData();
//       const fileInput = document.querySelector('#file');
//       formData.append('image', fileInput.files[0]);

//       const response = await fetch('http://localhost:5000/api/image-search', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Image search failed. Please try again.');
//       }

//       const data = await response.json();
//       // Assuming the backend returns an array of image URLs
//       setSimilarImages(data);
//     } catch (error) {
//       console.error('Image search error:', error);
//       setError(error.message);
//     } finally {
//       setIsImageSearching(false);
//     }
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       setIsLoading(true);
//       setError(null);

//       try {
//         const response = await fetch('http://localhost:5000/api/search', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             articleType: searchQuery
//           })
//         });

//         if (!response.ok) {
//           throw new Error('Search failed. Please try again.');
//         }

//         const data = await response.json();
        
//         // Handle both single product and array of products
//         const products = Array.isArray(data) ? data : [data];
        
//         // Navigate to search results with the received data
//         navigate('/search-results', { 
//           state: { 
//             products,
//             query: searchQuery 
//           } 
//         });
//         onClose();
//       } catch (error) {
//         console.error('Search error:', error);
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <div className={`fixed inset-0 z-50 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
//       {/* Backdrop */}
//       <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0'}`} onClick={onClose}></div>
      
//       {/* Search Box */}
//       <div className="relative w-3/5 h-4/5 max-w-none px-7 py-10 bg-white rounded-lg shadow-lg z-10 overflow-y-auto">
//         <button className="absolute top-4 right-4 text-4xl cursor-pointer text-black hover:text-red-500" onClick={onClose}>
//           ×
//         </button>

//         {/* Search Bar with Icon */}
//         <form onSubmit={handleSearch}>
//           <div className="flex flex-col">
//             <div className="flex items-center border-b-2 border-black relative">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search for products..."
//                 autoFocus
//                 className="w-full p-4 text-2xl bg-transparent outline-none pr-12"
//               />
//               <button 
//                 type="submit" 
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <svg className="animate-spin h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                 ) : (
//                   <svg
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     className="text-gray-500 cursor-pointer hover:text-gray-950"
//                   >
//                     <path
//                       d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       fill="none"
//                     />
//                   </svg>
//                 )}
//               </button>
//             </div>
//             {/* Error Message */}
//             {error && (
//               <p className="text-red-500 text-sm mt-2">{error}</p>
//             )}
//           </div>
//         </form>

//         {/* Image Upload Section */}
//         <div className="mt-6 flex items-center gap-4">
//           <label className="flex items-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-black transition-colors">
//             <svg
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               className="text-gray-600"
//             >
//               <path
//                 d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 fill="none"
//               />
//               <path
//                 d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M21 15L16 10L5 21"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <span className="text-gray-600">Add image to search</span>
//             <input
//               type="file"
//               id="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="hidden"
//             />
//           </label>
          
//           <button 
//             className={`px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors ${
//               !selectedImage || isImageSearching ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
//             }`}
//             onClick={handleImageSearch}
//             disabled={!selectedImage || isImageSearching}
//           >
//             {isImageSearching ? 'Searching...' : 'Search'}
//           </button>
//         </div>

//         {/* Preview uploaded image */}
//         {selectedImage && (
//           <div className="mt-4 relative inline-block">
//             <img
//               src={selectedImage}
//               alt="Upload preview"
//               className="max-h-32 rounded-lg object-contain"
//             />
//             <button
//               onClick={() => {
//                 setSelectedImage(null);
//                 setSimilarImages([]);
//               }}
//               className="absolute -top-2 -right-2 p-1 bg-black rounded-full text-white hover:bg-gray-800"
//             >
//               <svg width="16" height="16" viewBox="0 0 24 24">
//                 <path
//                   d="M18 6L6 18M6 6L18 18"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </button>
//           </div>
//         )}

//         {/* Similar Images Grid */}
//         {similarImages.length > 0 && (
//           <div className="mt-8">
//             <h3 className="text-lg font-medium mb-4">Similar Products</h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//               {similarImages.map((imageUrl, index) => (
//                 <div 
//                   key={index}
//                   className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-duration-300"
//                 >
//                   <div className="aspect-w-1 aspect-h-1">
//                     <img
//                       src={imageUrl}
//                       alt={`Similar product ${index + 1}`}
//                       className="w-full h-full object-cover rounded-lg"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
//                       }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Quick Search Section */}
//         <div className="flex items-center justify-center gap-4 font-normal mt-8">
//           <p>Quick Search:</p>
//           <ul className="flex list-none p-0 m-0">
//             <li className="mr-4 cursor-pointer hover:underline">Jackets</li>
//             <li className="mr-4 cursor-pointer hover:underline">Shirts</li>
//             <li className="mr-4 cursor-pointer hover:underline">Tops</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Search;