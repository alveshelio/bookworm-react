import axios from 'axios';

export default {
  user: {
    login: credentials =>
      axios.post('/api/auth', { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post('/api/users', { user }).then(res => res.data.user),
    confirm: token =>
      axios.post('/api/auth/confirmation', { token }).then(res => res.data),
    resetPasswordRequest: email =>
      axios.post('/api/auth/reset_password_request', { email }),
    validateToken: token => axios.post('/api/auth/validate_token', { token }),
    resetPassword: data => axios.post('/api/auth/reset_password', { data }),
  },
  books: {
    fetchBook: (bookId, authorId) =>
      axios.post(`/api/books/${bookId}/${authorId}`)
        .then(res => res.data),

    addBook: book =>
      axios.post('/api/books/new', { book })
        .then(res => res.data),

    fetchAllBooks: () => axios.get('/api/books/all')
      .then(res => res.data.books)
  }
};

