import Login from './Login'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Login />
      <Link to="/register">Sign up</Link>
    </div>
  )
};

export default Home;