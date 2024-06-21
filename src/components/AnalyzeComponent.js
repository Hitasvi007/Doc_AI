import React from 'react';
import { useLocation } from 'react-router-dom';
import './AnalyzeComponent.css';

function AnalyzeComponent() {
  const location = useLocation();
  const { data } = location.state || {};

  console.log('Data received in AnalyzeComponent:', data);

  if (!data) {
    return <div>No data available</div>;
  }

  const renderTable = (tableData) => {
    let parsedTable;

    try {
      parsedTable = JSON.parse(tableData);
      console.log('Parsed table data:', parsedTable); // Log parsed table data
    } catch (error) {
      console.error('Error parsing table data:', error);
      return <div>Error parsing table data</div>;
    }

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
          {data[pageIndex]['table'].length > 0 ? (
            data[pageIndex]['table'].map((table, tableIndex) => (
              <div key={tableIndex}>
                <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Table: {tableIndex + 1}</h2>
                {renderTable(JSON.stringify([table]))}
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center' }}>No tables found on this page</div>
          )}
        </div>
      ))}
      <div style={{ marginBottom: '50px' }}></div>
    </>
  );
}

export default AnalyzeComponent;
