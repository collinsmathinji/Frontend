import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Link } from 'react-router-dom'
const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
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
      <button disabled={isLoading}>Sign up</button>
      <p>Have an account?
              <Link to="/login" className='navin'>Login</Link></p>
      {error && <div className="error">{error}</div>}
      </div>
    </form>
  )
}

export default Signup