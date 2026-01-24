import React from "react";
import { Box, Stack, Typography, Button, Divider, Paper } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PaymentIcon from "@mui/icons-material/Payment";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { useHistory } from "react-router-dom";

const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue } = props;
  const history = useHistory();
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  /** Handlers */
  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.currentTarget.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      if (window.confirm("Do you want to cancel this order?")) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };



  // const processOrderHandler = async (e: T) => {
  //   try {
  //     if (!authMember) throw new Error(Messages.error2);
  //     const orderId = e.currentTarget.value;
  //     const input: OrderUpdateInput = {
  //       orderId: orderId,
  //       orderStatus: OrderStatus.PROCESS,
  //     };

  //     if (window.confirm("Do you want to proceed with payment?")) {
  //       const order = new OrderService();
  //       await order.updateOrder(input);
  //       setValue("2");
  //       setOrderBuilder(new Date());
  //     }
  //   } catch (err) {
  //     sweetErrorHandling(err).then();
  //   }
  // };


  const processOrderHandler = async (e: T) => {
  try {
    if (!authMember) throw new Error(Messages.error2);

    // 1. MANZILNI TEKSHIRISH
    if (!authMember.memberAddress || authMember.memberAddress.trim() === "") {
      // Agar manzil bo'lmasa, ogohlantirish chiqarib, jarayonni to'xtatamiz
      await sweetErrorHandling(new Error("Please enter your address in the profile section to place an order!"));
      
      // Ixtiyoriy: Foydalanuvchini avtomatik Settings sahifasiga yuborish mumkin
      history.push("/member-page"); 
      return;
    }

    const orderId = e.currentTarget.value;
    const input: OrderUpdateInput = {
      orderId: orderId,
      orderStatus: OrderStatus.PROCESS,
    };

    if (window.confirm("Do you want to proceed with payment?")) {
      const order = new OrderService();
      await order.updateOrder(input);
      setValue("2"); // Processed orders tabiga o'tkazish
      setOrderBuilder(new Date()); // Orderlarni qayta render qilish
    }
  } catch (err) {
    sweetErrorHandling(err).then();
  }
};





  return (
    <Stack spacing={3} sx={{ mt: 2 }}>
      {pausedOrders?.map((order: Order) => (
        <Paper 
          key={order._id} 
          elevation={0} 
          sx={{ 
            p: 2, 
            borderRadius: "12px", 
            border: "1px solid #eee",
            backgroundColor: "#fff"
          }}
        >
          {/* Order Items List */}
          <Stack spacing={2}>
            {order?.orderItems?.map((item: OrderItem) => {
              const product = order.productData?.find((ele: Product) => item.productId === ele._id);
              const imagePath = product?.productImages?.[0]
                ? `${serverApi}/${product.productImages[0]}`
                : "/icons/noimage.svg";

              return (
                <Box 
                  key={item._id} 
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between" 
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <img
                      src={imagePath}
                      alt={product?.productName}
                      style={{ 
                        width: "60px", 
                        height: "60px", 
                        borderRadius: "8px", 
                        objectFit: "cover" 
                      }}
                    />
                    <Box>
                      <Typography variant="subtitle2" fontWeight="600">
                        {product?.productName || "Product deleted"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ${item.itemPrice} x {item.itemQuantity}
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography variant="body2" fontWeight="700">
                    ${(item.itemQuantity * item.itemPrice).toFixed(2)}
                  </Typography>
                </Box>
              );
            })}
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Order Summary & Actions */}
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center"
          >
            <Stack direction="row" spacing={3}>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">Total Price</Typography>
                <Typography variant="subtitle1" fontWeight="700">${order.orderTotal}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">Delivery</Typography>
                <Typography variant="subtitle1" fontWeight="700" color="primary.main">${order.orderDelivery}</Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Button
                value={order._id}
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteForeverIcon />}
                onClick={deleteOrderHandler}
                sx={{ textTransform: "none", borderRadius: "8px" }}
              >
                Cancel
              </Button>
              <Button
                value={order._id}
                variant="contained"
                color="primary"
                size="small"
                startIcon={<PaymentIcon />}
                onClick={processOrderHandler}
                sx={{ textTransform: "none", borderRadius: "8px", boxShadow: "none" }}
              >
                Payment
              </Button>
            </Stack>
          </Stack>
        </Paper>
      ))}

      {(!pausedOrders || pausedOrders.length === 0) && (
        <Stack alignItems="center" justifyContent="center" sx={{ py: 10 }}>
          <img src="/icons/noimage-list.svg" alt="no-orders" style={{ width: 150, opacity: 0.5 }} />
          <Typography color="text.secondary" sx={{ mt: 2 }}>No paused orders found</Typography>
        </Stack>
      )}
    </Stack>
  );
}