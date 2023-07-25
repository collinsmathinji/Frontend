import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from 'react-router-dom'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div className="Main-cont">
      <div className="Emergency">
        <h1>Diabetic emergency procedures:</h1>
        <h3>High blood sugar? Call 999.</h3>
        <h3>Low blood sugar?</h3>
        <ul>
          <li>Sit them down.</li>
          <li>Give 3 jelly babies/150ml fruit juice.</li>
          <li>No improvement? Call 999</li>
        </ul>
      </div>
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <div className="container button">
      <button disabled={isLoading}>Log in</button>
      <p>Don't have an account?<Link to="/signup" className='navin'>Signup</Link></p>
      {error && <div className="error">{error}</div>}
      </div>
    </form>
  
    </div>
  )
}

export default Login