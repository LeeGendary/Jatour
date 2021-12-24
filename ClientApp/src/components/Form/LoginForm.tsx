import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import React from "react";
import { Avatar } from "@mui/material";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import { UserFormValues } from "../../Models/user";
import { useForm, FieldValues } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

export default observer(function LoginForm() {
  const { userStore } = useStore();
  // using react hook form to handle form
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  async function submitLoginForm(data: FieldValues) {
    await userStore.login(data as UserFormValues).catch((error) => {
      toast.error("Invalid email or password" + error.response);
    });
  }

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
        onSubmit={handleSubmit(submitLoginForm)}
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          label="Email Address"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required and must be complex",
          })}
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <LoadingButton
          loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
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
