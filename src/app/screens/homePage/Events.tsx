import React from "react";
import { Box, Container, Stack, Typography, Paper, Divider } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function Events() {
  return (
    <Box sx={{ py: 10, bgcolor: "#fbfcf8" }}>
      <Container sx={{ maxWidth: "1252px !important" }}>
        
        {/* Title Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" fontWeight={900} sx={{ color: "#1b4332", mb: 1 }}>
            Find Us
          </Typography>
          <Typography variant="body1" sx={{ color: "#52796f" }}>
            Visit our paradise or get in touch with us
          </Typography>
        </Box>

        <Stack 
          direction={{ xs: "column", md: "row" }} 
          spacing={4} 
          sx={{ alignItems: "stretch" }}
        >
          {/* Information Side */}
          <Paper 
            elevation={0} 
            sx={{ 
              flex: 1, 
              p: 5, 
              borderRadius: "32px", 
              border: "1px solid #eef2ef",
              bgcolor: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Stack spacing={4}>
              {/* Working Hours */}
              <Stack direction="row" spacing={3} alignItems="center">
                <Box sx={{ p: 1.5, bgcolor: "#f0f7f4", borderRadius: "16px", color: "#2d6a4f" }}>
                  <AccessTimeIcon fontSize="large" />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={800} sx={{ color: "#1b4332" }}>
                    8:00 AM – 6:00 PM
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#52796f" }}>
                    Official Working Hours
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ borderStyle: "dashed" }} />

              {/* Days Detail */}
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <CalendarMonthIcon sx={{ color: "#95d5b2" }} />
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Weekdays: <Typography component="span" sx={{ color: "#52796f" }}>Monday to Friday</Typography>
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <CalendarMonthIcon sx={{ color: "#95d5b2" }} />
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Weekends: <Typography component="span" sx={{ color: "#52796f" }}>Sat, Sun & Holidays</Typography>
                  </Typography>
                </Stack>
              </Stack>

              <Divider sx={{ borderStyle: "dashed" }} />

              {/* Contact Phone */}
              <Stack direction="row" spacing={3} alignItems="center">
                <Box sx={{ p: 1.5, bgcolor: "#f0f7f4", borderRadius: "16px", color: "#2d6a4f" }}>
                  <PhoneInTalkIcon fontSize="large" />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={800} sx={{ color: "#1b4332" }}>
                    +998 93 000 11 22
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#52796f" }}>
                    Call us for any inquiries
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Paper>

          {/* Map Side */}
          <Box 
            sx={{ 
              flex: 1.5, 
              height: { xs: "400px", md: "auto" },
              borderRadius: "32px",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
              border: "1px solid #eef2ef"
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4304.009129507858!2d72.35687446020327!3d40.76280806409186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bcedb3adddd9f3%3A0xa6dbbc6cd1305025!2sLazeez!5e0!3m2!1sru!2skr!4v1763290728575!5m2!1sru!2skr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Google Map"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}