// craco.config.js
module.exports = {
  webpack: {
    configure: {
      resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
          '@mui/material': '@mui/material/esm', // or adjust as necessary
        },
      },
    },
  },
};
