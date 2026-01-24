import React, { useState } from "react";
import { 
  Box, Container, Stack, Tabs, Tab, Typography, 
  Button, TextField, Paper, Collapse 
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";
import "../../../css/help.css";

export default function HelpPage() {
  const [tabValue, setTabValue] = useState("1");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleTabChange = (e: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <Box className="help-page" sx={{ py: 8, backgroundColor: "#f4f7f9", minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ borderRadius: "20px", overflow: "hidden", border: "1px solid #e0e0e0" }}>
          <TabContext value={tabValue}>
            {/* Navigation Menu */}
            <Box sx={{ bgcolor: "#fff", borderBottom: "1px solid #eee" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Terms & Rules" value="1" sx={{ py: 2, fontWeight: 600, textTransform: "none" }} />
                <Tab label="FAQ" value="2" sx={{ py: 2, fontWeight: 600, textTransform: "none" }} />
                <Tab label="Contact Us" value="3" sx={{ py: 2, fontWeight: 600, textTransform: "none" }} />
              </Tabs>
            </Box>

            <Box sx={{ p: { xs: 3, md: 5 }, bgcolor: "#fff" }}>
              
              {/* 1. TERMS PANEL */}
              <TabPanel value="1" sx={{ p: 0 }}>
                <Typography variant="h5" sx={{ mb: 4, fontWeight: 700, color: "#2c3e50" }}>
                  Terms of Service
                </Typography>
                <Stack spacing={2}>
                  {terms.map((term, index) => (
                    <Box key={index} sx={{ p: 2.5, borderRadius: "12px", bgcolor: "#f8f9fa", border: "1px solid #edf2f7" }}>
                      <Typography variant="body1" sx={{ lineHeight: 1.6, color: "#4a5568" }}>
                        <b style={{ color: "#3182ce", marginRight: "8px" }}>{index + 1}.</b> {term}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </TabPanel>

              {/* 2. FAQ PANEL */}
              <TabPanel value="2" sx={{ p: 0 }}>
                <Typography variant="h5" sx={{ mb: 4, fontWeight: 700, color: "#2c3e50" }}>
                  Frequently Asked Questions
                </Typography>
                {faq.map((item, index) => (
                  <Box key={index} sx={{ mb: 2, border: "1px solid #edf2f7", borderRadius: "12px", overflow: "hidden" }}>
                    <Box 
                      onClick={() => toggleFaq(index)}
                      sx={{ 
                        p: 2.5, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
                        bgcolor: expandedFaq === index ? "#f0f7ff" : "#fff",
                        transition: "0.3s ease",
                        "&:hover": { bgcolor: expandedFaq === index ? "#f0f7ff" : "#fcfcfc" }
                      }}
                    >
                      <Typography sx={{ fontWeight: 600, color: expandedFaq === index ? "#1976d2" : "#2d3748" }}>
                        {item.question}
                      </Typography>
                      {expandedFaq === index ? <RemoveIcon fontSize="small" color="primary" /> : <AddIcon fontSize="small" />}
                    </Box>
                    <Collapse in={expandedFaq === index}>
                      <Box sx={{ p: 2.5, bgcolor: "#fff", borderTop: "1px solid #edf2f7" }}>
                        <Typography sx={{ color: "#718096", lineHeight: 1.7 }}>
                          {item.answer}
                        </Typography>
                      </Box>
                    </Collapse>
                  </Box>
                ))}
              </TabPanel>

              {/* 3. CONTACT PANEL */}
              <TabPanel value="3" sx={{ p: 0 }}>
                <Box textAlign="center" sx={{ mb: 4 }}>
                  <MailOutlineIcon sx={{ fontSize: 48, color: "#3182ce", mb: 2 }} />
                  <Typography variant="h5" fontWeight={700}>Get in Touch</Typography>
                  <Typography color="textSecondary">Have questions? Send us a message and we'll reply within 24 hours.</Typography>
                </Box>
                
                <Stack spacing={2.5} component="form">
                  <TextField fullWidth label="Full Name" variant="filled" placeholder="Enter your name" />
                  <TextField fullWidth label="Email Address" variant="filled" type="email" placeholder="example@mail.com" />
                  <TextField fullWidth label="Message" variant="filled" multiline rows={4} placeholder="How can we help you?" />
                  <Button 
                    variant="contained" 
                    size="large" 
                    sx={{ 
                      py: 2, borderRadius: "12px", textTransform: "none", fontSize: "16px", fontWeight: 600,
                      boxShadow: "0 4px 12px rgba(49, 130, 206, 0.3)",
                      bgcolor: "#3182ce",
                      "&:hover": { bgcolor: "#2b6cb0" }
                    }}
                  >
                    Send Message
                  </Button>
                </Stack>
              </TabPanel>

            </Box>
          </TabContext>
        </Paper>
      </Container>
    </Box>
  );
}