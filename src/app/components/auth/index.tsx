import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab, Stack, TextField, Box, Typography, IconButton, InputAdornment } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import { T } from "../../../lib/types/common";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import { Messages } from "../../../lib/config";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(12px)", // Kuchliroq blur
  },
  paper: {
    position: "relative",
    background: "rgba(255, 255, 255, 0.9)", // Shaffof oq
    borderRadius: "40px", 
    padding: "50px",
    outline: "none",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 40px 100px rgba(0,0,0,0.1)",
    width: "450px", // Ixcham va chiroyli o'lcham
    textAlign: "center",
  },
  input: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "15px",
      backgroundColor: "rgba(0,0,0,0.03)",
      "& fieldset": { border: "none" },
      "&:hover fieldset": { border: "1px solid #44d219" },
    },
  }
}));

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setAuthMember } = useGlobals();

  /** HANDLERS **/
  const handleUsername = (e: T) => setMemberNick(e.target.value);
  const handlePhone = (e: T) => setMemberPhone(e.target.value);
  const handlePassword = (e: T) => setMemberPassword(e.target.value);
  const togglePassword = () => setShowPassword(!showPassword);

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter") {
      signupOpen ? handleSignupRequest() : handleLoginRequest();
    }
  };

  const handleSignupRequest = async () => {
    try {
      if (memberNick === "" || memberPhone === "" || memberPassword === "") throw new Error(Messages.error3);
      const member = new MemberService();
      const result = await member.signup({ memberNick, memberPhone, memberPassword });
      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      if (memberNick === "" || memberPassword === "") throw new Error(Messages.error3);
      const member = new MemberService();
      const result = await member.login({ memberNick, memberPassword });
      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div>
      {/* LOGIN & SIGNUP MODAL (Birlashtirilgan uslub) */}
      <Modal
        className={classes.modal}
        open={signupOpen || loginOpen}
        onClose={signupOpen ? handleSignupClose : handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={signupOpen || loginOpen}>
          <Box className={classes.paper}>
            {/* Yopish tugmasi */}
            <IconButton 
              onClick={signupOpen ? handleSignupClose : handleLoginClose}
              sx={{ position: "absolute", top: 20, right: 20, color: "#999" }}
            >
              <CloseIcon />
            </IconButton>

            {/* Brend Logosi (Kichik shaklda) */}
            <Box sx={{ mb: 3 }}>
              <img src="/icons/Icon.jpeg" style={{ width: "60px", borderRadius: "50%" }} alt="logo" />
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: "#222", letterSpacing: "-1px" }}>
              {signupOpen ? "Create Account" : "Welcome Back"}
            </Typography>
            
            <Typography variant="body2" sx={{ color: "#888", mb: 4 }}>
              {signupOpen ? "Start your journey with us today." : "Please enter your details to sign in."}
            </Typography>

            <Stack spacing={2}>
              <TextField
                fullWidth
                placeholder="Username"
                className={classes.input}
                onChange={handleUsername}
              />
              
              {signupOpen && (
                <TextField
                  fullWidth
                  placeholder="Phone Number"
                  className={classes.input}
                  onChange={handlePhone}
                />
              )}

              <TextField
                fullWidth
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className={classes.input}
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePassword} size="small">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Fab
                sx={{ 
                  py: 3,
                  mt: 2,
                  background: "#1a1a1a", // Qora tugma - juda zamonaviy ko'rinadi
                  color: "#fff",
                  borderRadius: "15px",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 600,
                  transition: "0.3s",
                  "&:hover": { 
                    background: "#44d219", // Hoverda brend rangiga o'tadi
                    transform: "scale(1.02)"
                  }
                }}
                variant="extended"
                onClick={signupOpen ? handleSignupRequest : handleLoginRequest}
              >
                {signupOpen ? "Get Started" : "Sign In"}
              </Fab>

              <Typography variant="caption" sx={{ mt: 3, color: "#aaa", display: "block" }}>
                By continuing, you agree to our Terms of Service.
              </Typography>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}