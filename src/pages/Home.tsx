import Login from './Login'
import Store from './Store'

const Home = () => {
  const token = localStorage.getItem('token')
  if(!token) {
    return (
      <div className="home">
        <Login />
      </div>
    )
  }else {
    return <Store />
  }
};

export default Home;