import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaWallet } from 'react-icons/fa';

import usdt from '../../assets/images/usdt.jpg';

const CustomWallet = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for outside click

  const [selectedCoin, setSelectedCoin] = useState({
    name: 'USDT',
    amount: '0.00',
    img: usdt,
  });

  const coins = [
    { name: 'USDT', amount: '0.00', img: usdt },
    { name: 'BTC', amount: '0.00', img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
    { name: 'ETH', amount: '0.00', img: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex">
      {/* Dropdown Section */}
      <div ref={dropdownRef} className="relative w-[160px]">
        <div
          className="flex items-center bg-[#3A3A3A] text-white px-4 py-2.5 rounded-l-full gap-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <img src={selectedCoin.img} alt="coin" className="w-6 h-6 rounded-full" />
          <span className="text-sm font-bold">{selectedCoin.name} {selectedCoin.amount}</span>
          <FaChevronDown className={`text-sm transition-transform ml-auto ${open ? 'rotate-180' : ''}`} />
        </div>

        {open && (
          <div className="absolute left-0 top-full mt-1 bg-[#2b2b2b] shadow-lg rounded-lg w-40 z-10">
            {coins.map((coin, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 hover:bg-[#3A3A3A] cursor-pointer"
                onClick={() => {
                  setSelectedCoin(coin);
                  setOpen(false);
                }}
              >
                <img src={coin.img} alt="coin" className="w-6 h-6 rounded-full" />
                <span className="text-white text-sm">{coin.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Deposit Button */}
      <button className="bg-[#E6FF00] text-black font-bold px-5 py-2.5 rounded-r-full flex items-center gap-2">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6H4v12h16V6z" />
          <path d="M8 10h8" />
          <path d="M8 14h6" />
        </svg> */}
        <FaWallet/>
        Deposit
      </button>
    </div>
  );
};

export default CustomWallet;
