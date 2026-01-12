import {useState, SyntheticEvent, useEffect} from "react"
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ProcessOrders from "./ProcessOrders";
import PausedOrders from "./PausedOrders";
import FinishedOrders from "./FinishedOrders";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {setPausedOrders, setProcessOrders, setFinishedOrders} from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/order.css";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";


/** REDUX SLICE & SELECTOR   */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),

});



export default function OrdersPage() {

   const { setPausedOrders, setProcessOrders, setFinishedOrders } = 
   actionDispatch(useDispatch());
   const {orderBuilder, authMember} = useGlobals();
   const history = useHistory();
   const [value, setValue] = useState("1");
   const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
      page: 1,
      limit: 5,
      orderStatus: OrderStatus.PAUSE,

   })


   useEffect(() => {
      // 1) Backend dan data olish
     const order = new OrderService();

     order
     .getMyOrder({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
     .then((data) => setPausedOrders(data))    // 2) Rudux Slice ga saqlash
     .catch((err) => console.log(err));

     order
     .getMyOrder({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
     .then((data) => setProcessOrders(data))
     .catch((err) => console.log(err));

     order
     .getMyOrder({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
     .then((data) => setFinishedOrders(data))
     .catch((err) => console.log(err));
     
   }, [orderInquiry, orderBuilder])       // 4) Ishga tushirish
   /** Handlers */

  const handleChange = ( e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

    if(!authMember) history.push("/");

  return (
         <div className={"order-page"}>
             <Container className="order-container">
              <Stack className={"oreder-left"}>
                 <TabContext value={value}>
                    <Box className={"order-nav-frame"}>
                       <Box sx={{borderBottom: 1, borderColor: "divider" }}>
                         <Tabs
                         value={value}
                         onChange={handleChange}
                         aria-label="basic tabs example"
                         className={"table_list"}
                         >
                          <Tab label="PAUSED ORDERS" value={"1"}/>
                          <Tab label="PROCESS ORDERS" value={"2"}/>
                          <Tab label="FINISH ORDERS" value={"3"}/>

                         </Tabs>
                       </Box>
                    </Box>
                    <Stack className={"order-main-content"}>
                       <PausedOrders setValue={setValue} />
                       <ProcessOrders setValue={setValue} />
                       <FinishedOrders />
                    </Stack>
                 </TabContext>
              </Stack>




              <Stack className={"order-right"}>
                <Box className={"order-info-box"}>
                  <Box className={"member-box"}>
                     <div className={"order-user-img"}>
                        <img
                         src={ authMember?.memberImage
                        ? `${serverApi}/${authMember.memberImage}`
                        : "/icons/default-user.svg"}

                         className={"order-user-avatar"}
                         />
                         <div className={"order-user-icon-box"}>
                            <img
                            src={ authMember?.memberType === MemberType.FOUNDER 
                      ? "/icons/restaurant.svg"
                      : "/icons/user-badge.svg"}
                            className={"order-user-prof-img"} 
                            />
                         </div>
                     </div>
                     <p className={"order-user-name"}>{authMember?.memberNick}</p>
                     <p className={"order-user"}>{authMember?.memberType}</p>
                     <div className={"liner"}></div>

                     <div className={"location"}>
                        <img 
                        src={"/icons/location.svg"}
                        className={"user-location"}
                        />
                        <p className={"location-info"}>{
                            authMember?.memberAddress
                ? authMember.memberAddress : "Do not exist"
                           }</p>
                     </div>
                  </Box>
                </Box>






                <Stack className={"input-card-info"}>
                  <Box className={"input-card-number"}>
                     <input 
                     type="text"
                     placeholder="Card number 09890 7678 98745"
                     style={{width: "333px",
                           height: "36px",}}
                     />
                  </Box>
                  <Box className={"input-sana"}>
                     <input
                     type="text"
                     placeholder="07/24"
                     style={{width: "133px",
                           height: "36px",}}
                      />
                         <input
                     type="text"
                     placeholder="CVV:010"
                     style={{width: "133px",
                           height: "36px",}}
                      />

                  </Box>
                  <Box className={"input-name"}> 
                          <input 
                     type="text"
                     placeholder="Albert Robertson"
                     style={{width: "333px",
                           height: "36px",}}
                     />
                  </Box>
                  <Stack className={"input-check-cards"}>
                     <img 
                     src={"/icons/western-card.svg"}
                     className={"plast"}
                     />
                     <img 
                     src={"/icons/master-card.svg"}
                      className={"plast"}
                     />
                     <img 
                     src={"/icons/paypal-card.svg"}
                      className={"plast"}
                     />
                     <img 
                     src={"/icons/visa-card.svg"}
                      className={"plast"}
                     />
                  </Stack>
                </Stack>
              </Stack>


             </Container>
         </div>
  )



}


