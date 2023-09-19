import React,{useContext,useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import PasswordIcon from '@mui/icons-material/Password';
import { useEffect } from 'react';


const defaultTheme = createTheme();

export const PwReset=()=> {
    const navigate=useNavigate()
    const {resetPassword,msg,setMsg}=useContext(UserContext)
    const [email, setEmail] = useState('');

    useEffect(()=>{
      setMsg({...msg,errResetPw:null,resetPw:null})
    },[])

  const handleResetPassword=()=>{
    resetPassword(email)
    console.log(typeof msg.resetPw);
    if(msg.resetPw) navigate('/signin')
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ boxShadow: '0 0 10px #1976d2'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PasswordIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset password
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              autoFocus
            />
           
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleResetPassword}
            >
              Reset your password
            </Button>
            <Typography sx={{color:'red',fontSize:'0.6rem',textAlign:'center'}}>{msg.errResetPw}</Typography>
           </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}