import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignupPage from './components/signup';
import LoginPage from './components/login';
import AllPosts from './components/AllPosts';
import PostForm from './components/form';

import NavBar from './components/Navbar';
import MyBlogs from './components/MyBlogs'; 

function App() {
  
  return (
    <BrowserRouter>
    
      <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<SignupPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path="/allPosts" element={<AllPosts/>} />
        <Route path="/form" element={<PostForm/>} />
        {/* <Route path='/allOrders' element={<AllOrders />} />
        <Route path='/createOrder' element={<CreateOrder/>}
         /> */}

        <Route path='/myblogs' element={<MyBlogs/>} />
      </Routes>
      </div>
      
    </BrowserRouter>

  );
}

export default App;
