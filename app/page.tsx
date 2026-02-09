"use client";
import React, { useState } from 'react';

export default function TipCalculator() {
  const [bill, setBill] = useState<number>(0);
  const [tipPercent, setTipPercent] = useState<number>(5); 
  const [numPeople, setNumPeople] = useState<number>(1);
  const [isSplit, setIsSplit] = useState<boolean>(true);
  
  const [displayTip, setDisplayTip] = useState<number>(0);
  const [displayTotal, setDisplayTotal] = useState<number>(0);

  const calculate = () => {
    const totalTip = bill * (tipPercent / 100);
    const totalWithTip = bill + totalTip;
    const people = isSplit && numPeople > 0 ? numPeople : 1;

    setDisplayTip(totalTip / people);
    setDisplayTotal(totalWithTip / people);
  };

  const reset = () => {
    setBill(0);
    setTipPercent(5);
    setNumPeople(1);
    setDisplayTip(0);
    setDisplayTotal(0);
  };

  return (
    <div className="min-h-screen bg-[#DDE7FF] flex flex-col items-center justify-center p-4 font-sans">
      <h1 className="bg-white px-12 py-3 rounded-lg shadow-sm mb-8 text-2xl font-bold text-gray-700">
        My Tip Calculator
      </h1>

      <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-w-4xl w-full border border-gray-100">
        {/* ฝั่งซ้าย: Input */}
        <div className="p-10 flex-1">
          <div className="mb-6">
            <label className="block text-gray-500 font-bold mb-2">Bill Amount</label>
            <input 
              type="number" 
              value={bill || ''} 
              onChange={(e) => setBill(Number(e.target.value))}
              className="w-full bg-slate-50 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
              placeholder="0"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-500 font-bold mb-2">Tip Percentage</label>
            <div className="flex">
              <button 
                className="px-10 py-3 rounded-xl bg-[#4D47E5] text-white font-bold shadow-lg"
              >
                5%
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={isSplit} 
                onChange={(e) => setIsSplit(e.target.checked)}
                className="w-5 h-5 accent-[#4D47E5]"
              />
              <span className="text-gray-500 font-bold">Split the bill</span>
            </label>
          </div>

          {isSplit && (
            <div className="mb-8">
              <label className="block text-gray-500 font-bold mb-2">Number of People</label>
              <input 
                type="number" 
                value={numPeople} 
                onChange={(e) => setNumPeople(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          )}

          <button 
            onClick={calculate}
            className="w-full py-4 border-2 border-indigo-600 text-indigo-600 font-black rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
          >
            Calculate
          </button>
        </div>

        {/* ฝั่งขวา: Display */}
        <div className="bg-[#B2A4FF] p-10 flex-1 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl flex justify-between items-center shadow-md">
              <span className="text-gray-400 font-bold">Tip / person</span>
              <span className="text-3xl font-black text-gray-800">${displayTip.toFixed(2)}</span>
            </div>
            <div className="bg-white p-6 rounded-2xl flex justify-between items-center shadow-md">
              <span className="text-gray-400 font-bold">Total / person</span>
              <span className="text-3xl font-black text-gray-800">${displayTotal.toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={reset}
            className="w-full bg-white py-4 text-indigo-600 font-black rounded-xl shadow-lg hover:bg-gray-50 mt-8"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}