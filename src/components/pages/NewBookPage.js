import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

import SearchBookForm from '../forms/SearchBookForm';
import BookForm from '../forms/BookForm';
import { fetchBook, addBook } from '../../actions/books';

class NewBookPage extends Component {
  state = {
    book: ''
  };

  onBookSelect = book => {
    this.props.fetchBook(book.goodreadsId, book.authorId)
      .then(() => this.setState({ book: this.props.book }));
  };

  submit = (data) => this.props.addBook(data)
      .then(() => this.props.history.push('/dashboard'));

  render() {
    return (
      <Segment>
        <h1>Add new book to your collection</h1>
        <SearchBookForm onBookSelect={this.onBookSelect} />
        { this.state.book && <BookForm submit={this.submit} book={this.state.book} />}
      </Segment>
    );
  }
}

NewBookPage.propTypes = {
  fetchBook: PropTypes.func.isRequired,
  book: PropTypes.arrayOf(
    PropTypes.shape({
      authors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      pages: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      averageRating: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
};

const mapStateToProps = state => ({
  book: state.books
});

export default connect(mapStateToProps, { fetchBook, addBook })(NewBookPage);
