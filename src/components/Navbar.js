import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { connect } from 'react-redux';
const NavBar = ({email,logout}) => {
  const handleLogout=()=>{
    logout();
  }
  return (
    <nav className='navBar'>
      <div className='logo'>MindBloging</div>
      <ul>
        <li>
          <Link to="/allPosts">Blogs</Link>
        </li>
        <li>
          <Link to="/form">New Blog</Link>
        </li>
        

        <li>
          <Link to="/myblogs">My Blogs</Link>
        </li>

        <li>
          <Link to="/">Signup</Link>
        </li>
        {
          email && <><div className='logout' onClick={handleLogout} >Logout</div></>
        }{
          !email &&  <li><Link to="/login">Login</Link></li>
        }
      </ul>
    </nav>
  );
};



const mapStateToProps = (state) => {
    return {
      email: state.email,
    };
  };
  
  const mapsDispatchToProps=(Dispatch)=>{
    return {
      logout:()=>{
        Dispatch({type:"LOGOUT"});
      }
    } 
  }

  export default connect(mapStateToProps, mapsDispatchToProps)(NavBar);
  