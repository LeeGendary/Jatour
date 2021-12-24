import * as React from "react";
import {
  Grid,
  Box,
  Typography,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { toast } from "react-toastify";
import { UserFormValues } from "../../Models/user";
import { useForm, FieldValues } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

export default observer(function RegisterForm() {
  const { userStore } = useStore();
  const [validationErrors, setValidationErrors] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "all",
  });

  async function submitRegisterForm(data: FieldValues) {
    await userStore.register(data as UserFormValues).catch((error) => {
      toast.error("Invalid email or password " + error.response);
      setValidationErrors(error);
    });
  }
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(submitRegisterForm)}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="User Name"
              autoFocus
              {...register("username", { required: "Username is required" })}
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="display Name"
              {...register("displayName")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        {validationErrors.length > 0 && (
          <Alert severity="error">
            <AlertTitle>Validaion Errors</AlertTitle>
            <List>
              {validationErrors.map((error) => (
                <ListItem key={error}>
                  <ListItemText>{error}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Alert>
        )}
        <LoadingButton
          loading={isSubmitting}
          type="submit"
          fullWidth
          disabled={!isValid}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </LoadingButton>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/">Already have an account? Sign in</Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
});
