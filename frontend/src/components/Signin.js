import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        CellarClub.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    //height: '100vh',
    height: screen.availHeight,
  },
  image: {
    backgroundImage: "url(/static/images/toast.jpg)",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    //background: 'linear-gradient(225deg, #fff3e0 10%, #ffffff 100%)',
    //height: '100vh',
    backgroundColor: "#fafafa",
    height: screen.availHeight,
    padding: theme.spacing(6,4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon_logo: {
    color: theme.palette.primary.main,
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignInButton = () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: username,
        password: password,
      })
    }
    fetch('/api/signin', requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.success) {
        props.parentSigninCallback(true)
        window.scrollTo(0, 0)
        props.history.push('/') 
      } else {
        setUsername('');
        setPassword('');
        alert(data.message)
      }
      
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>        
          <Avatar className={classes.avatar}>
            <AllInclusiveIcon className={classes.icon_logo} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate autoComplete="off">
            
            <TextField
              value={username}
              onChange={handleUsername}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              value={password}
              onChange={handlePassword}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSignInButton}
            >
              Sign in
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign up."}
                </Link>
              </Grid>
            </Grid>
          </form>
          <Box mt={6}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}