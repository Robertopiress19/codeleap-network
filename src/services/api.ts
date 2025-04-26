import axios from 'axios';
import { Post } from '../types/post';

const API_URL = 'https://dev.codeleap.co.uk/careers/';

export const getPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data.results;
};

export const createPost = async (post: Omit<Post, 'id' | 'created_datetime'>) => {
  const response = await axios.post(API_URL, post);
  return response.data;
};

export const updatePost = async (id: number, post: { title: string; content: string }) => {
  const response = await axios.patch(`${API_URL}${id}/`, post);
  return response.data;
};

export const deletePost = async (id: number) => {
  await axios.delete(`${API_URL}${id}/`);
};