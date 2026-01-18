import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  const authMember = null; // keyinchalik real authdan olinadi

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        minHeight: { xs: 500, md: 420 },
        backgroundImage: "url(/img/footer.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.50)", // matn o‘qilishi uchun qoraytirish
          zIndex: 1,
        },
      }}
    >
      {/* Content ustida bo‘lishi uchun */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ md: "flex-start" }}
            spacing={{ xs: 6, md: 0 }}
            sx={{ py: { xs: 8, md: 10 }, pb: 6 }}
          >
            {/* 1-ustun: Logo + Tavsif + Social */}
            <Stack spacing={3} sx={{ maxWidth: { md: 380 } }}>
              <Box>
                <img
                  src="/icons/icon.jpeg"
                  alt="Birds Magazine Logo"
                  width={70}
                  style={{ borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)" }}
                />
              </Box>

              <Typography
                variant="body1"
                sx={{
                  fontSize: "15px",
                  lineHeight: 1.7,
                  opacity: 0.9,
                  maxWidth: 360,
                }}
              >
                 Birds Magazine brings the beauty of birds to your screen. 
            From rare species to everyday feathered friends, 
            we share photography, insights, and tips for all bird lovers.
              </Typography>

              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                {["facebook", "twitter", "instagram", "youtube"].map((platform) => (
                  <Box
                    key={platform}
                    component="img"
                    src={`/icons/${platform}.svg`}
                    alt={platform}
                    sx={{
                      width: 32,
                      height: 32,
                      transition: "all 0.3s ease",
                      filter: "brightness(0) invert(1)",
                      "&:hover": {
                        transform: "translateY(-4px) scale(1.12)",
                        filter: "brightness(1.3)",
                      },
                    }}
                  />
                ))}
              </Stack>
            </Stack>

            {/* 2- va 3-ustunlar */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 6, sm: 10, md: 12 }}
              flexWrap="wrap"
            >
              {/* Pages */}
              <Stack spacing={2}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Pages
                </Typography>
                <Stack spacing={1.2}>
                  <FooterLink to="/">Home</FooterLink>
                  <FooterLink to="/products">Products</FooterLink>
                  {authMember && <FooterLink to="/orders">Orders</FooterLink>}
                  <FooterLink to="/help">Help</FooterLink>
                  <FooterLink to="/about">About Us</FooterLink>
                  <FooterLink to="/contact">Contact</FooterLink>
                </Stack>
              </Stack>

              {/* Find us */}
              <Stack spacing={2}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Find us
                </Typography>
                <Stack spacing={2.5}>
                  <InfoItem label="Location" value="Andijan, Uzbekistan" />
                  <InfoItem label="Phone" value="+998 74 254 0101" />
                  <InfoItem label="Email" value="birds.magazine@gmail.com" />
                  <InfoItem label="Working hours" value="Online 24/7" />
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          {/* Copyright */}
          <Box
            sx={{
              textAlign: "center",
              pt: 4,
              pb: 3,
              borderTop: "1px solid rgba(255,255,255,0.15)",
              fontSize: "14px",
              opacity: 0.8,
            }}
          >
            © {new Date().getFullYear()} Birds Magazine. Barcha huquqlar himoyalangan.
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

// Yordamchi komponentlar
function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      style={{ textDecoration: "none" }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "#e0f7fa",
          transition: "all 0.25s ease",
          "&:hover": {
            color: "#4fc3f7",
            pl: 1,
          },
        }}
      >
        {children}
      </Typography>
    </Link>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 600, opacity: 0.85, display: "inline" }}>
        {label}:{" "}
      </Typography>
      <Typography variant="body2" component="span" sx={{ opacity: 0.95 }}>
        {value}
      </Typography>
    </Box>
  );
}