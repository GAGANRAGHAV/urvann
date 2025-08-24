// Application-wide configuration values
const config = {
  // Pagination defaults
  pagination: {
    defaultPage: 1,
    defaultLimit: 12
  },
  
  // Sorting defaults
  sorting: {
    defaultField: 'name',
    defaultDirection: 1 // 1 for ascending, -1 for descending
  }
};

module.exports = config;
