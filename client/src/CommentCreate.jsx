import Axios from 'axios';
import React, { useState } from 'react';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    await Axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });
    setContent('');
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>New Comment</label>
        <div className="form-group">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
            type="text"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
