import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Dropdown } from 'semantic-ui-react';

class SearchBookForm extends Component {
  state = {
    query: '',
    loading: false,
    options: [],
    books: {}
  };

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({
      query: data
    });
    this.timer = setTimeout(this.fetchOptions, 100);
  };

  fetchOptions = () => {
    if (!this.state.query) return;
    this.setState({ loading: true });
    axios.get(`/api/books/search?q=${this.state.query}`)
      .then(res => res.data.books)
      .then(books => {
        const options = [];
        const bookHash = {};
        books.forEach(book => {
          bookHash[ book.goodreadsId ] = book;
          options.push({
            image: book.covers[ 0 ],
            key: book.goodreadsId,
            value: book.goodreadsId,
            text: `${book.title} by ${book.authors}`,
          });
        });
        this.setState({ loading: false, options, books: bookHash });
      });
  };

  onChange = (e, data) => {
    this.setState({ query: data.value });
    this.props.onBookSelect(this.state.books[ data.value ]);
  };

  render() {
    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder='Search for a book by title'
          onSearchChange={this.onSearchChange}
          options={this.state.options}
          loading={this.state.loading}
          onChange={this.onChange}
        />
      </Form>
    );
  }
}

SearchBookForm.propTypes = {
  onBookSelect: PropTypes.func.isRequired,
};

export default SearchBookForm;