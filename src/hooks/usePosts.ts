import { useState, useEffect } from 'react';
import { getPosts, createPost, updatePost, deletePost } from '../services/api';
import { Post, CreatePost } from '../types/post';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (post: CreatePost) => {
    try {
      await createPost(post);
      await fetchPosts();
    } catch (err) {
      setError('Failed to create post');
    }
  };

  const editPost = async (id: number, post: { title: string; content: string }) => {
    try {
      await updatePost(id, post);
      await fetchPosts();
    } catch (err) {
      setError('Failed to update post');
    }
  };

  const removePost = async (id: number) => {
    try {
      await deletePost(id);
      await fetchPosts();
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error, addPost, editPost, removePost, fetchPosts };
};