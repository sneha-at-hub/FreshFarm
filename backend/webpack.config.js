const path = require('path');

module.exports = {
  // Other webpack configurations...
  
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify')
    }
  }
};
