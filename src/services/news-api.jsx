import axios from 'axios';

axios.defaults.headers.common['Authorization'] =
  'Bearer 6dc027d8d708448cbd71c567f3505e15';

const fetchArticles = ({ searchQuery = '', currentPage = 1, pageSize = 5 }) => {
  return axios
    .get(
      `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=${pageSize}&page=${currentPage}`
    )
    .then(res => res.data.articles);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { fetchArticles };
