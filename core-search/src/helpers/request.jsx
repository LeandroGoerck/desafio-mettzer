import axios from 'axios';

const api = axios.create({
  // baseURL: `https://core.ac.uk:443/api-v2/search/%22search/data-providers%22?page=3&pageSize=10&apiKey=${process.env.REACT_APP_API_KEY}}`,
  baseURL: `https://core.ac.uk:443/api-v2/`,
});

export default api;