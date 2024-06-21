import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import Navbar from './Navbar.js';

function Details() {
  const location = useLocation();
  const { state } = location;
  const transactions = state?.transactions || [];

  return (
    <>
    < Navbar />
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Transactions for {transactions.length > 0 ? transactions[0].extra_param.request_user.user_name : ''}
      </Typography>
      <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap', marginBottom: 2 }}>
        <Box sx={{ display: 'inline-block', minWidth: '100%' }}>
          {/* Top horizontal scrollbar */}
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto', whiteSpace: 'wrap' }}>
        <Table sx={{ minWidth: 1500 }} aria-label="detailed table">
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Transaction Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>File URL</TableCell>
              <TableCell>Page No.</TableCell>
              <TableCell>Config File URL</TableCell>
              <TableCell>Coordinates</TableCell>
              <TableCell>Structure</TableCell>
              <TableCell>Extraction Type</TableCell>
              <TableCell>Detection Padding</TableCell>
              <TableCell>Long Image Extraction</TableCell>
              <TableCell>BB Padding</TableCell>
              <TableCell>EPS</TableCell>
              <TableCell>Upper Limit</TableCell>
              <TableCell>Lower Limit</TableCell>
              <TableCell>Column Width</TableCell>
              <TableCell>Aspect Ratio</TableCell>
              <TableCell>Long Image Padding</TableCell>
              <TableCell>Filter Threshold</TableCell>
              <TableCell>Callback URL</TableCell>
              <TableCell>Project</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.transaction_id}>
                <TableCell>{transaction.transaction_id}</TableCell>
                <TableCell>{transaction.transaction_type}</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell>
                  <a href={transaction.extra_param.file_url} target="_blank" rel="noopener noreferrer">
                    {transaction.extra_param.file_url}
                  </a>
                </TableCell>
                <TableCell>{transaction.extra_param.page_no}</TableCell>
                <TableCell>
                  <a href={transaction.extra_param.configfile_url} target="_blank" rel="noopener noreferrer">
                    {transaction.extra_param.configfile_url}
                  </a>
                </TableCell>
                <TableCell>{JSON.stringify(transaction.extra_param.coordinates)}</TableCell>
                <TableCell>{transaction.extra_param.stucture}</TableCell>
                <TableCell>{transaction.extra_param.extraction_type}</TableCell>
                <TableCell>{transaction.extra_param.detection_padding}</TableCell>
                <TableCell>{transaction.extra_param.long_img_extraction}</TableCell>
                <TableCell>{transaction.extra_param.bb_padding}</TableCell>
                <TableCell>{transaction.extra_param.eps}</TableCell>
                <TableCell>{transaction.extra_param.upper_lim}</TableCell>
                <TableCell>{transaction.extra_param.lower_lim}</TableCell>
                <TableCell>{transaction.extra_param.col_width}</TableCell>
                <TableCell>{transaction.extra_param.aspect_ratio}</TableCell>
                <TableCell>{transaction.extra_param.long_img_padding}</TableCell>
                <TableCell>{transaction.extra_param.filter_threshold}</TableCell>
                <TableCell>{transaction.extra_param.callback_url}</TableCell>
                <TableCell>{transaction.extra_param.request_user.project}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap', marginTop: 2 }}>
        <Box sx={{ display: 'inline-block', minWidth: '100%' }}>
          {/* Bottom horizontal scrollbar */}
        </Box>
      </Box>
    </Container>
    </>
  );
}

export default Details;
