import React, { Component } from 'react';
import axios from 'axios';
import SearchForm from '../SearchForm/SearchForm';

axios.defaults.headers.common['Authorization'] =
  'Bearer 6dc027d8d708448cbd71c567f3505e15';

class ArticlesView extends Component {
  state = {
    articles: [],
    currentPage: 1,
    searchQuery: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchArticles();
    }
  }

  onChangeQuery = query => {
    this.setState({ searchQuery: query, currentPage: 1, articles: [] });
  };

  fetchArticles = () => {
    const { currentPage, searchQuery } = this.state;
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=5&page=${currentPage}`
      )
      .then(res => {
        this.setState(prevState => ({
          articles: [...prevState.articles, ...res.data.articles],
          currentPage: prevState.currentPage + 1,
        }));
      });
  };

  render() {
    const { articles } = this.state;
    return (
      <div>
        <h1>Articles</h1>
        <SearchForm onSubmit={this.onChangeQuery} />
        <ul>
          {articles.map(({ title, url }) => (
            <li key={title}>
              <a href={url}>{title}</a>
            </li>
          ))}
        </ul>
        <button type="button" onClick={this.fetchArticles}>
          Loading more
        </button>
      </div>
    );
  }
}

export default ArticlesView;
