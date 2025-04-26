import { useState, useEffect } from 'react';
import { 
  Box, 
  Modal, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  IconButton, 
  Fade,
  Grow,
  Avatar,
  Divider,
  Chip,
  InputAdornment,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import AppleIcon from '@mui/icons-material/Apple';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
  onSignup: (username: string) => void;
}

const colors = {
  darkBlue: '#000080', 
  mediumBlue: '#0a2463',
  lightBlue: '#3e92cc',
  accentBlue: '#1c77c3',
  surfaceBlue: '#f5f9ff',
  darkText: '#1a1b25',
};

const SignupModal = ({ open, onClose, onSignup }: SignupModalProps) => {
  const [username, setUsername] = useState<string>('');
  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formStage, setFormStage] = useState<'username' | 'social'>('username');
  const [success, setSuccess] = useState<boolean>(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (open) {
      setUsername('');
      setActiveProvider(null);
      setIsLoading(false);
      setFormStage('username');
      setSuccess(false);
    }
  }, [open]);

  const [isUsernameValid, setIsUsernameValid] = useState<boolean | null>(null);
  useEffect(() => {
    if (username.length > 0) {
      const timer = setTimeout(() => {
        setIsUsernameValid(username.length >= 3);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsUsernameValid(null);
    }
  }, [username]);

  const handleSubmit = (): void => {
    if (username.trim() && isUsernameValid) {
      setIsLoading(true);
      setTimeout(() => {
        setSuccess(true);
        setTimeout(() => {
          onSignup(username);
          onClose();
        }, 1000);
      }, 1000);
    }
  };

  const handleSocialAuth = (provider: string): void => {
    setActiveProvider(provider);
    setIsLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        onSignup(`Usuário ${provider}`);
        onClose();
      }, 1000);
    }, 1500);
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
            width: { xs: '95%', sm: 480 },
            maxWidth: 500,
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
              transform: `perspective(1000px) rotateX(${(mousePosition.y - 150) / 60}deg) rotateY(${(mousePosition.x - 200) / 60}deg) scale3d(0.98, 0.98, 0.98)`,
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
              p: 4,
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
                height: '30px',
                backgroundImage: 'linear-gradient(to bottom right, transparent 49%, white 50%)',
                zIndex: 2
              }
            }}
          >
            <Avatar 
              sx={{ 
                width: 60, 
                height: 60, 
                mb: 2, 
                bgcolor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                boxShadow: `0 8px 20px rgba(0,0,0,0.2), 0 0 0 1px ${colors.darkBlue}30`,
                border: '3px solid rgba(255,255,255,0.1)'
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>C</Typography>
            </Avatar>
            <Typography variant="h4" component="h2" fontWeight="bold" letterSpacing={1}>
              codeleap
            </Typography>
            <Typography variant="subtitle1" fontWeight="light" sx={{ mt: 0.5, opacity: 0.8, letterSpacing: 0.5 }}>
            Connect and share ideas
            </Typography>
            <IconButton
              sx={{ 
                position: 'absolute', 
                top: 16, 
                right: 16, 
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

          <Box sx={{ p: 4, position: 'relative', zIndex: 2 }}>
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'center',
              mb: 4
            }}>
              <Chip
                label="Username"
                variant={formStage === 'username' ? 'filled' : 'outlined'}
                sx={{ 
                  mr: 1, 
                  px: 3,
                  py: 2.5,
                  borderRadius: 6,
                  bgcolor: formStage === 'username' ? colors.darkBlue : 'transparent',
                  color: formStage === 'username' ? 'white' : colors.darkText,
                  fontWeight: formStage === 'username' ? 'bold' : 'normal',
                  borderColor: formStage === 'username' ? colors.darkBlue : 'rgba(0,0,0,0.12)',
                  boxShadow: formStage === 'username' ? `0 4px 12px ${colors.darkBlue}40` : 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: formStage === 'username' ? colors.darkBlue : 'rgba(0,0,0,0.03)'
                  }
                }}
                onClick={() => !isLoading && setFormStage('username')}
                clickable={!isLoading}
              />
              <Chip
                label="Social Login"
                variant={formStage === 'social' ? 'filled' : 'outlined'}
                sx={{ 
                  px: 3,
                  py: 2.5,
                  borderRadius: 6,
                  bgcolor: formStage === 'social' ? colors.darkBlue : 'transparent',
                  color: formStage === 'social' ? 'white' : colors.darkText,
                  fontWeight: formStage === 'social' ? 'bold' : 'normal',
                  borderColor: formStage === 'social' ? colors.darkBlue : 'rgba(0,0,0,0.12)',
                  boxShadow: formStage === 'social' ? `0 4px 12px ${colors.darkBlue}40` : 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: formStage === 'social' ? colors.darkBlue : 'rgba(0,0,0,0.03)'
                  }
                }}
                onClick={() => !isLoading && setFormStage('social')}
                clickable={!isLoading}
              />
            </Box>

            {formStage === 'username' ? (
              <Grow in={formStage === 'username'}>
                <Box>
                  <Typography variant="body1" sx={{ mb: 1, color: colors.darkText, fontWeight: 500 }}>
                  What would you like to be called?
                  </Typography>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Robertodev"
                    variant="outlined"
                    autoFocus
                    disabled={isLoading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AlternateEmailIcon sx={{ color: colors.mediumBlue }} />
                        </InputAdornment>
                      ),
                      endAdornment: isUsernameValid !== null && (
                        <InputAdornment position="end">
                          {isUsernameValid ? (
                            <CheckCircleOutlineIcon color="success" />
                          ) : (
                            <Typography variant="caption" color="error">
                              Mín. 3 caracteres
                            </Typography>
                          )}
                        </InputAdornment>
                      ),
                      sx: { 
                        borderRadius: 3,
                        backgroundColor: colors.surfaceBlue,
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: '#f0f5ff'
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'white',
                          boxShadow: `0 0 0 2px ${colors.darkBlue}30`
                        }
                      }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(0,0,128,0.1)',
                        },
                        '&:hover fieldset': {
                          borderColor: colors.lightBlue,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: colors.darkBlue,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: colors.darkText,
                        '&.Mui-focused': {
                          color: colors.darkBlue,
                        },
                      }
                    }}
                  />
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={!username.trim() || !isUsernameValid || isLoading}
                      sx={{ 
                        borderRadius: 3,
                        px: 5,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        bgcolor: colors.darkBlue,
                        background: `linear-gradient(135deg, ${colors.mediumBlue} 0%, ${colors.darkBlue} 100%)`,
                        boxShadow: `0 8px 16px ${colors.darkBlue}40`,
                        transition: 'all 0.2s',
                        letterSpacing: 0.5,
                        '&:hover': {
                          boxShadow: `0 12px 20px ${colors.darkBlue}60`,
                          transform: 'translateY(-2px)',
                          bgcolor: colors.darkBlue,
                        },
                        '&:active': {
                          transform: 'translateY(0)',
                          boxShadow: `0 5px 10px ${colors.darkBlue}30`,
                        },
                        '&.Mui-disabled': {
                          background: 'rgba(0,0,0,0.12)',
                        }
                      }}
                      startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : undefined}
                    >
                      {isLoading ? 'Processing...' : success ? 'Welcome!' : 'Enter'}
                    </Button>
                  </Box>
                </Box>
              </Grow> 
            ) : (
              <Grow in={formStage === 'social'}>
                <Box>
                  <Typography variant="body1" sx={{ mb: 3, color: colors.darkText, fontWeight: 500 }}>
                  Choose one of the options to continue:
                  </Typography>
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 3 
                  }}>
                    {[
                      { name: 'Google', icon: <GoogleIcon />, color: '#DB4437' },
                      { name: 'Facebook', icon: <FacebookIcon />, color: '#4267B2' },
                      { name: 'GitHub', icon: <GitHubIcon />, color: '#333' },
                      { name: 'Apple', icon: <AppleIcon />, color: '#000' }
                    ].map((provider) => (
                      <Button
                        key={provider.name}
                        variant="outlined"
                        startIcon={provider.icon}
                        onClick={() => handleSocialAuth(provider.name)}
                        disabled={isLoading}
                        sx={{ 
                          borderRadius: 3,
                          py: 1.8,
                          border: '2px solid',
                          borderColor: activeProvider === provider.name ? colors.darkBlue : 'rgba(0,0,128,0.1)',
                          color: activeProvider === provider.name ? colors.darkBlue : colors.darkText,
                          fontWeight: activeProvider === provider.name ? 'bold' : 'medium',
                          textTransform: 'none',
                          transition: 'all 0.2s',
                          position: 'relative',
                          backgroundColor: activeProvider === provider.name ? `${colors.darkBlue}08` : 'transparent',
                          overflow: 'hidden',
                          '&:hover': {
                            borderColor: colors.darkBlue,
                            backgroundColor: `${colors.darkBlue}05`,
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                          },
                          '&:active': {
                            transform: 'translateY(0)',
                          },
                          '&::after': activeProvider === provider.name ? {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(45deg, ${colors.darkBlue}10, transparent)`,
                            zIndex: -1,
                          } : {}
                        }}
                      >
                        {activeProvider === provider.name && isLoading ? (
                          <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                        ) : (
                          provider.name
                        )}
                      </Button>
                    ))}
                  </Box>
                </Box>
              </Grow>
            )}

            <Divider sx={{ my: 4, opacity: 0.5 }} />
            
            <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ opacity: 0.7 }}>
            By continuing, you agree to our <Box component="span" sx={{ color: colors.darkBlue, cursor: 'pointer', fontWeight: 'medium' }}>Terms of Service</Box> and <Box component="span" sx={{ color: colors.darkBlue, cursor: 'pointer', fontWeight: 'medium' }}>Privacy Policy</Box>
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default SignupModal;
export { SignupModal };