"use client";

import { useState } from "react";
import { ArrowUpDown, ChevronDown, DollarSign, Euro, PoundSterling, Yen, TrendingUp, TrendingDown } from "lucide-react";

// Mock data for currency pairs
const currencyPairs = [
  { name: "EUR/USD", rate: 1.0850, change: 0.25, chart: "up" },
  { name: "GBP/USD", rate: 1.2700, change: -0.10, chart: "down" },
  { name: "USD/JPY", rate: 157.30, change: 0.45, chart: "up" },
  { name: "USD/ZAR", rate: 18.50, change: -0.30, chart: "down" },
];

// Mock chart data
const mockChartData = [
  { time: "09:00", value: 1.0820 },
  { time: "10:00", value: 1.0830 },
  { time: "11:00", value: 1.0845 },
  { time: "12:00", value: 1.0850 },
  { time: "13:00", value: 1.0860 },
];

export default function CreainyDashboard() {
  const [selectedPair, setSelectedPair] = useState(currencyPairs[0]);
  const [amount, setAmount] = useState("1000");

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Creainy</h1>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-gray-600" />
          <span className="text-gray-600">USD</span>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </div>
      </header>

      {/* Currency Pair Selector */}
      <div className="mb-6">
        <div className="relative">
          <select
            className="w-full p-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedPair.name}
            onChange={(e) => setSelectedPair(currencyPairs.find(pair => pair.name === e.target.value) || currencyPairs[0])}
          >
            {currencyPairs.map((pair) => (
              <option key={pair.name} value={pair.name}>
                {pair.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Exchange Rate Display */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Euro className="w-8 h-8 text-blue-600" />
            <span className="text-3xl font-bold text-gray-800">{selectedPair.rate.toFixed(4)}</span>
          </div>
          <div className={`flex items-center space-x-1 ${selectedPair.change >= 0 ? "text-green-500" : "text-red-500"}`}>
            {selectedPair.chart === "up" ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
            <span className="font-medium">{Math.abs(selectedPair.change)}%</span>
          </div>
        </div>
        <p className="text-gray-500">1 EUR = {selectedPair.rate.toFixed(4)} USD</p>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="h-32 flex items-end space-x-2">
          {mockChartData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className={`w-full ${selectedPair.chart === "up" ? "bg-green-200" : "bg-red-200"}`}
                style={{ height: `${(data.value - 1.08) * 1000}%` }}
              ></div>
              <span className="text-xs text-gray-400 mt-1">{data.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Amount Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
        <div className="relative">
          <input
            type="number"
            className="w-full p-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-sm transition-colors">
          Buy
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg shadow-sm transition-colors">
          Sell
        </button>
      </div>
    </div>
  );
}