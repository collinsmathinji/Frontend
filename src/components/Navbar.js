import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }
  const jina = user && user.email && user.email.includes('@') ? user.email : '';
  const name = jina.split('@')[0];
  
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Lets reduce diabetic deaths:</h1>
          <div>
          <h2>We safe guard your data  🎗️</h2>
        </div>
        </Link>
        
        <nav>
          {user && (
            <div className='loggedout'>
              <h2>Welcome:</h2>
              <h2 className='name'>{name}</h2>
              <button onClick={handleClick} className='navout'>Log out</button>
            </div>
          )}
          {!user && (
            <div className='navincon'>
              <Link to="/login" className='navin'>Login</Link>
              <Link to="/signup" className='navin'>Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar