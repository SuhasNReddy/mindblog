import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import  '../styles/login.css';

const LoginPage = (props) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const Navigate = useNavigate();

  const handleLogin = () => {

    fetch('http://localhost:8000/users')
      .then((response) => response.json())
      .then((data) => {
        const user = data.find((u) => u.email === email);
        if (user && user.password === password) {
          setLoggedIn(true);
          console.log('SuccessFull Login');
          alert('Login Successful');
          props.signUp(email);
          Navigate('/allPosts');
          
        } else {
          console.log('Failed Login');
          setLoggedIn(false);
          alert('Invalid email or password');
        }
      })

    
  };

  useEffect(() => {
    // Redirect or perform actions upon successful login
    if (loggedIn) {
      console.log('User logged in!');
    }
  }, [loggedIn]);

  return (
    <div className="login">
    <h2>Login</h2>
    {loggedIn ? (
      <p>You are already logged in.</p>
    ) : (
      <form >
        <label>
          email:
          <input
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
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
        <button type="button"  onClick={handleLogin}>
          Login
        </button>
      </form>
    )}
  </div>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.email,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (email) => {
      dispatch({ type: "LOGIN", payload: email });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
