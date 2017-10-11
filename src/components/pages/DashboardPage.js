import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';

import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import AddBookCta from '../ctas/AddBookCta';
import BookList from '../listing/BooksList';

import { fetchBooks } from '../../actions/books';
import { allBooksSelector } from '../../reducers/books';

class DashboardPage extends Component {
  state = {
    loading: true,
    success: false,
  };

  componentDidMount() {
    this.props
      .fetchBooks()
      .then(() => this.setState({ loading: false, success: true }));
  }

  render() {
    const { isConfirmed, books } = this.props;
    return (
      <Segment style={{ marginTop: 30 }}>
        <Grid divided relaxed stackable>
          <Grid.Row>
            <Grid.Column width={8}>
              <Grid.Row>
                <div>
                  {/* If user hasn't confirmed his email address we will display a message */}
                  {!isConfirmed && <ConfirmEmailMessage />}
                  <AddBookCta />
                </div>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={8}>
              <Grid.Row>
                <Grid.Column style={{ textAlign: 'center' }} width={16}>
                  <BookList books={books} />
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

DashboardPage.propTypes = {
  fetchBooks: PropTypes.func.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      goodreadsId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      pages: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

const mapStateToProps = state => ({
  isConfirmed: !!state.user.confirmed,
  // books: allBooksSelector(state),
  books: state.books,
});

export default connect(mapStateToProps, { fetchBooks })(DashboardPage);
