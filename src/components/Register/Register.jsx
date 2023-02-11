import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import KeyIcon from "@mui/icons-material/Key";
import "./register.scss";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [full_name, setFullName] = useState("");
  const [contact_no, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    if (
      full_name === "" ||
      contact_no === "" ||
      email === "" ||
      username === "" ||
      password === ""
    ) {
      toast.warn("Fill all Required Field", {
        position: "top-center",
        autoClose: 4000,
        toastId: "warning",
      });
      return;
    }
    const data = {
      full_name: full_name,
      username: username,
      contact_no: contact_no,
      email: email,
      password: password,
    };

    console.log(data);
    axios
      .post("http://localhost:90/user/register", data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          toast.success("User Registered Sucessfully", {
            position: "top-center",
            autoClose: 4000,
          });
          window.location.replace("/");
        } else if (response.status === 200) {
          toast.error("Username Already Registered", {
            toastId: "error",
            position: "top-center",
            autoClose: 4000,
          });
        } else if (response.status === 401) {
          toast.error("Something Went Wrong, Please Try Again!!", {
            toastId: "error",
            position: "top-center",
            autoClose: 4000,
          });
        }
        console.log(response.data.msg);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          toast.error(e.response.data.msg, {
            toastId: "error",
            position: "top-center",
            autoClose: 4000,
          });
        }
        console.log(e);
      });
  };
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container
          className="logincontainer"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
          }}
        >
          <Card
            sx={{
              width: 500,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
            }}
            className="card-register"
          >
            <h1 className="register-title fs-3" style={{ color: "#6BB3ED" }}>
              Create An Account
            </h1>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 0, pb: 2 },
                // width: 762,
                maxWidth: "100%",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="outlined-required fullWidth"
                fullWidth
                className="me-2"
                label="Full Name"
                width="100%"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "#6BB3ED" }} />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
              <TextField
                required
                id="outlined-required fullWidth"
                fullWidth
                label="Contact No."
                width="100%"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CallIcon sx={{ color: "#6BB3ED" }} />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setContactNo(e.target.value);
                }}
              />
              <TextField
                required
                id="outlined-required fullWidth"
                fullWidth
                label="Email"
                width="100%"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "#6BB3ED" }} />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                required
                id="outlined-required fullWidth"
                fullWidth
                label="Username"
                width="100%"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon
                        icon="ri:user-3-fill"
                        fontSize={24}
                        style={{ color: "#6BB3ED" }}
                      />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <FormControl fullWidth required width="100%" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  startAdornment={
                    <InputAdornment position="start">
                      <KeyIcon sx={{ color: "#6BB3ED" }} />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        style={{ color: "#6BB3ED" }}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </FormControl>
            </Box>
            <CardActions>
              <Button
                variant="contained"
                className="register-btn"
                // sx={{ backgroundColor: "#6BB3ED" }}
                endIcon={<Icon icon="majesticons:register" />}
                onClick={register}
              >
                Register
              </Button>
            </CardActions>
            <Divider sx={{ width: "100%", color: "#000000", border: 0.9 }} />
            <Box sx={{ display: "flex", mt: 2, mb: 0 }}>
              <p>Already Have An Account?</p>
              <Link className="px-2 registerlink" to="/">
                Sign In
              </Link>
            </Box>
          </Card>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default Register;
