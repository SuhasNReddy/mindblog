import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const MyBlogs = ({ email }) => {
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        if (email) {
          const response = await fetch(`http://localhost:8000/posts?email=${email}`);
          if (response.ok) {
            const myBlogsData = await response.json();
            setMyBlogs(myBlogsData);
          } else {
            console.error('Failed to fetch my blogs.');
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMyBlogs();
  }, [email]); 

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8000/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setMyBlogs((prevBlogs) => prevBlogs.filter((post) => post.id !== postId));
        console.log('Blog post deleted successfully.');
      } else {
        console.error('Failed to delete blog post.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='allposts'>
      {email ? (
        <>
          <h2 style={{ textAlign: 'center' }}>My Blogs</h2>
          {myBlogs.map((post) => (
            <div className="singleblog" key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <button className="deleteButton" onClick={() => handleDelete(post.id)}>
                <FontAwesomeIcon icon={faTrash} /> 
              </button>
            </div>
          ))}
        </>
      ) : (
        <p className="nologin">Please login to view posts</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.email,
  };
};

export default connect(mapStateToProps, null)(MyBlogs);
