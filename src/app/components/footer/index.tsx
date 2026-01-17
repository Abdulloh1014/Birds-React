import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  height: 370px;
  display: flex;
  background-image: url("/img/footer.png");
  // background: #006e0d;
  background-size: cover;
   background-position: center;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Stack flexDirection={"row"} sx={{ mt: "94px", marginTop: "40px" }}>
          <Stack flexDirection={"column"} style={{ width: "340px" }}>
            <Box>
              <img width={"60px"} src={"/icons/icon.jpeg"} style={{borderRadius: "50%"}}/>
            </Box>
            <Box className={"foot-desc-txt"} sx={{color: "white"}}>
            Birds Magazine brings the beauty of birds to your screen. 
            From rare species to everyday feathered friends, 
            we share photography, insights, and tips for all bird lovers.
            
            </Box>
            <Box className="sns-context">
              <img src={"/icons/facebook.svg"} />
              <img src={"/icons/twitter.svg"} />
              <img src={"/icons/instagram.svg"} />
              <img src={"/icons/youtube.svg"} />
            </Box>
          </Stack>
          <Stack sx={{ ml: "288px" }} flexDirection={"row"}>
            <Stack>
              <Box>
                <Box className={"foot-category-title"}>Pages</Box>
                <Box className={"foot-category-link"}>
                  <Link style={{color: "blue"}} to="/">Home</Link>
                  <Link style={{color: "blue"}} to="/products">Products</Link>
                  {authMember && <Link style={{color: "blue"}} to="/orders">Orders</Link>}
                  <Link style={{color: "blue"}} to="/help">Help</Link>
                </Box>
              </Box>
            </Stack>
            <Stack sx={{ ml: "100px" }}>
              <Box>
                <Box className={"foot-category-title"}>Find us</Box>
                <Box
                  flexDirection={"column"}
                  sx={{ mt: "20px" }}
                  className={"foot-category-link"}
                  justifyContent={"space-between"}
                >
                  <Box flexDirection={"row"} className={"find-us"}>
                    <span>Location:</span>
                    <div style={{color: "white"}} >Andijan</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>Phone:</span>
                    <div style={{color: "white"}} >+998 74 254 0101</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>Email:</span>
                    <div style={{color: "white"}} >birds@gmail.com</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>Hours:</span>
                    <div style={{color: "white"}} >Visit 24 hours</div>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        {/* <Stack
          style={{ border: "1px solid #C5C8C9", width: "100%", opacity: "0.2" }}
          sx={{ mt: "80px" }}
        ></Stack>
        <Stack className={"copyright-txt"}>
          © Copyright Devex Global, All rights reserved.
        </Stack> */}
      </Container>
    </Footers>
  );
}
