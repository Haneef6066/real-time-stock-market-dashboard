import React, { useEffect, useState } from 'react';

const StockDashboard = () => {
  const [stockData, setStockData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [ws, setWs] = useState(null); // Store WebSocket instance

  const connectWebSocket = () => {
    const websocket = new WebSocket('ws://localhost:8080'); // Replace with your WebSocket URL

    websocket.onopen = () => {
      console.log('WebSocket Connected');
      setError(null); // Clear any previous error
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStockData((prevData) => [...prevData, data]);
    };

    websocket.onerror = (error) => {
      setError('WebSocket Error: Unable to connect.');
      console.error('WebSocket Error: ', error);
    };

    websocket.onclose = () => {
      setError('WebSocket Disconnected. Attempting to reconnect...');
      console.log('WebSocket Disconnected');
      setTimeout(connectWebSocket, 3000); // Reconnect after 3 seconds
    };

    setWs(websocket);
  };

  useEffect(() => {
    connectWebSocket(); // Connect when the component mounts

    return () => {
      if (ws) {
        ws.close(); // Clean up WebSocket on component unmount
      }
    };
  }, []);

  const filteredStocks = stockData.filter((stock) =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Real-Time Stock Prices</h1>
      <input
        type="text"
        placeholder="Search stock symbol"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {filteredStocks.map((stock, index) => (
          <li key={index}>
            {stock.symbol}: ${stock.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockDashboard;
