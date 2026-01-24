import React from "react";
import { Box, Stack, Typography, Button, Divider, Paper, Chip } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import moment from "moment";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";

const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

interface ProcessOrdersProps {
  setValue: (input: string) => void;
}

export default function ProcessOrders(props: ProcessOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { processOrders } = useSelector(processOrdersRetriever);

  /** HANDLERS */
  const finishOrderHandler = async (orderId: string) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      if (window.confirm("Taom yetkazib berildimi va qabul qildingizmi?")) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("3"); // Finished tabga o'tkazish
        setOrderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Stack spacing={3} sx={{ mt: 2 }}>
      {processOrders?.map((order: Order) => (
        <Paper
          key={order._id}
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "20px",
            border: "1px solid #e0e0e0",
            background: "linear-gradient(to right bottom, #ffffff, #fafafa)",
          }}
        >
          {/* Header section */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "16px" }}>
                Order #{order._id.toString().slice(-6).toUpperCase()}
              </Typography>


              <Typography variant="caption" color="text.secondary">
  Paid at: {order?.updatedAt ? moment(order.updatedAt).format("YYYY-MM-DD HH:mm") : ""} 
  ({moment(order.updatedAt).fromNow()})
</Typography>


            </Box>
            <Chip 
              label="In Process" 
              color="primary" 
              icon={<LocalShippingIcon fontSize="small" />}
              variant="filled"
              sx={{ borderRadius: "8px", fontWeight: 600 }}
            />
          </Stack>

          <Divider sx={{ my: 2, opacity: 0.6 }} />

          {/* Items section */}
          <Stack spacing={2} sx={{ mb: 3 }}>
            {order?.orderItems?.map((item: OrderItem) => {
              const product: Product = order.productData.filter(
                (ele: Product) => item.productId === ele._id
              )[0];
              const imagePath = `${serverApi}/${product?.productImages[0]}`;

              return (
                <Stack key={item._id} direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <img
                      src={imagePath}
                      alt={product?.productName}
                      style={{ width: "55px", height: "55px", borderRadius: "12px", objectFit: "cover" }}
                    />
                    <Box>
                      <Typography variant="body2" fontWeight="700">{product?.productName}</Typography>
                      <Typography variant="caption" color="text.secondary">${item.itemPrice} x {item.itemQuantity}</Typography>
                    </Box>
                  </Stack>
                  <Typography variant="body2" fontWeight="800">
                    ${(item.itemQuantity * item.itemPrice).toFixed(2)}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>

          {/* Footer section */}
          <Box sx={{ p: 2, bgcolor: "#f6fbff", borderRadius: "12px" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">Total amount (including delivery)</Typography>
                <Typography variant="h6" fontWeight="900" color="primary.main">
                  ${order.orderTotal}
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                color="primary"
                startIcon={<VerifiedIcon />}
                onClick={() => finishOrderHandler(order._id)}
                sx={{
                  borderRadius: "12px",
                  textTransform: "none",
                  boxShadow: "0 8px 16px rgba(25, 118, 210, 0.2)",
                  px: 3,
                }}
              >
                Confirm
              </Button>
            </Stack>
          </Box>
        </Paper>
      ))}

      {(!processOrders || processOrders.length === 0) && (
        <Stack alignItems="center" sx={{ py: 10 }}>
          <img src="/icons/noimage-list.svg" style={{ width: 140, opacity: 0.5 }} alt="no-data" />
          <Typography sx={{ mt: 2, color: "text.secondary", fontWeight: 500 }}>There are currently no orders in progress.</Typography>
        </Stack>
      )}
    </Stack>
  );
}