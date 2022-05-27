// 6dc027d8d708448cbd71c567f3505e15
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// https://newsapi.org/v2/everything?q=bitcoin&apiKey=6dc027d8d708448cbd71c567f3505e15

import React, { Component } from 'react';
import axios from 'axios';

class ArticlesView extends Component {
  state = {
    articles: [],
  };

  componentDidMount() {
    axios
      .get(
        'https://newsapi.org/v2/everything?q=bitcoin&apiKey=6dc027d8d708448cbd71c567f3505e15'
      )
      .then(res => {
        this.setState({
          articles: res.data.articles,
        });
      });
  }

  render() {
    const { articles } = this.state;
    return (
      <div>
        <h1>Articles</h1>
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
