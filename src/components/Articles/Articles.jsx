import React, { Component } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import newsApi from '../../services/news-api';

class ArticlesView extends Component {
  state = {
    articles: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
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
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });

    newsApi
      .fetchArticles(options)
      .then(articles => {
        this.setState(prevState => ({
          articles: [...prevState.articles, ...articles],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { articles, isLoading } = this.state;
    const shouldRenderLoadMoreButton = articles.length > 0 && !isLoading;
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

        {isLoading && <p>Loading...</p>}

        {shouldRenderLoadMoreButton && (
          <button type="button" onClick={this.fetchArticles}>
            Loading more
          </button>
        )}
      </div>
    );
  }
}

export default ArticlesView;
