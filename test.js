import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useLocation } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import * as XLSX from 'xlsx'; 
import Navbar from './Navbar';

function Analyze() {
  const location = useLocation();
  const { data } = location.state || {};

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleExportTables = () => {
    if (!data) return;

    Object.keys(data).forEach(pageIndex => {
      const pageData = data[pageIndex];
      const workbook = XLSX.utils.book_new();

      Object.keys(pageData.table).forEach(tableIndex => {
        const tableData = pageData.table[tableIndex].table;
        const parsedTable = JSON.parse(tableData);
        const worksheet = XLSX.utils.json_to_sheet(parsedTable);
        XLSX.utils.book_append_sheet(workbook, worksheet, `Table_${parseInt(tableIndex) + 1}`);
      });

      XLSX.writeFile(workbook, `Page_${pageIndex}_Tables.xlsx`);
    });
  };

  if (!data) {
    return <div>No data available</div>;
  }

  // Helper function to render each section
  const renderSection = (section, sectionName) => (
    <>
      {Array.isArray(section) && section.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom>
            {sectionName}
          </Typography>
          <ul>
            {section.map((item, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                {item.text && (
                  <Typography variant="body1" gutterBottom>
                    {item.text}
                  </Typography>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );

  // Function to render table data
  const renderTable = (tableData) => {
    if (!tableData) return null; // Handle cases where tableData is undefined or null
  
    let parsedTable;
    try {
      parsedTable = JSON.parse(tableData);
    } catch (error) {
      console.error('Error parsing table data:', error);
      return null; // Handle JSON parse error gracefully
    }
  
    if (!Array.isArray(parsedTable) || parsedTable.length === 0) {
      return null; // Handle cases where parsedTable is not an array or empty
    }
  
    const headers = Object.keys(parsedTable[0]);
  
    return (
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {parsedTable.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, cellIndex) => (
                <td key={cellIndex} style={{ border: '1px solid black', padding: '8px' }}>
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  

  return (
    <>
    {/* <Navbar/> */}
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              DocumentAI
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {/* <MenuItem onClick={handleCloseNavMenu} component={Link} to="/analyze/table">
                  <Typography textAlign="center">Table</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/analyze/text">
                  <Typography textAlign="center">Text</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/analyze/list">
                  <Typography textAlign="center">List</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/analyze/image">
                  <Typography textAlign="center">Image</Typography>
                </MenuItem> */}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              DocumentAI
            </Typography>
            {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to="/analyze/table">
                Table
              </Button>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to="/analyze/text">
                Text
              </Button>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to="/analyze/list">
                List
              </Button>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to="/analyze/image">
                Image
              </Button>
            </Box> */}
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="xl" style={{ marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Analyzed Data
        </Typography>

        <Button variant="contained" color="primary" onClick={handleExportTables}>
          Export Tables to Excel
        </Button>

        {Object.keys(data).map((pageIndex) => (
          <div key={pageIndex}>
            <Typography variant="h4" style={{ textAlign: 'center' }}>
              Page No: {pageIndex}
            </Typography>
            {renderSection(data[pageIndex].text, 'Text')}
            {renderSection(data[pageIndex].title, 'Title')}
            {Object.keys(data[pageIndex].table).map((tableIndex) => (
              <div key={tableIndex}>
                <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '10px' }}>
                  Table: {parseInt(tableIndex) + 1}
                </Typography>
                {renderTable(data[pageIndex].table[tableIndex].table)}
              </div>
            ))}
            {renderSection(data[pageIndex].list, 'List')}
            {renderSection(data[pageIndex].figure, 'Figure')}
          </div>
        ))}
        <div style={{ marginBottom: '50px' }}></div>
      </Container>
    </>
  );
}

export default Analyze;
