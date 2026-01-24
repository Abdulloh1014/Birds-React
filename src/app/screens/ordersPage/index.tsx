import React, { useState, SyntheticEvent, useEffect } from "react";
import { 
  Container, Stack, Box, Tabs, Tab, Typography, 
  Paper, Avatar, Divider, TextField, Grid 
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";

import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { MemberType } from "../../../lib/enums/member.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";

import ProcessOrders from "./ProcessOrders";
import PausedOrders from "./PausedOrders";
import FinishedOrders from "./FinishedOrders";

const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } = actionDispatch(useDispatch());
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();
  const [value, setValue] = useState("1");
  const [orderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();
    order.getMyOrder({ ...orderInquiry, orderStatus: OrderStatus.PAUSE }).then(setPausedOrders);
    order.getMyOrder({ ...orderInquiry, orderStatus: OrderStatus.PROCESS }).then(setProcessOrders);
    order.getMyOrder({ ...orderInquiry, orderStatus: OrderStatus.FINISH }).then(setFinishedOrders);
  }, [orderInquiry, orderBuilder, setPausedOrders, setProcessOrders, setFinishedOrders]);

  const handleChange = (e: SyntheticEvent, newValue: string) => setValue(newValue);

  if (!authMember) history.push("/");

  return (
    <Box sx={{ py: 5, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          
          {/* LEFT SIDE: ORDERS LIST */}
          <Grid item xs={12} md={8}>
            <TabContext value={value}>
              <Paper sx={{ borderRadius: "12px", boxShadow: "0px 2px 10px rgba(0,0,0,0.05)" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    variant="fullWidth"
                    sx={{ "& .MuiTab-root": { fontWeight: "bold", py: 2 } }}
                  >
                    <Tab label="PAUSED" value="1" />
                    <Tab label="PROCESS" value="2" />
                    <Tab label="FINISHED" value="3" />
                  </Tabs>
                </Box>
                
                <Box sx={{ p: 2, minHeight: "400px" }}>
                  {value === "1" && <PausedOrders setValue={setValue} />}
                  {value === "2" && <ProcessOrders setValue={setValue} />}
                  {value === "3" && <FinishedOrders />}
                </Box>
              </Paper>
            </TabContext>
          </Grid>

          {/* RIGHT SIDE: PROFILE & PAYMENT */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              
              {/* Profile Section */}
              <Paper sx={{ p: 3, textAlign: "center", borderRadius: "12px" }}>
                <Box sx={{ position: "relative", width: "100px", height: "100px", margin: "0 auto 15px" }}>
                  <Avatar
                    src={authMember?.memberImage ? `${serverApi}/${authMember.memberImage}` : "/icons/default-user.svg"}
                    sx={{ width: 100, height: 100, border: "2px solid #eee" }}
                  />
                  <Box sx={{ position: "absolute", bottom: 0, right: 0, bgcolor: "#fff", p: "4px", borderRadius: "50%", boxShadow: 1, display: "flex" }}>
                    <img 
                      src={authMember?.memberType === MemberType.FOUNDER ? "/icons/restaurant.svg" : "/icons/user-badge.svg"} 
                      width="20px" alt="badge" 
                    />
                  </Box>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{authMember?.memberNick}</Typography>
                <Typography variant="body2" color="primary" sx={{ mb: 2, fontWeight: 500 }}>{authMember?.memberType}</Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                  <img src="/icons/location.svg" width="18px" alt="loc" />
                  <Typography variant="body2" color="textSecondary">
                    {authMember?.memberAddress || "Address not provided"}
                  </Typography>
                </Stack>
              </Paper>

              {/* Payment Card Section */}
              <Paper 
  sx={{ 
    p: 3, 
    borderRadius: "20px", 
    background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)", // Gradiyent qo'shildi
    color: "#fff",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    position: "relative",
    overflow: "hidden"
  }}
>
  {/* Karta orqasidagi dekorativ doira */}
  <Box sx={{ 
    position: "absolute", top: -50, right: -50, width: 150, height: 150, 
    borderRadius: "50%", bgcolor: "rgba(255,255,255,0.1)" 
  }} />

  <Stack spacing={3}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h6" sx={{ fontWeight: 700, fontStyle: 'italic', letterSpacing: 1.5 }}>
        CREDIT CARD
      </Typography>
      {/* Karta chipi imitatsiyasi */}
      <Box sx={{ 
        width: 45, height: 35, bgcolor: "#fbbf24", borderRadius: "6px", 
        background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
        position: 'relative',
        '&::after': { content: '""', position: 'absolute', top: 5, left: 5, right: 5, bottom: 5, border: '1px solid rgba(0,0,0,0.1)' }
      }} />
    </Stack>

    <TextField 
      fullWidth 
      placeholder="0000 0000 0000 0000" 
      variant="standard"
      InputProps={{ 
        disableUnderline: true, 
        sx: { 
          color: "#fff", 
          fontSize: "1.4rem", 
          letterSpacing: 4,
          fontFamily: "'Courier New', Courier, monospace", // Karta raqami shrifti
          bgcolor: "transparent",
        } 
      }}
    />

    <Grid container spacing={3} alignItems="flex-end">
      <Grid item xs={7}>
        <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mb: 0.5 }}>CARD HOLDER</Typography>
        <TextField 
          fullWidth 
          placeholder="FULL NAME" 
          variant="standard"
          InputProps={{ 
            disableUnderline: true, 
            sx: { color: "#fff", fontSize: "0.9rem", textTransform: "uppercase" } 
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mb: 0.5 }}>EXPIRES</Typography>
        <TextField 
          placeholder="MM/YY" 
          variant="standard"
          InputProps={{ 
            disableUnderline: true, 
            sx: { color: "#fff", fontSize: "0.9rem" } 
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mb: 0.5 }}>CVV</Typography>
        <TextField 
          placeholder="***" 
          variant="standard"
          InputProps={{ 
            disableUnderline: true, 
            sx: { color: "#fff", fontSize: "0.9rem" } 
          }}
        />
      </Grid>
    </Grid>

    <Stack direction="row" spacing={1} justifyContent="flex-end">
      <img src="/icons/visa-card.svg" height="25" alt="visa" style={{ filter: "brightness(0) invert(1)" }} />
      <img src="/icons/master-card.svg" height="25" alt="master" />
    </Stack>
  </Stack>

  
</Paper>

            </Stack>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}