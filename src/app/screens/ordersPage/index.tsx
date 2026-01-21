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
              <Paper sx={{ p: 3, borderRadius: "12px", bgcolor: "#2c3e50", color: "#fff" }}>
                <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.8, letterSpacing: 1 }}>PAYMENT CARD</Typography>
                
                <Stack spacing={2.5}>
                  <TextField 
                    fullWidth 
                    placeholder="Card Number" 
                    variant="standard"
                    InputProps={{ 
                      disableUnderline: true, 
                      sx: { color: "#fff", bgcolor: "rgba(255,255,255,0.08)", px: 2, py: 1, borderRadius: "6px" } 
                    }}
                  />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField 
                        placeholder="MM/YY" 
                        variant="standard"
                        InputProps={{ 
                          disableUnderline: true, 
                          sx: { color: "#fff", bgcolor: "rgba(255,255,255,0.08)", px: 2, py: 1, borderRadius: "6px" } 
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField 
                        placeholder="CVV" 
                        variant="standard"
                        InputProps={{ 
                          disableUnderline: true, 
                          sx: { color: "#fff", bgcolor: "rgba(255,255,255,0.08)", px: 2, py: 1, borderRadius: "6px" } 
                        }}
                      />
                    </Grid>
                  </Grid>

                  <TextField 
                    fullWidth 
                    placeholder="Card Holder Name" 
                    variant="standard"
                    InputProps={{ 
                      disableUnderline: true, 
                      sx: { color: "#fff", bgcolor: "rgba(255,255,255,0.08)", px: 2, py: 1, borderRadius: "6px" } 
                    }}
                  />

                  <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 1 }}>
                    <img src="/icons/western-card.svg" height="20" alt="card" />
                    <img src="/icons/master-card.svg" height="20" alt="card" />
                    <img src="/icons/paypal-card.svg" height="20" alt="card" />
                    <img src="/icons/visa-card.svg" height="20" alt="card" />
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