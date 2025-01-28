import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Navbar from './components/Navbar.jsx';
import BottomNav from './components/BottomNav.jsx';
import CustomerHome from './components/CustomerHome.jsx';
import SellerHome from './components/SellerHome.jsx';
import Search from './components/Search.jsx';
import SearchedProducts from './components/SearchedProducts.jsx';

const App = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  }

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-16 pb-24 md:pb-16">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/seller" element={<SellerHome />} />
              <Route path="/women" element={<CustomerHome />} />
              <Route path="/men" element={<CustomerHome />} />
              <Route path="/kids" element={<CustomerHome />} />
              <Route path="/baby" element={<CustomerHome />} />
              <Route path="/search-results" element={<SearchedProducts />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
          <Search isOpen={isSearchOpen} onClose={handleSearchClose} />
          <BottomNav onSearchOpen={handleSearchOpen} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App; 