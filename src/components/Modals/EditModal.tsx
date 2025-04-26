import { useState } from 'react';
import { 
  Box, 
  Modal, 
  Paper, 
  IconButton, 
  Fade,
  Typography,
  Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { PostForm } from '../Post/PostForm';
import { Post } from '../../types/post';


const colors = {
  darkBlue: '#000080', 
  mediumBlue: '#0a2463',
  lightBlue: '#3e92cc',
  accentBlue: '#1c77c3',
  surfaceBlue: '#f5f9ff',
  darkText: '#1a1b25',
};

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  post: Post | null;
  onSubmit: (title: string, content: string) => void;
}

export const EditModal = ({ open, onClose, post, onSubmit }: EditModalProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <Modal 
      open={open} 
      onClose={onClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Paper
          elevation={24}
          onMouseMove={handleMouseMove}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', sm: '80%' },
            maxWidth: 600,
            borderRadius: 4,
            bgcolor: 'white',
            overflow: 'hidden',
            boxShadow: '0 15px 50px rgba(0,0,30,0.15), 0 5px 15px rgba(0,0,50,0.08)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 20px 60px rgba(0,0,30,0.18), 0 8px 25px rgba(0,0,50,0.12)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'linear-gradient(120deg, rgba(255,255,255,0.3), rgba(255,255,255,0) 70%)',
              opacity: 0.6,
              transform: `perspective(1000px) rotateX(${(mousePosition.y - 150) / 60}deg) rotateY(${(mousePosition.x - 300) / 60}deg) scale3d(0.98, 0.98, 0.98)`,
              pointerEvents: 'none',
              transition: 'transform 0.1s ease',
              zIndex: 1
            }
          }}
        >
          <Box sx={{ 
            position: 'absolute', 
            top: -130, 
            right: -130, 
            width: 260, 
            height: 260, 
            borderRadius: '50%', 
            background: `linear-gradient(135deg, ${colors.lightBlue}20 0%, ${colors.darkBlue}40 100%)`,
            opacity: 0.6,
            filter: 'blur(40px)',
            zIndex: 0 
          }} />
          
          <Box sx={{ 
            position: 'absolute', 
            bottom: -150, 
            left: -100,
            width: 300, 
            height: 300, 
            borderRadius: '50%', 
            background: `linear-gradient(135deg, ${colors.mediumBlue}20 0%, ${colors.darkBlue}40 100%)`,
            opacity: 0.5,
            filter: 'blur(60px)',
            zIndex: 0 
          }} />

          <Box
            sx={{
              p: 3,
              background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.mediumBlue} 100%)`,
              color: 'white',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '20px',
                backgroundImage: 'linear-gradient(to bottom right, transparent 49%, white 50%)',
                zIndex: 2
              }
            }}
          >
            <Avatar 
              sx={{ 
                width: 50, 
                height: 50, 
                mb: 1.5, 
                bgcolor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                boxShadow: `0 8px 20px rgba(0,0,0,0.2), 0 0 0 1px ${colors.darkBlue}30`,
                border: '3px solid rgba(255,255,255,0.1)'
              }}
            >
              <EditIcon fontSize="medium" />
            </Avatar>
            <Typography variant="h5" component="h2" fontWeight="bold" letterSpacing={0.5}>
              Edit Post
            </Typography>
            <Typography variant="subtitle2" fontWeight="light" sx={{ mt: 0.5, opacity: 0.9, letterSpacing: 0.5 }}>
              Make changes to your content
            </Typography>
            <IconButton
              sx={{ 
                position: 'absolute', 
                top: 12, 
                right: 12, 
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(5px)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.2)'
                }
              }}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ p: 3, position: 'relative', zIndex: 2 }}>
            {post && (
              <PostForm
                username={post.username}
                onSubmit={onSubmit}
                initialTitle={post.title}
                initialContent={post.content}
                isEdit
              />
            )}
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
};