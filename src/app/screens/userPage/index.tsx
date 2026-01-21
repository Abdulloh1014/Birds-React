import React from "react";
import { 
  Box, 
  Container, 
  Stack, 
  Typography, 
  Avatar, 
  Divider, 
  Paper, 
  IconButton 
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Settings } from "./Settings";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";
import "../../../css/userPage.css";

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();

  // Foydalanuvchi login qilmagan bo'lsa, asosiy sahifaga yo'naltirish
  if (!authMember) {
    history.push("/");
    return null;
  }

  return (
    <Box className={"user-page"} sx={{ backgroundColor: "#f0f2f5", py: 5, minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: "column-reverse", md: "row" }} spacing={4} alignItems="flex-start">
          
          {/* CHAP TOMON: SOZLAMALAR */}
          <Stack sx={{ flex: 3, width: "100%" }}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid #e2e8f0", backgroundColor: "#fff" }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: "#1e293b" }}>
                Account Settings
              </Typography>
              <Settings />
            </Paper>
          </Stack>

          {/* O'NG TOMON: PROFIL KARTASI */}
          <Stack sx={{ flex: 1.2, width: "100%", position: { md: "sticky" }, top: 100 }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderRadius: 5, 
                textAlign: "center", 
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "8px", bgcolor: "#3b82f6" }} />
              
              <Box sx={{ position: "relative", display: "inline-block", mb: 2 }}>
                <Avatar
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember.memberImage}`
                      : "/icons/default-user.svg"
                  }
                  sx={{ width: 120, height: 120, border: "4px solid #fff", boxShadow: "0 8px 16px rgba(0,0,0,0.08)" }}
                />
                <Box 
                  sx={{ 
                    position: "absolute", bottom: 5, right: 5, 
                    bgcolor: "#fff", borderRadius: "50%", p: 0.5, boxShadow: 2,
                    display: "flex", alignItems: "center"
                  }}
                >
                  <img 
                    src={authMember?.memberType === MemberType.FOUNDER ? "/icons/restaurant.svg" : "/icons/user-badge.svg"} 
                    width="24px" alt="badge" 
                  />
                </Box>
              </Box>

              <Typography variant="h6" fontWeight="bold" sx={{ color: "#0f172a" }}>
                {authMember?.memberNick}
              </Typography>
              
              <Typography variant="body2" sx={{ fontWeight: 600, color: "#3b82f6", textTransform: "uppercase", letterSpacing: 1, mb: 2, mt: 0.5 }}>
                {authMember?.memberType}
              </Typography>

              <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5} sx={{ mb: 3, color: "#64748b" }}>
                <LocationOnIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">
                  {authMember?.memberAddress || "No address"}
                </Typography>
              </Stack>

              <Divider sx={{ mb: 3 }} />

              <Typography variant="body2" sx={{ fontStyle: "italic", color: "#475569", mb: 3, px: 1, lineHeight: 1.6 }}>
                "{authMember?.memberDesc || "No description provided yet."}"
              </Typography>

              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton sx={{ color: "#1877F2" }}><FacebookIcon /></IconButton>
                <IconButton sx={{ color: "#E4405F" }}><InstagramIcon /></IconButton>
                <IconButton sx={{ color: "#0088cc" }}><TelegramIcon /></IconButton>
                <IconButton sx={{ color: "#FF0000" }}><YouTubeIcon /></IconButton>
              </Stack>
            </Paper>
          </Stack>

        </Stack>
      </Container>
    </Box>
  );
}