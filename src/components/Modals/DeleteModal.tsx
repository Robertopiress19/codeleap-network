import { useState, useEffect } from 'react';
import { 
  Box, 
  Modal, 
  Button, 
  Typography, 
  Paper, 
  IconButton, 
  Fade,
  Avatar,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const colors = {
  darkBlue: '#000080', 
  mediumBlue: '#0a2463',
  lightBlue: '#3e92cc',
  accentBlue: '#1c77c3',
  surfaceBlue: '#f5f9ff',
  darkText: '#1a1b25',
  dangerRed: '#d32f2f',
};

export const DeleteModal = ({ open, onClose, onConfirm }: DeleteModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const theme = useTheme();

  useEffect(() => {
    if (open) {
      setIsLoading(false);
      setSuccess(false);
    }
  }, [open]);


  const handleDelete = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        onConfirm();
        onClose();
      }, 800);
    }, 1000);
  };

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
      onClose={isLoading ? undefined : onClose}
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
            width: { xs: '95%', sm: 400 },
            maxWidth: 450,
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
              transform: `perspective(1000px) rotateX(${(mousePosition.y - 100) / 60}deg) rotateY(${(mousePosition.x - 200) / 60}deg) scale3d(0.98, 0.98, 0.98)`,
              pointerEvents: 'none',
              transition: 'transform 0.1s ease',
              zIndex: 1
            }
          }}
        >
          <Box sx={{ 
            position: 'absolute', 
            top: -100, 
            right: -100, 
            width: 200, 
            height: 200, 
            borderRadius: '50%', 
            background: `linear-gradient(135deg, ${colors.dangerRed}20 0%, ${colors.darkBlue}30 100%)`,
            opacity: 0.6,
            filter: 'blur(40px)',
            zIndex: 0 
          }} />
          
          <Box sx={{ 
            position: 'absolute', 
            bottom: -100, 
            left: -70,
            width: 200, 
            height: 200, 
            borderRadius: '50%', 
            background: `linear-gradient(135deg, ${colors.mediumBlue}20 0%, ${colors.dangerRed}30 100%)`,
            opacity: 0.5,
            filter: 'blur(40px)',
            zIndex: 0 
          }} />

          <Box
            sx={{
              p: 3,
              background: `linear-gradient(135deg, ${colors.dangerRed} 0%, ${colors.mediumBlue} 100%)`,
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
                boxShadow: '0 8px 20px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,0,0,0.3)',
                border: '3px solid rgba(255,255,255,0.1)'
              }}
            >
              <WarningAmberIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" component="h2" fontWeight="bold" letterSpacing={0.5}>
              Confirm Deletion
            </Typography>
            <Typography variant="subtitle2" fontWeight="light" sx={{ mt: 0.5, opacity: 0.9, letterSpacing: 0.5 }}>
              This action cannot be undone
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
              onClick={isLoading ? undefined : onClose}
              disabled={isLoading}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ p: 3, position: 'relative', zIndex: 2 }}>
            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: 'center', 
                mb: 3, 
                mt: 1,
                color: colors.darkText,
                fontSize: '1.05rem'
              }}
            >
              Are you sure you want to delete this item?
            </Typography>
            
            <Box sx={{ 
              mt: 4, 
              display: 'flex', 
              justifyContent: 'space-between',
              gap: 2
            }}>
              <Button
                variant="outlined"
                onClick={isLoading ? undefined : onClose}
                disabled={isLoading}
                sx={{ 
                  borderRadius: 3,
                  px: 3,
                  py: 1.2,
                  flex: 1,
                  fontSize: '0.95rem',
                  fontWeight: 'medium',
                  textTransform: 'none',
                  border: '2px solid',
                  borderColor: 'rgba(0,0,128,0.15)',
                  color: colors.darkText,
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: colors.mediumBlue,
                    backgroundColor: 'rgba(0,0,128,0.04)',
                    transform: 'translateY(-2px)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleDelete}
                disabled={isLoading}
                sx={{ 
                  borderRadius: 3,
                  px: 3,
                  py: 1.2,
                  flex: 1,
                  fontSize: '0.95rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  bgcolor: colors.dangerRed,
                  background: `linear-gradient(135deg, ${colors.dangerRed} 0%, #b71c1c 100%)`,
                  boxShadow: '0 8px 16px rgba(211,47,47,0.3)',
                  transition: 'all 0.2s',
                  letterSpacing: 0.3,
                  '&:hover': {
                    boxShadow: '0 12px 20px rgba(211,47,47,0.4)',
                    transform: 'translateY(-2px)',
                    bgcolor: '#c62828',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                    boxShadow: '0 5px 10px rgba(211,47,47,0.2)',
                  },
                  '&.Mui-disabled': {
                    background: 'rgba(0,0,0,0.12)',
                  }
                }}
                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <DeleteOutlineIcon />}
              >
                {isLoading ? 'Deleting...' : success ? 'Deleted!' : 'Delete'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
};