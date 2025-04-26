import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Avatar, 
  Menu, 
  MenuItem, 
  IconButton,
  Divider,
  Tooltip,
  useMediaQuery,
  useTheme,
  Fade
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';


const colors = {
  darkBlue: '#000080', 
  mediumBlue: '#0a2463',
  lightBlue: '#3e92cc',
  accentBlue: '#1c77c3',
  surfaceBlue: '#f5f9ff',
  darkText: '#1a1b25',
};

interface HeaderProps {
  username: string;
  onSignout: () => void;
}

export const Header = ({ username, onSignout }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    handleClose();
    onSignout();
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${colors.mediumBlue} 0%, ${colors.darkBlue} 100%)`,
        color: 'white',
        py: { xs: 1.5, md: 2 },
        px: { xs: 2, md: 4 },
        mb: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(0,0,50,0.15)',
        borderRadius: '0 0 16px 16px',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 10,
      }}
    >
      <Box sx={{ 
        position: 'absolute', 
        top: -30, 
        left: -30, 
        width: 120, 
        height: 120, 
        borderRadius: '50%', 
        background: `radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)`,
        zIndex: 0 
      }} />
      
      <Box sx={{ 
        position: 'absolute', 
        bottom: -40, 
        right: -20,
        width: 100, 
        height: 100, 
        borderRadius: '50%', 
        background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)`,
        zIndex: 0 
      }} />

      <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <Avatar 
          sx={{ 
            width: { xs: 36, md: 40 }, 
            height: { xs: 36, md: 40 }, 
            mr: 1.5, 
            bgcolor: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            boxShadow: `0 4px 10px rgba(0,0,0,0.2), 0 0 0 1px ${colors.darkBlue}30`,
            border: '2px solid rgba(255,255,255,0.1)'
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>C</Typography>
        </Avatar>
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          fontWeight="bold" 
          letterSpacing={0.5}
          sx={{
            background: 'linear-gradient(90deg, #ffffff, #e0e8ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}
        >
          codeleap
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        {!isMobile && (
          <Tooltip title="Notifications">
            <IconButton 
              size="small" 
              sx={{ 
                color: 'rgba(255,255,255,0.8)',
                mr: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <NotificationsNoneIcon />
            </IconButton>
          </Tooltip>
        )}

        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            px: 2,
            py: 0.75,
            borderRadius: 6,
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(5px)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.15)',
            }
          }}
          onClick={handleClick}
        >
          <Avatar 
            sx={{ 
              width: 32, 
              height: 32,
              mr: 1.5,
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            <AccountCircleIcon fontSize="small" />
          </Avatar>
          <Typography 
            component="span" 
            sx={{ 
              mr: 1, 
              fontWeight: 'medium',
              fontSize: '0.9rem',
              display: { xs: 'none', sm: 'block' } 
            }}
          >
            @{username}
          </Typography>
          <ExpandMoreIcon 
            fontSize="small" 
            sx={{ 
              color: 'rgba(255,255,255,0.7)',
              transition: 'transform 0.2s',
              transform: open ? 'rotate(180deg)' : 'rotate(0)'
            }}
          />
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          TransitionComponent={Fade}
          sx={{
            '& .MuiPaper-root': {
              borderRadius: 3,
              minWidth: 180,
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              mt: 1.5,
              border: '1px solid rgba(0,0,50,0.05)',
              overflow: 'hidden'
            }
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" fontWeight="bold" color={colors.darkText}>
              Signed in as
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{username}
            </Typography>
          </Box>
          <Divider />
          <MenuItem 
            onClick={handleSignout}  
            sx={{ 
              py: 1.5,
              color: colors.darkBlue,
              '&:hover': {
                backgroundColor: colors.surfaceBlue
              }
            }}
          >
            <LogoutIcon fontSize="small" sx={{ mr: 1.5, color: colors.mediumBlue }} />
            <Typography variant="body2">Sign out</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};