import React from "react";
import { Box, Container, Stack, Typography, TextField, Button, IconButton, Divider, Grid } from "@mui/material"; // Grid tepaga olindi
import { Link } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SendIcon from '@mui/icons-material/Send';

// Yordamchi komponentlar (Asosiy komponentdan tashqarida bo'lgani yaxshi)
function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <IconButton 
      sx={{ 
        color: "#fff", 
        bgcolor: "rgba(255,255,255,0.08)", 
        transition: "0.3s",
        "&:hover": { bgcolor: "#40916c", transform: "translateY(-3px)" } 
      }}
    >
      {icon}
    </IconButton>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Typography
        variant="body2"
        sx={{
          color: "rgba(255,255,255,0.7)",
          transition: "0.2s",
          "&:hover": { color: "#95d5b2", pl: 0.5 }
        }}
      >
        {children}
      </Typography>
    </Link>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="caption" sx={{ color: "#95d5b2", fontWeight: 700, textTransform: "uppercase", display: "block", mb: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  );
}

export default function Footer() {
  const authMember = null;

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0b2e1a", 
        color: "#f0fdf4",
        pt: 10,
        pb: 4,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Blur Elements */}
      <Box sx={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", bgcolor: "rgba(64, 145, 108, 0.1)", filter: "blur(50px)" }} />
      <Box sx={{ position: "absolute", bottom: -50, left: -50, width: 250, height: 250, borderRadius: "50%", bgcolor: "rgba(149, 213, 178, 0.05)", filter: "blur(60px)" }} />

      <Container sx={{ maxWidth: "1252px !important" }}>
        <Grid container spacing={6} sx={{ mb: 8 }}>
          
          {/* 1. Brand Section */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <img
                  src="/icons/Icon.jpeg"
                  alt="Birds Magazine"
                  width={60}
                  height={60}
                  style={{ borderRadius: "16px", border: "2px solid #40916c" }}
                />
                <Typography variant="h5" fontWeight={900} sx={{ letterSpacing: 1 }}>
                  BIRDS <br /> MAGAZINE
                </Typography>
              </Box>
              <Typography sx={{ opacity: 0.7, lineHeight: 1.8, fontSize: "0.95rem" }}>
                Bringing the symphony of nature to your home. We are a community 
                dedicated to bird conservation, bird photography, and the joy 
                of avian discovery. Join our feathered journey!
              </Typography>
              <Stack direction="row" spacing={1.5}>
                <SocialIcon icon={<FacebookIcon />} />
                <SocialIcon icon={<TwitterIcon />} />
                <SocialIcon icon={<InstagramIcon />} />
                <SocialIcon icon={<YouTubeIcon />} />
              </Stack>
            </Stack>
          </Grid>

          {/* 2. Quick Links Section */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, color: "#95d5b2" }}>
              Quick Links
            </Typography>
            <Stack spacing={2}>
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/products">Exhibition</FooterLink>
              <FooterLink to="/orders">My Orders</FooterLink>
              <FooterLink to="/about">Our Story</FooterLink>
              <FooterLink to="/help">Help Center</FooterLink>
            </Stack>
          </Grid>

          {/* 3. Contact Info Section */}
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, color: "#95d5b2" }}>
              Reach Us
            </Typography>
            <Stack spacing={2.5}>
              <InfoBox label="Address" value="12 Bird Sanctuary Path, Andijan, UZ" />
              <InfoBox label="General Inquiry" value="hello@birdsmagazine.com" />
              <InfoBox label="Support" value="+998 74 254 0101" />
            </Stack>
          </Grid>

          {/* 4. Newsletter Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, color: "#95d5b2" }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2.5, opacity: 0.7 }}>
              Get bird-watching tips and exclusive offers straight to your inbox.
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField 
                size="small" 
                placeholder="Your email..." 
                sx={{ 
                  bgcolor: "rgba(255,255,255,0.05)", 
                  borderRadius: "8px",
                  flexGrow: 1,
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                    "&:hover fieldset": { borderColor: "#40916c" }
                  }
                }} 
              />
              <Button 
                variant="contained" 
                sx={{ 
                  bgcolor: "#2d6a4f", 
                  minWidth: "50px",
                  "&:hover": { bgcolor: "#1b4332" }
                }}
              >
                <SendIcon />
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Bottom Bar */}
        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          justifyContent="space-between" 
          alignItems="center" 
          sx={{ py: 4, opacity: 0.6 }}
        >
          <Typography variant="caption">
            © {new Date().getFullYear()} Birds Magazine. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography variant="caption" sx={{ cursor: "pointer", "&:hover": { color: "#fff" } }}>Privacy Policy</Typography>
            <Typography variant="caption" sx={{ cursor: "pointer", "&:hover": { color: "#fff" } }}>Terms of Service</Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}