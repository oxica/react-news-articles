import React, { Component } from 'react';
import axios from 'axios';
import SearchForm from '../SearchForm/SearchForm';

axios.defaults.headers.common['Authorization'] =
  'Bearer 6dc027d8d708448cbd71c567f3505e15';

class ArticlesView extends Component {
  state = {
    articles: [],
  };

  onChangeQuery = query => {
    axios.get(`https://newsapi.org/v2/everything?q=${query}`).then(res => {
      this.setState({
        articles: res.data.articles,
      });
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
      </div>
    );
  }
}

export default ArticlesView;
