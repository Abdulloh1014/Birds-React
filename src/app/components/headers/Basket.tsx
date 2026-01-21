import React from "react";
import { 
  Box, Button, Stack, Typography, IconButton, 
  Divider, Drawer, Tooltip 
} from "@mui/material";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
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
    const shippingCost: number = itemsPrice > 0 && itemsPrice < 100 ? 5 : 0;
    const totalPrice = (itemsPrice + shippingCost).toFixed(2);

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        setDrawerOpen(open);
    };

    const proceedOrderHandler = async () => {
        try {
            if (!authMember) throw new Error(Messages.error2);
            const order = new OrderService();
            await order.createOrder(cartItems);
            onDeleteAll();
            setOrderBuilder(new Date());
            setDrawerOpen(false);
            history.push("/orders");
        } catch (err) {
            sweetErrorHandling(err).then();
        }
    };

    return (
        <Box>
            {/* Custom Shopping Bag Button with Manual Count */}
            <IconButton 
                onClick={toggleDrawer(true)} 
                sx={{ 
                    position: "relative", 
                    color: "#222",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.04)" } 
                }}
            >
                <ShoppingBagOutlinedIcon sx={{ fontSize: 30 }} />
                {cartItems.length > 0 && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            bgcolor: "#d32f2f",
                            color: "#fff",
                            borderRadius: "50%",
                            minWidth: "18px",
                            height: "18px",
                            fontSize: "11px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            px: 0.5,
                            border: "2px solid #fff",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}
                    >
                        {cartItems.length}
                    </Box>
                )}
            </IconButton>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{ 
                    sx: { 
                        width: { xs: "100%", sm: 420 }, 
                        p: 0,
                        boxShadow: "-4px 0 15px rgba(0,0,0,0.1)" 
                    } 
                }}
            >
                <Stack sx={{ height: "100%" }}>
                    {/* Header */}
                    <Box sx={{ p: 3, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#fff" }}>
                        <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: "-0.5px" }}>
                            MY CART ({cartItems.length})
                        </Typography>
                        <IconButton onClick={toggleDrawer(false)} sx={{ color: "#000" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Divider />

                    {/* Scrollable Items List */}
                    <Stack spacing={2.5} sx={{ flexGrow: 1, overflowY: "auto", p: 3 }}>
                        {cartItems.length === 0 ? (
                            <Stack alignItems="center" justifyContent="center" sx={{ height: "60%" }}>
                                <img src="/icons/empty-cart.svg" width={100} alt="Empty" style={{ opacity: 0.3, marginBottom: "20px" }} />
                                <Typography variant="h6" color="text.secondary" fontWeight={600}>Savatcha bo'sh</Typography>
                                <Typography variant="body2" color="text.disabled">Hali hech narsa qo'shmadingiz</Typography>
                            </Stack>
                        ) : (
                            cartItems.map((item) => (
                                <Box key={item._id} sx={{ display: "flex", gap: 2 }}>
                                    <Box sx={{ position: "relative" }}>
                                        <img
                                            src={`${serverApi}/${item.image}`}
                                            alt={item.name}
                                            style={{ width: 90, height: 90, borderRadius: 16, objectFit: "cover" }}
                                        />
                                    </Box>
                                    
                                    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                            <Typography variant="subtitle1" fontWeight={700} sx={{ lineHeight: 1.2 }}>
                                                {item.name}
                                            </Typography>
                                            <IconButton size="small" onClick={() => onDelete(item)} sx={{ mt: -0.5 }}>
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                        
                                        <Typography variant="body2" color="primary.main" fontWeight={700}>
                                            ${item.price}
                                        </Typography>

                                        <Box display="flex" alignItems="center" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center" sx={{ bgcolor: "#f0f2f5", borderRadius: "10px", px: 0.5 }}>
                                                <IconButton size="small" onClick={() => onRemove(item)} sx={{ color: "#000" }}>
                                                    <RemoveIcon fontSize="inherit" />
                                                </IconButton>
                                                <Typography sx={{ mx: 1.5, fontWeight: 700, fontSize: "14px" }}>{item.quantity}</Typography>
                                                <IconButton size="small" onClick={() => onAdd(item)} sx={{ color: "#000" }}>
                                                    <AddIcon fontSize="inherit" />
                                                </IconButton>
                                            </Stack>
                                            <Typography fontWeight={800} variant="body1">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ))
                        )}
                    </Stack>

                    {/* Footer Summary */}
                    {cartItems.length > 0 && (
                        <Box sx={{ p: 4, bgcolor: "#fff", borderTop: "2px solid #f0f2f5" }}>
                            <Stack spacing={1.5} sx={{ mb: 3 }}>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography color="text.secondary" variant="body2">Subtotal</Typography>
                                    <Typography fontWeight={600}>${itemsPrice.toFixed(2)}</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography color="text.secondary" variant="body2">Delivery</Typography>
                                    <Typography fontWeight={600}>${shippingCost.toFixed(2)}</Typography>
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" fontWeight={800}>Total</Typography>
                                    <Typography variant="h5" fontWeight={900} color="primary.main">
                                        ${totalPrice}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Tooltip title="Clear All">
                                    <Button 
                                        variant="outlined" 
                                        color="inherit" 
                                        onClick={onDeleteAll} 
                                        sx={{ borderRadius: "14px", minWidth: "60px", borderColor: "#ddd" }}
                                    >
                                        <DeleteSweepIcon />
                                    </Button>
                                </Tooltip>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={proceedOrderHandler}
                                    sx={{ 
                                        borderRadius: "14px", 
                                        textTransform: "none", 
                                        fontWeight: 800, 
                                        fontSize: "16px",
                                        py: 1.5,
                                        bgcolor: "#000",
                                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                                        "&:hover": { bgcolor: "#222" }
                                    }}
                                >
                                    Proceed to Checkout
                                </Button>
                            </Stack>
                        </Box>
                    )}
                </Stack>
            </Drawer>
        </Box>
    );
}