import axios from 'axios';

export default (token = null) => {
  if (token) {
    axios.post('/api/users/fetch_user', { token });
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};
