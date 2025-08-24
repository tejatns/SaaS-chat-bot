import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/Navigationlink';

const Header = () => {
  const auth=useAuth();
  return( 
    <AppBar 
      sx={{ bgcolor: "transparent" , position : "static",boxShadow: "none" }}
    >
      <Toolbar sx={{display:"flex"}}>
        <Logo />
        <div>
          {auth?.isLoggedIn ?(
            <>
              <NavigationLink 
                bg="#000ffc"
                to="/chat"
                text="Go To Chat"
                textcolor="black"
              />
              <NavigationLink 
                bg="#51538f"
                to="/"
                text="Logout"
                textcolor="white"
                onClick={auth.logout}
              />
            </>
          ):(
            <>
              <NavigationLink 
                bg="#000ffc"
                to="/login"
                text="Login"
                textcolor="black"
              />
              <NavigationLink 
                bg="#51538f"
                to="/signup"
                text="Signup"
                textcolor="white"
              />
            </>
          )}
        </div>
      </Toolbar>

    </AppBar>
  );
};

export default Header