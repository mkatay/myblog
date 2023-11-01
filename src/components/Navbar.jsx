import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { deepPurple } from "@mui/material/colors";
import logo from "../assets/kam.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAvatar } from "../utility/uploadFile";
;

const pages = [
  { path: "/", name: "Home" },
  { path: "about", name: "About" },
];

const settings = [
  {path:"/profile",name:"Profile"},
  {path:"/logout",name: "Logout"}];

export const Navbar = ({avatar,setAvatar}) => {
  const { user, logoutUser,role} = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [navPages, setNavPages] = useState(pages);

  const navigate=useNavigate()

  useEffect(() => {
    setAvatar(null)
    if (user /*&& user.emailVerified)*/ ) {
      setNavPages(prev=>[...prev, { path: "create", name: "Create Blog" }]);
      getAvatar(user.uid,setAvatar)
      role=='admin' &&  setNavPages(prev=>[...prev, { path: "admin", name: "Dashboard" }]);
    } else {
      setNavPages([...pages]);
    }
  }, [user]);

//avatar && console.log(avatar);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  console.log('navbar:',role);
    return (
    <AppBar position="fixed"  sx={{backgroundColor: "#74EBD5",backgroundImage: "linear-gradient(#1F1C2C,#928DAB)",}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logo} alt="logo"style={{ width: "50px", borderRadius: "50%" }}/>
          <Box  sx={{flexGrow: 1,display: { xs: "flex", md: "none" },padding: "10px",}}>
            <IconButton size="large"aria-label="account of current user" aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{vertical: "bottom",horizontal: "left",}}
              keepMounted
              transformOrigin={{vertical: "top",horizontal: "left", }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {navPages.map((obj) => (
                <NavLink key={obj.name} to={obj.path} className={({ isActive }) => (isActive ? "active" : "")}>
                  <MenuItem key={obj.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{obj.name}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
          {/*mobil nézet*/}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navPages.map((obj) => (
              <NavLink key={obj.name} to={obj.path} className={({ isActive }) => (isActive ? "active" : "")}>
                <Button sx={{ my: 2, color: "white", display: "block" }} onClick={handleCloseNavMenu}>
                  {obj.name}
                </Button>
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!user /*|| (user && !user.emailVerified)*/ ? (
              <>
                <IconButton sx={{ p: 0 }}>
                  <NavLink to="/signin" className={({ isActive }) => (isActive ? "active" : "")}>
                    <Typography textAlign="center" sx={{ color: "white", padding: "10px" }}>
                      Sign In
                    </Typography>
                  </NavLink>
                </IconButton>
                <IconButton sx={{ p: 0 }}>
                  <NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")}>
                    <Typography textAlign="center" sx={{ color: "white", padding: "10px" }}>
                      Sign Up
                    </Typography>
                  </NavLink>
                </IconButton>
              </>
            ) : (
                <IconButton    onClick={handleOpenUserMenu}>
                  <Avatar sx={{ bgcolor: deepPurple[500], fontSize: "10px" }} 
                      src={avatar} title={user.displayName} alt= {/*user.email.at(0)*/ user.displayName} />
                </IconButton>   
            )}
            {/*innen van a user menu */}
            <Menu sx={{ mt: "45px" }} id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{vertical: "top",horizontal: "right",}}
              keepMounted
              transformOrigin={{vertical: "top",horizontal: "right",}}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" 
                    onClick={()=>setting.name=='Logout'? logoutUser():navigate(setting.path)}>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
