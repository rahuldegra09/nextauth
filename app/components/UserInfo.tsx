'use client'
import React, { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react'
const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [cart, setCart] = useState<Array<{ name: string; price: number }>>([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (response.ok) {
          setSearchResults(data.data);
        } else {
          console.error('Failed to fetch data:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = async (e:any) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      // Do nothing if searchTerm is empty
      return;
    }

    try {
      const response = await fetch(`/api/products/search?query=${searchTerm.toString()}`);
      const data = await response.json();
      if (response.ok ) {
        setSearchResults(data.data);
      } else {
        console.error('Failed to fetch data:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };
  const removeItem = (indexToRemove:any) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };


  const handleFilter = async (e:any) => {
    e.preventDefault();
    if (priceFilter.trim() === '') {
      // Do nothing if searchTerm is empty
      return;
    }
    try {
      const response = await fetch(`/api/products/filter?query=${priceFilter.toString()}`);
      const data = await response.json();
      if (response.ok) {
        setSearchResults(data.data);
      } else {
        console.error('Failed to fetch data:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const addToCart = (product:any) => {
    // Add product to the cart
    setCart([...cart, product]);
  };

  const openCartModal = () => {
    setIsCartOpen(true);
  };

  const closeCartModal = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="container mx-auto p-4 bg-yellow-100">
      {/* ... (Previous code) */}
      <div className='flex gap-12'>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-900 rounded"
          />
          <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
            Search
          </button>
        </div>

        <div className="ml-6 flex items-center space-x-4">
          <input
            type="Number"
            placeholder="Filter by Price..."
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="p-2 border border-gray-900 rounded"
          />
          <button onClick={handleFilter} className="bg-green-500 text-white p-2 rounded">
            Filter
          </button>
        </div>
      </div>
      <div className="mt-4 bg-yellow-200">
        {/* Display your products here */}
        <div className="border  p-4 rounded shadow-md">
          <h1 className="text-cyan-900 text-2xl">Search Results:</h1>

          {searchResults.length > 0 ? (
            <div className="p-4 flex flex-wrap gap-12 ">
              {searchResults.map((product: any, index) => (
                <div className="outline bg-green-100 p-4" key={index}>
                  <h2>Name: {product.title}</h2>
                  <p>Price: {product.price}</p>
                  <button
                    onClick={() => addToCart({ name: product.title, price: product.price })}
                    className="bg-purple-500 text-white p-2 rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-red-700 text-xl'>No Product found <span className='text-sm text-yellow-600'>/Enter Correct Spelling (With exact characters)</span></p>
          )}
        </div>
      </div>




      <div className="fixed top-0 right-0 m-4 cursor-pointer" onClick={openCartModal}>
        <div className="bg-red-500 text-white p-2 rounded">
          Cart ({cart.length})
        </div>
      </div>
      <button onClick={() => signOut()} className='bg-red-500 text-white font-bold px-6 py-2 mt-3'>Logout</button>
      
      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            {cart.map((item: any, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <p>{item.name}</p>
                <p>₨.{item.price}</p>
                <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            {cart.length === 0 && <p>Your cart is empty.</p>}
            {cart.length > 0 && (
              <div className="flex justify-between items-center mt-4">
                <p className="font-bold">Total:</p>
                <p>₨.{getTotal()}</p>
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <button onClick={closeCartModal} className="bg-gray-400 text-white p-2 rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
