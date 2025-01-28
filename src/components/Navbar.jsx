import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';

const Navbar = ({ cartItemsCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl md:text-2xl font-bold tracking-wider text-black no-underline">
              Cartify
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              <NavLink
                to="/women"
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium ${
                    isActive ? 'text-black border-b-2 border-black' : 'text-gray-600 hover:text-black'
                  }`
                }
              >
                Women
              </NavLink>
              <NavLink
                to="/men"
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium ${
                    isActive ? 'text-black border-b-2 border-black' : 'text-gray-600 hover:text-black'
                  }`
                }
              >
                Men
              </NavLink>
              <NavLink
                to="/kids"
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium ${
                    isActive ? 'text-black border-b-2 border-black' : 'text-gray-600 hover:text-black'
                  }`
                }
              >
                Kids
              </NavLink>
              <NavLink
                to="/baby"
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium ${
                    isActive ? 'text-black border-b-2 border-black' : 'text-gray-600 hover:text-black'
                  }`
                }
              >
                Baby
              </NavLink>
            </div>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center">
            <NavLink
              to="/cart"
              className="text-gray-600 hover:text-black p-2 relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </NavLink>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden ml-2 p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink
                to="/women"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'text-black bg-gray-100' : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Women
              </NavLink>
              <NavLink
                to="/men"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'text-black bg-gray-100' : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Men
              </NavLink>
              <NavLink
                to="/kids"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'text-black bg-gray-100' : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Kids
              </NavLink>
              <NavLink
                to="/baby"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'text-black bg-gray-100' : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Baby
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;