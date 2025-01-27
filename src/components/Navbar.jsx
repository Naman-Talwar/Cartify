import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react'; // Using a cart icon from lucide-react

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-5">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wider">
          <Link to="/" className="text-black no-underline">Cartify</Link>
        </div>

        {/* Navigation Links */}
        <ul className="text-xl uppercase flex justify-center flex-1 gap-20 list-none m-5 p-0">
          <li>
            <NavLink
              to="/women"
              className={({ isActive }) =>
                isActive
                  ? 'text-black font-bold px-2 py-1 rounded border-b-2'
                  : 'hover:underline'
              }
            >
              Women
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/men"
              className={({ isActive }) =>
                isActive
                  ? 'text-black font-bold px-2 py-1 rounded border-b-2'
                  : 'hover:underline'
              }
            >
              Men
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/kids"
              className={({ isActive }) =>
                isActive
                  ? 'text-black font-bold px-2 py-1 rounded border-b-2'
                  : 'hover:underline'
              }
            >
              Kids
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/baby"
              className={({ isActive }) =>
                isActive
                  ? 'text-black font-bold px-2 py-1 rounded border-b-2'
                  : 'hover:underline'
              }
            >
              Baby
            </NavLink>
          </li>
        </ul>

        {/* Cart Icon */}
        <div className="relative">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? 'text-indigo-900 font-bold px-2 py-1 rounded flex items-center'
                : 'text-black hover:underline flex items-center'
            }
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="ml-1">(0)</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;