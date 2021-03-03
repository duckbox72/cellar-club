import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
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
    height: screen.availHeight,
    },
    image: {
    backgroundImage: "url(/static/images/toast1.jpg)",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    },
  root_paper: {
    height: '100vh',
    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.2), rgba(200, 200, 200, 0.5))'
  },
    
  paper: {
    height: screen.availHeight,
    //margin: theme.spacing(4,4),
    padding: theme.spacing(4,4),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmation = (e) => {
    setConfirmation(e.target.value);
  };

  const handleSignUpButton = () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        confirmation: confirmation,
      })
    }
    fetch('/api/signup', requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.success) {
        props.parentSignupCallback(true)
        props.history.push('/') 
      } else {
        setUsername('');
        setEmail('')
        setPassword('');
        setConfirmation('');
        alert(data.message)
      }
    });
  };

    return (
        <Grid container component="main" classname={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image}>
              <Paper className={classes.root_paper} />
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>   
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AllInclusiveIcon className={classes.icon_logo} />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
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
                        type="text"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        />
                        <TextField
                        value={email}
                        onChange={handleEmail}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        type="Email"
                        name="email"
                        autoComplete="email"
                        />
                        <TextField
                        value={password}
                        onChange={handlePassword}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password (8+ characters)"
                        type="password"
                        id="password"
                        autoComplete="password"
                        />
                        <TextField
                        value={confirmation}
                        onChange={handleConfirmation}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmation"
                        label="Confirm Password"
                        type="password"
                        id="confirmation"
                        autoComplete="confirmation"
                        />
                        <Button
                        //type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSignUpButton}
                        >
                        Sign up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </Grid>
        </Grid>
    );
}