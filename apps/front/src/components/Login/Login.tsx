import { useContext } from "react";
import { Box, Modal, Fade, Input, InputAdornment, InputLabel, Button } from "@mui/material";
import { FcManager, FcKey } from "react-icons/fc";
import AuthService from "@services/AuthService";
import { AuthContext } from "./../../auth/AuthContext";
import "./Login.scss";

type LoginTypes = {
  isLoginOpen: boolean;
  setLoginOpen: (isOpen: boolean) => void;
};

export default function Login({ isLoginOpen, setLoginOpen }: LoginTypes) {
  const { login } = useContext(AuthContext);

  const handleLoginClose = () => {
    setLoginOpen(!isLoginOpen);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    AuthService.login(data).then((response: any) => {
      handleLoginClose();
      login(response.displayName);
    });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isLoginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        className="loginModal"
      >
        <Fade in={isLoginOpen}>
          <Box className="loginBox" component={"form"} name="loginForm" onSubmit={handleSubmit}>
            <InputLabel htmlFor="account-name">Nom de compte</InputLabel>
            <Input
              id="account-name"
              className="loginInput"
              placeholder="Alice Synthesis Thirty"
              name="username"
              startAdornment={
                <InputAdornment position="start">
                  <FcManager />
                </InputAdornment>
              }
            />
            <InputLabel htmlFor="account-pass">Mot de passe</InputLabel>
            <Input
              id="account-pass"
              className="loginInput"
              placeholder="********"
              name="password"
              type="password"
              startAdornment={
                <InputAdornment position="start">
                  <FcKey />
                </InputAdornment>
              }
            />
            <Button variant="text" type="submit">
              Connexion
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
