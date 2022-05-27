import React, { Component } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import newsApi from '../../services/news-api';

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
    const options = {
      searchQuery,
      currentPage,
    };

    newsApi.fetchArticles(options).then(articles => {
      this.setState(prevState => ({
        articles: [...prevState.articles, ...articles],
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
