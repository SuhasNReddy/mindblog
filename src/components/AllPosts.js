import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import '../styles/allblogs.css';

function Abc({ email }) {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    if (email) {
      fetch('http://localhost:8000/posts')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setPosts(data);
        });
    }
  }, [email]);

  return (
    <div className="allposts">
      {email ? (
        <div>
          {posts.map((post) => (
            <div className="singleblog" key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="nologin">Please login to view posts</p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    email: state.email,
  };
};

export default connect(mapStateToProps, null)(Abc);
