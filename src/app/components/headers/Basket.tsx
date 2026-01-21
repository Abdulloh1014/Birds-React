import React from "react";
import { Box, Button, Stack, Typography, IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Menu from "@mui/material/Menu";
import { Cancel as CancelIcon, ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

interface BasketProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
    const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
    const { authMember, setOrderBuilder } = useGlobals();
    const history = useHistory();

    const itemsPrice: number = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
    const shippingCost: number = itemsPrice < 100 ? 5 : 0;
    const totalPrice = (itemsPrice + shippingCost).toFixed(1);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const proceedOrderHandler = async () => {
        try {
            handleClose();
            if (!authMember) throw new Error(Messages.error2);

            const order = new OrderService();
            await order.createOrder(cartItems);
            onDeleteAll();
            setOrderBuilder(new Date());
            history.push("/orders");
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <Box>
            <IconButton
                aria-label="cart"
                onClick={handleClick}
                sx={{ position: "relative", color: "gold" }}
            >
                <ShoppingCartIcon sx={{ fontSize: 28 }} />
                {cartItems.length > 0 && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: -6,
                            right: -6,
                            bgcolor: "secondary.main",
                            color: "#fff",
                            borderRadius: "50%",
                            width: 18,
                            height: 18,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 12,
                            fontWeight: "bold",
                            boxShadow: 1
                        }}
                    >
                        {cartItems.length}
                    </Box>
                )}
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 3,
                    sx: {
                        p: 2,
                        width: 450,
                        borderRadius: 3,
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)"
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <Stack spacing={2}>
                    {/* Cart Header */}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1" fontWeight={600}>
                            {cartItems.length ? "Cart Products" : "Cart is empty!"}
                        </Typography>
                        {cartItems.length > 0 && (
                            <IconButton onClick={onDeleteAll} color="error">
                                <DeleteForeverIcon />
                            </IconButton>
                        )}
                    </Box>

                    {/* Cart Items */}
                    {cartItems.map(item => (
                        <Box
                            key={item._id}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{
                                p: 1,
                                borderRadius: 2,
                                boxShadow: 1,
                                bgcolor: "background.paper",
                                transition: "transform 0.2s",
                                "&:hover": { transform: "scale(1.02)" }
                            }}
                        >
                            <Box display="flex" alignItems="center">
                                <IconButton onClick={() => onDelete(item)} size="small">
                                    <CancelIcon fontSize="small" color="primary" />
                                </IconButton>
                                <img
                                    src={`${serverApi}/${item.image}`}
                                    alt={item.name}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 8,
                                        marginRight: 8,
                                        objectFit: "cover"
                                    }}
                                />
                                <Box>
                                    <Typography fontWeight={500}>{item.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ${item.price} x {item.quantity}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" gap={1}>


                              <Button
  size="small"
  variant="outlined"
  onClick={() => onRemove(item)}
  sx={{
    
    color: 'success.main', // oddiy holat rangi
    borderColor: 'success.main',
    '&:hover': {
      backgroundColor: 'success.main', // hoverda fon rangi
      color: 'white', // hoverda text rangi
      borderColor: 'success.dark', // hoverda border
    },
  }}
>
  -
</Button>




                                <Button
                                sx={{
    color: 'success.main', // oddiy holat rangi
    borderColor: 'success.main',
    '&:hover': {
      backgroundColor: 'success.main', // hoverda fon rangi
      color: 'white', // hoverda text rangi
      borderColor: 'success.dark', // hoverda border
    },
  }}
                                 size="small" variant="outlined" onClick={() => onAdd(item)}>+</Button>



                            </Box>
                        </Box>
                    ))}

                    {/* Total & Order Button */}
                    {cartItems.length > 0 && (
                        <Box display="flex" flexDirection="column" gap={1} mt={1}>
                            <Typography fontWeight={600} textAlign="right">
                                Total: ${totalPrice} ({itemsPrice} + {shippingCost})
                            </Typography>
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<ShoppingCartIcon />}
                                onClick={proceedOrderHandler}
                                sx={{ borderRadius: 2 }}
                            >
                                Proceed to Order
                            </Button>
                        </Box>
                    )}
                </Stack>
            </Menu>
        </Box>
    );
}
