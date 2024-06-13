// AnalyzeComponent.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './AnalyzeComponent.css';

function AnalyzeComponent() {
  const location = useLocation();
  const { data } = location.state || {};

  if (!data) {
    return <div>No data available</div>;
  }

  const renderTable = (tableData) => {
    const parsedTable = JSON.parse(tableData);
    if (parsedTable.length === 0) return null;

    const headers = Object.keys(parsedTable[0]);

    return (
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {parsedTable.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, cellIndex) => (
                <td key={cellIndex}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <h1>JSON to Table</h1>
      {Object.keys(data).map((pageIndex) => (
        <div key={pageIndex}>
          <h1 style={{ textAlign: 'center' }}>Page No: {pageIndex}</h1>
          {Object.keys(data[pageIndex]['table']).map((tableIndex) => (
            <div key={tableIndex}>
              <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Table: {parseInt(tableIndex) + 1}</h2>
              {renderTable(data[pageIndex]['table'][tableIndex]['table'])}
            </div>
          ))}
        </div>
      ))}
      <div style={{ marginBottom: '50px' }}></div>
    </>
  );
}

export default AnalyzeComponent;
