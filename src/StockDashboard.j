// src/StockDashboard.js
import React, { useState, useEffect } from 'react';
import StockTable from './StockTable';
import _ from 'lodash'; // Import lodash for debouncing

const StockDashboard = () => {
  const [stockData, setStockData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  // WebSocket connection
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080'); // Change to your WebSocket URL

    ws.onopen = () => {
      console.log('WebSocket Connected');
    };

    const handleMessage = _.debounce((event) => {
      const data = JSON.parse(event.data);
      setStockData((prevData) => [...prevData, data]);
    }, 1000); // Debounce updates by 1 second

    ws.onmessage = handleMessage;

    ws.onerror = (error) => {
      setError('Error: Unable to connect to WebSocket.');
      console.error(error);
    };

    ws.onclose = () => {
      setError('Connection closed.');
    };

    return () => {
      ws.close();
      handleMessage.cancel(); // Cancel debouncing when component unmounts
    };
  }, []);

  // Filter stocks based on user input
  const filteredStocks = stockData.filter((stock) =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Real-Time Stock Prices</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Search stock symbol"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <StockTable stockData={filteredStocks} />
    </div>
  );
};

export default StockDashboard;
