// const WebSocket = require('ws');

// // Create a WebSocket server on port 8080
// const wss = new WebSocket.Server({ port: 8080 });

// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   // Simulate sending stock data every second
//   const sendStockData = setInterval(() => {
//     const stockData = JSON.stringify({
//       symbol: 'AAPL',
//       price: (Math.random() * 1000).toFixed(2) // Simulated random stock price
//     });
//     ws.send(stockData);
//   }, 1000);

//   ws.on('close', () => {
//     clearInterval(sendStockData);  // Stop sending data when the client disconnects
//     console.log('Client disconnected');
//   });
// });

// console.log('WebSocket server is running on ws://localhost:8080');
// websocket-server/server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Simulate sending stock data every 2 seconds
  const sendStockData = () => {
    const stockData = {
      symbol: 'AAPL',
      price: (Math.random() * 100 + 100).toFixed(2), // Random price for testing
    };
    ws.send(JSON.stringify(stockData));
  };

  const intervalId = setInterval(sendStockData, 2000); // Send data every 2 seconds

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(intervalId); // Clear the interval on disconnect
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
