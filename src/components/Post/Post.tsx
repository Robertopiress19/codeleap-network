import { useState } from 'react';
import { 
  Box, 
  Typography,  
  IconButton, 
  Avatar, 
  Tooltip, 
  Fade, 
  Menu,
  MenuItem,
  Chip
} from '@mui/material';
import { 
  MoreVert, 
  Edit, 
  Delete, 
  FavoriteBorder, 
  Favorite
} from '@mui/icons-material';
import { Post } from '../../types/post';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';

const colors = {
  darkBlue: '#000080',
  mediumBlue: '#0a2463',
  lightBlue: '#3e92cc',
  accentBlue: '#1c77c3',
  surfaceBlue: '#f5f9ff',
  darkText: '#1a1b25',
};

interface PostProps {
  post: Post;
  currentUser: string;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
}

export const PostComponent = ({ post, currentUser, onEdit, onDelete }: PostProps) => {
  const isOwner = post.username === currentUser;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [liked, setLiked] = useState(false);
  const open = Boolean(anchorEl);
  
  const getUsernameColor = (username: string) => {
    const colors = ['#1c77c3', '#9c27b0', '#e91e63', '#4caf50', '#ff9800', '#795548'];
    const charCode = username.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  const getInitial = (username: string) => {
    return username.charAt(0).toUpperCase();
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    onEdit(post);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete(post);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const formatTimeAgo = (date: Date) => {
    const timeAgo = formatDistanceToNow(date, { addSuffix: true });
    return timeAgo.replace('about ', '');
  };

  return (
    <Box
      sx={{
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '16px',
        p: 0,
        mb: 3,
        backgroundColor: 'white',
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
          transform: 'translateY(-2px)',
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          pb: 1.5,
          backgroundColor: isOwner ? `${colors.surfaceBlue}` : 'white',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            sx={{ 
              width: 38, 
              height: 38, 
              mr: 1.5, 
              bgcolor: getUsernameColor(post.username),
              fontWeight: 'bold',
            }}
          >
            {getInitial(post.username)}
          </Avatar>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mr: 1 }}>
                @{post.username}
              </Typography>
              {isOwner && (
                <Chip 
                  label="You" 
                  size="small" 
                  sx={{ 
                    height: 20, 
                    fontSize: '0.65rem', 
                    bgcolor: colors.darkBlue,
                    color: 'white',
                    fontWeight: 'bold'
                  }} 
                />
              )}
            </Box>
            <Typography variant="caption" color="text.secondary">
              {formatTimeAgo(new Date(post.created_datetime))}
            </Typography>
          </Box>
        </Box>
        
        {isOwner && (
          <div>
            <Tooltip title="Post options">
              <IconButton 
                onClick={handleMenuClick}
                size="small"
                sx={{ 
                  color: colors.darkText,
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
                }}
              >
                <MoreVert fontSize="small" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
              sx={{ 
                '& .MuiPaper-root': {
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(0,0,0,0.04)',
                  minWidth: 150,
                }
              }}
            >
              <MenuItem onClick={handleEdit} sx={{ py: 1.5 }}>
                <Edit fontSize="small" sx={{ mr: 1.5, color: colors.accentBlue }} />
                <Typography variant="body2">Edit</Typography>
              </MenuItem>
              <MenuItem onClick={handleDelete} sx={{ py: 1.5, color: '#d32f2f' }}>
                <Delete fontSize="small" sx={{ mr: 1.5 }} />
                <Typography variant="body2">Delete</Typography>
              </MenuItem>
            </Menu>
          </div>
        )}
      </Box>
      <Box sx={{ px: 3, pt: 2 }}>
        <Typography 
          variant="h6" 
          fontWeight="bold"
          sx={{ 
            color: colors.darkText,
            mb: 1,
            lineHeight: 1.3
          }}
        >
          {post.title}
        </Typography>
      </Box>
      <Box sx={{ p: 3, pt: 1 }}>
        <Box 
          sx={{ 
            color: 'rgba(0,0,0,0.75)',
            lineHeight: 1.6,
            '& p': { mt: 0, mb: 2 },
            '& strong': { fontWeight: 'bold' },
            '& em': { fontStyle: 'italic' },
            '& ul, & ol': { pl: 2, mb: 2 },
            '& li': { mb: 0.5 },
          }}
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          px: 2,
          py: 1.5,
          borderTop: '1px solid rgba(0,0,0,0.05)',
          bgcolor: 'rgba(0,0,0,0.01)',
        }}
      >
        <Tooltip title={liked ? "Unlike" : "Like"}>
          <IconButton 
            size="small" 
            onClick={handleLike}
            sx={{ 
              mr: 1, 
              color: liked ? '#f44336' : 'rgba(0,0,0,0.5)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
            }}
          >
            {liked ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
          </IconButton>
        </Tooltip>
        <Typography variant="caption" color="text.secondary" sx={{ mr: 3 }}>
          {liked ? '1' : '0'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
        </Typography>
      </Box>
    </Box>
  );
};