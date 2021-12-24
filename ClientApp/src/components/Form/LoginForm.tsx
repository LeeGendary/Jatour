import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Avatar, Button } from "@mui/material";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import { UserFormValues } from "../../Models/user";

export default observer(function LoginForm() {
  const { userStore } = useStore();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }
  const handleLoginSubmit = (event: FormEvent) => {
    event.preventDefault();
    userStore.login(values as UserFormValues).catch((error) => {
      toast.error("Invalid email or password" + error.response);
    });
  };

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleLoginSubmit}
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          id="email"
          onChange={handleInputChange}
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          onChange={handleInputChange}
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
});
