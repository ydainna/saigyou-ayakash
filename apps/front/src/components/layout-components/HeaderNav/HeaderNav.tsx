import { useState, useContext } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Button, IconButton, Tooltip } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import "./HeaderNav.scss";
import Login from "@components/Login/Login";
import { AuthContext } from "./../../../auth/AuthContext";
import AccountMenu from "../Auth/AccountMenu";

export default function HeaderNav() {
  const [isLoginOpen, setLoginOpen] = useState<boolean>(false);
  const { isLogin } = useContext(AuthContext);

  const navigate: NavigateFunction = useNavigate();

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  return (
    <div className="header">
      <div className="header-nav">
        <ul className="nav">
          <li className="nav-item">
            <Button variant="text" onClick={() => navigate("/")}>
              Collection
            </Button>
          </li>
          <li className="nav-item">
            <img className="logo" src="images/logo.svg" alt="Header logo, blue cherry blossom" />
          </li>
          <li className="nav-item">
            <Button variant="text" onClick={() => navigate("/wishlist")}>
              Wishlist
            </Button>
          </li>
          <li className="nav-item">
            {!isLogin ? (
              <Tooltip arrow title="Login" placement="bottom">
                <IconButton onClick={handleLoginOpen}>
                  <LoginIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <AccountMenu />
            )}
          </li>
        </ul>
      </div>
      <Login isLoginOpen={isLoginOpen} setLoginOpen={setLoginOpen} />
    </div>
  );
}
