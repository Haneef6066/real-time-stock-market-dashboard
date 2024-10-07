// src/StockTable.js
import React from 'react';

const StockTable = ({ stockData }) => {
  return (
    <table className="stock-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Price</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        {stockData.map((stock, index) => (
          <tr key={index}>
            <td>{stock.symbol}</td>
            <td>${stock.price}</td>
            <td>{stock.change}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StockTable;
