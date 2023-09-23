import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { NavLink} from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import {  deepPurple } from '@mui/material/colors';
import logo from '../assets/kam.jpg'
import { useEffect,useState } from 'react';

/*const pages = [
  {path:'/', name:'Home'},
  {path:'about', name:'About'},
  {path:'detail/:id', name:'Detail'},
  {path:'create', name:'Create Blog'},
  {path:'update/:id', name:'Update Blog'},
 
];*/

const pages = [
  { path: '/', name: 'Home' },
  { path: 'about', name: 'About' },
  { path: 'detail/:id', name: 'Detail' },
  { path: 'update/:id', name: 'Update Blog' },
];

export const Navbar=()=> {
  const {user,logoutUser}=useContext(UserContext)
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [navPages, setNavPages] = useState(pages);

  useEffect(()=>{
     if (user) {
      setNavPages([...pages,{ path: 'create', name: 'Create Blog' }]);
    }else{
      setNavPages([...pages])
    }
  },[user])
 
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{backgroundColor:'#74EBD5',backgroundImage: 'linear-gradient(#1F1C2C,#928DAB)'
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logo} alt="logo" style={{width:'50px',borderRadius:'50%' }} /> 
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } ,padding:'10px'}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{display: { xs: 'block', md: 'none' }}}
            >
              {navPages.map((obj) => (
                <NavLink key={obj.name} to={obj.path} className={({isActive})=>(isActive ? 'active' : '')} >
                  <MenuItem key={obj.name} onClick={handleCloseNavMenu} >
                    <Typography textAlign="center">{obj.name}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
          {/*mobil nézet*/}
       
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navPages.map((obj) => (
                <NavLink key={obj.name} to={obj.path} className={({isActive})=> isActive ? 'active' : ''}>
                  <Button key={obj.name} sx={{ my: 2, color: 'white', display: 'block' }}
                      onClick={handleCloseNavMenu}>
                    {obj.name}
                  </Button>
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
              {!user ? 
                <>
                  <IconButton sx={{ p: 0 }}>
                    {/*<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />*/}
                    <NavLink to='/signin' className={({isActive})=> isActive ? 'active' : ''}>
                      <Typography textAlign="center" sx={{color:'white',padding:'10px'}}>Sign In</Typography>
                    </NavLink>
                  </IconButton>
                  <IconButton sx={{ p: 0 }}>
                    {/*<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />*/}
                    <NavLink to='/signup' className={({isActive})=> isActive ? 'active' : ''}>
                      <Typography textAlign="center" sx={{color:'white',padding:'10px'}}>Sign Up</Typography>
                    </NavLink>
                  </IconButton>
               </>  
               :
               <>
                <IconButton><Avatar sx={{ bgcolor: deepPurple[500] }} title={user.email}>{user.email.at(0)}</Avatar></IconButton>
                  <IconButton sx={{ p: 0 }} onClick={()=>logoutUser()}>
                  <LogoutIcon sx={{color:'white'}}/>
                </IconButton>
               </>
              }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}