import { FETCH_BOOK, FETCH_ALL_BOOKS } from '../constants/books';
import api from '../api';

export const getBook = book => ({
  type: FETCH_BOOK,
  book
});

export const fetchAllBooks = books => ({
  type: FETCH_ALL_BOOKS,
  books
});

export const fetchBook = (bookId, authorId) => (dispatch) =>
  api.books.fetchBook(bookId, authorId)
    .then(res => {
      dispatch(getBook(res.book));
    });

export const addBook = book => () =>
  api.books.addBook(book)
    .then(res => res.book);

export const fetchBooks = () => dispatch =>
  api.books.fetchAllBooks()
    .then(books => dispatch(fetchAllBooks(books)));