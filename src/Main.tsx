import { useState } from 'react';
import { Box } from '@mui/material';
import { Header } from './components/Layout/Header';
import { PostForm } from './components/Post/PostForm';
import { PostComponent } from './components/Post/Post';
import { DeleteModal } from './components/Modals/DeleteModal';
import { EditModal } from './components/Modals/EditModal';
import { usePosts } from './hooks/usePosts';
import { Post } from './types/post';

export const Main = ({ username, onSignout }: { username: string; onSignout: () => void }) => {
  const { posts, addPost, editPost, removePost } = usePosts();
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  const handleCreatePost = (title: string, content: string) => {
    addPost({ username, title, content });
  };

  const handleEditPost = (title: string, content: string) => {
    if (postToEdit) {
      editPost(postToEdit.id, { title, content });
      setPostToEdit(null);
    }
  };

  const handleDeletePost = () => {
    if (postToDelete) {
      removePost(postToDelete.id);
      setPostToDelete(null);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Header username={username} onSignout={onSignout} />
      <PostForm username={username} onSubmit={handleCreatePost} />
      {posts.map((post) => (
        <PostComponent
          key={post.id}
          post={post}
          currentUser={username}
          onEdit={setPostToEdit}
          onDelete={setPostToDelete}
        />
      ))}
      <DeleteModal
        open={!!postToDelete}
        onClose={() => setPostToDelete(null)}
        onConfirm={handleDeletePost}
      />
      <EditModal
        open={!!postToEdit}
        onClose={() => setPostToEdit(null)}
        post={postToEdit}
        onSubmit={handleEditPost}
      />
    </Box>
  );
};