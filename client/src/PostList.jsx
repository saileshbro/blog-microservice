import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    const res = await Axios.get('http://localhost:4002/posts');
    setPosts(res.data);
  };
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        key={post.id}
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
      >
        <div className="card-body">
          <h5>{post.title}</h5>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
