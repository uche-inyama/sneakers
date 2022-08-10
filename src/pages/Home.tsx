import Login from './Login'
import Store from './Store'

const Home = () => {
  const token = localStorage.getItem('token')
  if(!token) {
    return <Login />
  }else {
    return <Store />
  }
};

export default Home;