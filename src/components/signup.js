import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css';

const SignupPage = ({signUp}) => {
    const Navigate = useNavigate();
    const [error,setError] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }
  
    // Validate email format
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }
  
    // Validate password
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password should contain at least one number and one special character (!@#$%^&*)');
      return;
    }
  

    

    //check if the user already exists
    fetch('http://localhost:8000/users')
      .then((response) => response.json())
      .then((data) => {
        const user = data.find((u) => u.email === email);
        if (user) {
          setError('Username already exists');
         //not to store in json
        } else {
          //store in json
          fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Signup successful:', data);
              alert('Signup successful',data);
              signUp(email);
              Navigate('/login');
              
            })
            .catch((error) => {
              console.error('Signup failed:', error);
            });
        }
      }).catch((error) => {
        console.error('Signup failed:', error);
      })

    
      console.log('affaef')
    // Reset the form after signup
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className='signup'>
      <h2>Signup</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleSignup}>
          Signup
        </button>
      </form>
      {
        error && (
          <p>{error}</p>
        )
      }
    </div>
  );
};

const mapDispatchToProps =(Dispatch)=>{ 
    return{
        signUp:(email)=>{
            Dispatch({type:"LOGIN",payload:email})
        }
    }
}

export default connect(null,mapDispatchToProps)(SignupPage); 
