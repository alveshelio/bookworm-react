import React from 'react';
import PropTypes from 'prop-types';
import { List, Rating, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const BookList = ({ books }) => {
  return (
    <List divided relaxed floated='left'>
      {books.length > 0 ?
        books.map(book => (
          <List.Item key={book._id}>
            <Image floated='left' size='mini' src={book.cover} />
            <List.Content style={{ float: 'left' }}>
              <List.Header style={{ textAlign: 'left' }}>
                <Link to={book.link}>{book.title}</Link> -
                <Rating rating={book.averageRating} maxRating='5' />
              </List.Header>
            </List.Content>
          </List.Item>)) : <h1>No Books added yet</h1>}
    </List>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      goodreadsId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      pages: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default BookList;
