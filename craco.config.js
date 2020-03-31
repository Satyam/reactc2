const path = require('path');

module.exports = {
  webpack: {
    alias: {
      Components: path.resolve(__dirname, 'src/Components/'),
      Store: path.resolve(__dirname, 'src/Store/'),
      Utils: path.resolve(__dirname, 'src/Utils/'),
      'react-redux':
        process.env.NODE_ENV === 'development'
          ? 'react-redux/dist/react-redux.js'
          : 'react-redux/lib',
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^Components(.*)$': '<rootDir>/src/Components$1',
        '^Store(.*)$': '<rootDir>/src/Store$1',
        '^Utils(.*)$': '<rootDir>/src/Utils$1',
      },
    },
  },
};
