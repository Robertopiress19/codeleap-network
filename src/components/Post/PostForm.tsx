import { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  IconButton,
  CircularProgress,
  InputAdornment,
  Collapse
} from '@mui/material';
import {
  Send,
  FormatBold,
  FormatItalic,
  FormatListBulleted
} from '@mui/icons-material';

const colors = {
  darkBlue: '#000080',
  mediumBlue: '#0a2463',
  lightBlue: '#3e92cc',
  accentBlue: '#1c77c3',
  surfaceBlue: '#f5f9ff',
  darkText: '#1a1b25',
};

interface PostFormProps {
  username: string;
  onSubmit: (title: string, content: string) => void;
  initialTitle?: string;
  initialContent?: string;
  isEdit?: boolean;
}

export const PostForm = ({
  username,
  onSubmit,
  initialTitle = '',
  initialContent = '',
  isEdit = false,
}: PostFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expanded, setExpanded] = useState(!!isEdit);
  const [titleCharCount, setTitleCharCount] = useState(initialTitle.length);
  const [contentCharCount, setContentCharCount] = useState(initialContent.length);

  const contentRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
    setTitleCharCount(initialTitle.length);
    setContentCharCount(initialContent.length);
  }, [initialTitle, initialContent]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleCharCount(e.target.value.length);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    setContentCharCount(e.target.value.length);
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit(title, content);
      if (!isEdit) {
        setTitle('');
        setContent('');
        setTitleCharCount(0);
        setContentCharCount(0);
        setExpanded(false);
      }
      setIsSubmitting(false);
    }, 500);
  };

  const getInitial = (username: string) => username.charAt(0).toUpperCase();

  const getUsernameColor = (username: string) => {
    const colors = ['#1c77c3', '#9c27b0', '#e91e63', '#4caf50', '#ff9800', '#795548'];
    const charCode = username.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  const applyFormat = (type: 'bold' | 'italic' | 'list') => {
    const input = contentRef.current;
    if (!input) return;

    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;
    const selected = content.substring(start, end);
    let formatted = selected;

    if (type === 'bold') formatted = `**${selected}**`;
    if (type === 'italic') formatted = `*${selected}*`;
    if (type === 'list') formatted = `- ${selected}`;

    const newContent = content.slice(0, start) + formatted + content.slice(end);
    setContent(newContent);
    setContentCharCount(newContent.length);
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start, start + formatted.length);
    }, 0);
  };

  return (
    <Box
      sx={{
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '16px',
        p: 0,
        mb: 4,
        backgroundColor: 'white',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: expanded ? '1px solid rgba(0,0,0,0.05)' : 'none',
          bgcolor: isEdit ? colors.surfaceBlue : 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              width: 38,
              height: 38,
              mr: 1.5,
              bgcolor: getUsernameColor(username),
              fontWeight: 'bold'
            }}
          >
            {getInitial(username)}
          </Avatar>
          <Typography variant="subtitle1" fontWeight="medium">
            {isEdit ? 'Edit post' : "What's on your mind?"}
          </Typography>
        </Box>
      </Box>

      {/* Título */}
      <Box sx={{ px: 2, py: expanded ? 2 : 1 }}>
        <TextField
          fullWidth
          placeholder={isEdit ? "Edit title..." : "Write a title..."}
          value={title}
          onChange={handleTitleChange}
          variant="standard"
          autoFocus={isEdit}
          InputProps={{
            disableUnderline: !expanded,
            endAdornment: expanded && (
              <InputAdornment position="end">
                <Typography
                  variant="caption"
                  color={titleCharCount > 80 ? "error" : "text.secondary"}
                >
                  {titleCharCount}/100
                </Typography>
              </InputAdornment>
            ),
            sx: {
              fontSize: '1.1rem',
              fontWeight: 'medium',
              p: expanded ? 1 : 0,
              '&:hover': { cursor: expanded ? 'text' : 'pointer' },
            }
          }}
          onClick={() => !expanded && setExpanded(true)}
          onFocus={() => !expanded && setExpanded(true)}
          sx={{ mb: 1 }}
        />
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ p: 2, pt: 0 }}>
          <TextField
            fullWidth
            multiline
            inputRef={contentRef}
            rows={4}
            placeholder="Write your content here..."
            value={content}
            onChange={handleContentChange}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ position: 'absolute', right: 8, bottom: 8 }}>
                  <Typography
                    variant="caption"
                    color={contentCharCount > 300 ? "error" : "text.secondary"}
                  >
                    {contentCharCount}/500
                  </Typography>
                </InputAdornment>
              ),
              sx: {
                backgroundColor: 'rgba(0,0,0,0.01)',
                borderRadius: 2,
                fontSize: '0.95rem',
                p: 1,
              }
            }}
            sx={{ mb: 2 }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
              pb: 2,
              borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            <Box>
              <IconButton size="small" onClick={() => applyFormat('bold')} sx={{ color: colors.darkText, mr: 0.5 }}>
                <FormatBold fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => applyFormat('italic')} sx={{ color: colors.darkText, mr: 0.5 }}>
                <FormatItalic fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => applyFormat('list')} sx={{ color: colors.darkText, mr: 0.5 }}>
                <FormatListBulleted fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            {!isEdit && (
              <Button
                variant="outlined"
                onClick={() => setExpanded(false)}
                disabled={isSubmitting}
                sx={{
                  textTransform: 'none',
                  borderRadius: 6,
                  px: 3,
                  borderColor: 'rgba(0,0,0,0.12)',
                  color: colors.darkText,
                  '&:hover': {
                    borderColor: 'rgba(0,0,0,0.3)',
                    backgroundColor: 'rgba(0,0,0,0.02)'
                  }
                }}
              >
                Cancel
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!title.trim() || !content.trim() || isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Send />}
              sx={{
                textTransform: 'none',
                borderRadius: 6,
                px: 3,
                backgroundColor: colors.darkBlue,
                backgroundImage: `linear-gradient(135deg, ${colors.mediumBlue} 0%, ${colors.darkBlue} 100%)`,
                boxShadow: `0 4px 12px ${colors.darkBlue}40`,
                '&:hover': {
                  boxShadow: `0 6px 16px ${colors.darkBlue}60`,
                  backgroundImage: `linear-gradient(135deg, ${colors.mediumBlue} 0%, ${colors.darkBlue} 100%)`,
                }
              }}
            >
              {isSubmitting ? 'Submitting...' : isEdit ? 'Save Changes' : 'Create Post'}
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
export default PostForm;
