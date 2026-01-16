import { Box, Container, Stack, Button, Menu, MenuItem, ListItemIcon } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import React, { useState, useEffect } from "react";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;

  const { authMember } = useGlobals();

  /* 🔽 FAQAT SHU QO‘SHILDI (BANNER AYLANISHI) */
  const banners = ["bg-1", "bg-2", "bg-3"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3000000);

    return () => clearInterval(interval);
  }, []);
  /* 🔼 FAQAT SHU QO‘SHILDI */

  return (
    <div className={`home-navbar ${banners[index]}`}>
      <Stack className="menu">
        <Box className="brand-logo">
          <NavLink to="/">
            <img className="brand-logo-img" src="/icons/icon.jpeg" />
          </NavLink>
        </Box>

        <Stack className="links">
          <Box className="hover-line">
            <NavLink exact to="/" activeClassName="underline">Home</NavLink>
          </Box>

          <Box className="hover-line">
            <NavLink to="/products" activeClassName="underline">Products</NavLink>
          </Box>

          {authMember && (
            <Box className="hover-line">
              <NavLink to="/orders" activeClassName="underline">Orders</NavLink>
            </Box>
          )}

          {authMember && (
            <Box className="hover-line">
              <NavLink to="/member-page" activeClassName="underline">My Page</NavLink>
            </Box>
          )}

          <Box className="hover-line">
            <NavLink to="/help" activeClassName="underline">Help</NavLink>
          </Box>
        </Stack>

        <Stack className="btn-frame">
          <Basket
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
            onDelete={onDelete}
            onDeleteAll={onDeleteAll}
          />

          {!authMember && (
            <Button
              variant="contained"
              className="signup-button"
              onClick={() => setSignupOpen(true)}
            >
              Sign Up
            </Button>
          )}

          {!authMember ? (
            <Button
              variant="contained"
              className="login-button"
              onClick={() => setLoginOpen(true)}
            >
              Login
            </Button>
          ) : (
            <img
              className="user-avatar"
              src={
                authMember?.memberImage
                  ? `${serverApi}/${authMember.memberImage}`
                  : "/icons/default-user.svg"
              }
              onClick={handleLogoutClick}
            />
          )}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseLogout}
            onClick={handleCloseLogout}
          >
            <MenuItem onClick={handleLogoutRequest}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>
    </div>
  );
}
