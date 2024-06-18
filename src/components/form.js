import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../styles/blogsform.css';

const Form5 = ({ email }) => {
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSignup = () => {
    // Check if the user is logged in (email exists)
    if (email) {
      // Validate title and body fields
      if (!title.trim()) {
        setError('Please enter a title for your blog.');
        return;
      }

      if (!body.trim()) {
        setError('Please enter content for your blog.');
        return;
      }

      // If valid, proceed with form submission
      fetch('http://localhost:8000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body, email }),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Data added successfully');
            alert('Data added successfully');
            // Reset form fields after successful submission
            setTitle('');
            setBody('');
            setError("");
          } else {
            throw new Error('Failed to add data');
          }
        })
        .catch((error) => {
          console.error('Data not added', error);
          setError('Failed to add data. Please try again later.');
        });
    } else {
      // If user is not logged in, show an error message
      setError('Please log in to submit the form.');
    }
  };

  return (
    <div className='blogsform'>
      {email && <h2>New Blog</h2>}
      {email ? (
        <form>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />
          <label>
            Body:
            <textarea
              rows={10}
              cols={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <br />
          <button type="button" onClick={handleSignup}>
            Submit
          </button>
        </form>
      ) : (
        <p className="nologin">Please login to view posts</p>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.email,
  };
};

export default connect(mapStateToProps, null)(Form5);
