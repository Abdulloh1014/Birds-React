import React from "react";
import { Box, Stack, Typography, Divider, Paper, Chip, IconButton, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { serverApi, Messages } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);
  const { authMember, setOrderBuilder } = useGlobals();

  /** HANDLERS **/
  const deleteOrderHandler = async (orderId: string) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      if (window.confirm("Ushbu buyurtmani tarixdan o'chirmoqchimisiz?")) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date()); // Ro'yxatni yangilash uchun
      }
    } catch (err) {
      console.log("Error, deleteOrderHandler:", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Stack spacing={3} sx={{ mt: 2 }}>
      {finishedOrders?.map((order: Order) => (
        <Paper
          key={order._id}
          elevation={0}
          sx={{
            p: 2,
            borderRadius: "16px",
            border: "1px solid #e0e0e0",
            backgroundColor: "#fafafa",
            position: "relative",
            transition: "0.3s",
            "&:hover": { boxShadow: "0px 4px 12px rgba(0,0,0,0.05)" }
          }}
        >
          {/* Status Header & Delete Button */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Chip 
              icon={<CheckCircleIcon />} 
              label="Completed" 
              color="success" 
              variant="outlined" 
              size="small"
              sx={{ fontWeight: 600 }}
            />
            
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="caption" color="text.secondary">
                ID: {order._id.toString().slice(-6).toUpperCase()}
              </Typography>
              <Tooltip title="O'chirish">
                <IconButton 
                  size="small" 
                  color="error" 
                  onClick={() => deleteOrderHandler(order._id)}
                  sx={{ bgcolor: "rgba(211, 47, 47, 0.05)" }}
                >
                  <DeleteSweepIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          {/* Items List */}
          <Stack spacing={2}>
            {order?.orderItems?.map((item: OrderItem) => {
              const product = order.productData?.find(
                (ele: Product) => item.productId === ele._id
              );
              const imagePath = product?.productImages?.[0]
                ? `${serverApi}/${product.productImages[0]}`
                : "/icons/noimage.svg";

              return (
                <Box
                  key={item._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <img
                      src={imagePath}
                      alt={product?.productName}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "8px",
                        objectFit: "cover",
                        filter: "grayscale(40%)",
                      }}
                    />
                    <Box>
                      <Typography variant="body2" fontWeight="600" color="text.primary">
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

          <Divider sx={{ my: 2, borderStyle: "dotted" }} />

          {/* Final Totals */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">
              Successfully completed.
            </Typography>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>Total Paid:</Typography>
              <Typography variant="subtitle1" component="span" fontWeight="800" color="success.main">
                ${order.orderTotal}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      ))}

      {(!finishedOrders || finishedOrders.length === 0) && (
        <Stack alignItems="center" sx={{ py: 8 }}>
          <img
            src={"/icons/noimage-list.svg"}
            style={{ width: 120, opacity: 0.3 }}
            alt="empty"
          />
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            There are no completed orders.
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}