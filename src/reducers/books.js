import { createSelector } from 'reselect';
import { FETCH_BOOK, FETCH_ALL_BOOKS } from '../constants/books';

export default function books(state = [], action = {}) {
  switch (action.type) {
    case FETCH_BOOK:
      return action.book;
    case FETCH_ALL_BOOKS:
      return [ ...action.books ];
    default:
      return state;
  }
}

// Selectors
export const bookSelector = state => state.books;

/*
*  createSelector is provided by reselectjs
*  we pass any number of arguments and each argument is the selector
*  and the last argument an actual new select that we compose from the other arguments
* */
export const allBooksSelector = createSelector(
  bookSelector,
  bookHash => Object.values(bookHash)
);