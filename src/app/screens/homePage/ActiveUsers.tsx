import React from "react";
import { Box, Container, Stack, Typography, Avatar, Paper, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";
import StarsIcon from '@mui/icons-material/Stars';

const topUsersRetriever = createSelector(
  retrieveTopUsers,
  (topUsers) => ({ topUsers })
);

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <Box sx={{ py: 10, bgcolor: "#f0f7f4" }}> {/* Och yashil tabiat foni */}
      <Container>
        <Stack spacing={4}>
          {/* Sarlavha qismi */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography 
              variant="h4" 
              fontWeight={900} 
              sx={{ color: "#1b4332", mb: 1, textTransform: "uppercase", letterSpacing: 2 }}
            >
              Top Bird Enthusiasts
            </Typography>
            <Box sx={{ width: 60, height: 4, bgcolor: "#40916c", margin: "0 auto", borderRadius: 2 }} />
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {topUsers.length !== 0 ? (
              topUsers.map((member: Member, index: number) => {
                const imagePath = member.memberImage 
                  ? `${serverApi}/${member.memberImage}` 
                  : "/icons/default-user.svg";

                return (
                  <Grid item xs={12} sm={6} md={3} key={member._id}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: "24px",
                        textAlign: "center",
                        position: "relative",
                        overflow: "hidden",
                        border: "1px solid #d8f3dc",
                        transition: "all 0.3s ease",
                        background: "linear-gradient(145deg, #ffffff, #f9fffb)",
                        "&:hover": {
                          transform: "translateY(-10px)",
                          boxShadow: "0 20px 40px rgba(45, 106, 79, 0.1)",
                          borderColor: "#b7e4c7"
                        }
                      }}
                    >
                      {/* Reyting belgisi (Badge) */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 15,
                          right: 15,
                          color: index === 0 ? "#ffb703" : "#95d5b2"
                        }}
                      >
                        <StarsIcon />
                      </Box>

                      {/* Profil rasmi - Chiroyli border bilan */}
                      <Box sx={{ position: "relative", display: "inline-block", mb: 2 }}>
                        <Avatar
                          src={imagePath}
                          sx={{
                            width: 100,
                            height: 100,
                            margin: "0 auto",
                            border: "4px solid #fff",
                            boxShadow: "0 8px 16px rgba(0,0,0,0.08)"
                          }}
                        />
                        {/* Status nuqtasi (Active ekanini bildiradi) */}
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 5,
                            right: 5,
                            width: 14,
                            height: 14,
                            bgcolor: "#52b788",
                            borderRadius: "50%",
                            border: "2px solid #fff"
                          }}
                        />
                      </Box>

                      {/* Foydalanuvchi ismi */}
                      <Typography 
                        variant="h6" 
                        fontWeight={800} 
                        sx={{ color: "#1b4332", mb: 0.5 }}
                      >
                        {member.memberNick}
                      </Typography>
                      
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: "#52796f", 
                          bgcolor: "#e8f5e9", 
                          px: 2, 
                          py: 0.5, 
                          borderRadius: "12px",
                          fontWeight: 700
                        }}
                      >
                        Active Member
                      </Typography>
                    </Paper>
                  </Grid>
                );
              })
            ) : (
              <Box sx={{ py: 10, textAlign: "center", width: "100%" }}>
                <Typography color="text.secondary">Hozircha faol foydalanuvchilar yo'q</Typography>
              </Box>
            )}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}