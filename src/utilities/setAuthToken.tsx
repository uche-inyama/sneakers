import axios from 'axios';

const setAuthToken = (token: any) => {
  console.log(token)
  if(token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  }else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
}

export default setAuthToken;