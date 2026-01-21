import React from "react";
import { Container, Box, Stack, Grid, Card, CardMedia, IconButton, Typography, Button, Divider } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewProduct } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

interface HomePageProps {
  onAdd: (item: CartItem) => void;
}

const newProductRetriever = createSelector(
  retrieveNewProduct,
  (newProduct) => ({ newProduct })
);

export default function NewProducts(props: HomePageProps) {
  const { onAdd } = props;
  const history = useHistory();
  const { newProduct } = useSelector(newProductRetriever);

  const choseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <Box sx={{ width: "100%", py: 10, bgcolor: "#f9fbf9" }}>
      <Container sx={{ maxWidth: "1252px !important" }}>
        <Stack spacing={4}>
          
          {/* Section Header */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h3" fontWeight={900} sx={{ color: "#1b4332", mb: 1 }}>
              New Arrivals
            </Typography>
            <Typography variant="body1" sx={{ color: "#52796f" }}>
              Meet our newest members. Be the first to give them a forever home!
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {newProduct.length !== 0 ? (
              newProduct.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;

                return (
                  <Grid item xs={12} sm={6} md={3} key={product._id}>
                    <Card
                      sx={{
                        borderRadius: "24px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                        border: "1px solid #eef2ef",
                        transition: "all 0.3s ease-in-out",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        overflow: "visible", // Button chiqib turishi uchun
                        "&:hover": {
                          transform: "translateY(-10px)",
                          boxShadow: "0 20px 40px rgba(45, 106, 79, 0.08)",
                          borderColor: "#b7e4c7"
                        }
                      }}
                    >
                      {/* Image Part */}
                      <Box sx={{ p: 1, position: "relative" }}>
                        <CardMedia
                          component="img"
                          image={imagePath}
                          alt={product.productName}
                          onClick={() => choseDishHandler(product._id)}
                          sx={{ 
                            height: 240, 
                            borderRadius: "20px", 
                            objectFit: "cover",
                            cursor: "pointer"
                          }}
                        />
                        {/* Gender Label */}
                        <Typography sx={{
                          position: "absolute",
                          bottom: 20,
                          left: 20,
                          bgcolor: "rgba(27, 67, 50, 0.8)",
                          color: "#fff",
                          px: 1.5,
                          py: 0.4,
                          borderRadius: "8px",
                          fontSize: "10px",
                          fontWeight: 700,
                          backdropFilter: "blur(4px)"
                        }}>
                          {product.productGender}
                        </Typography>
                      </Box>

                      {/* Content Part */}
                      <Box sx={{ p: 2.5, pt: 1, flexGrow: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                          <Typography variant="h6" fontWeight={800} sx={{ color: "#1b4332", fontSize: "1.1rem" }}>
                            {product.productName}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ opacity: 0.6 }}>
                            <VisibilityIcon sx={{ fontSize: 14 }} />
                            <Typography variant="caption" fontWeight={700}>{product.productViews}</Typography>
                          </Stack>
                        </Stack>

                        <Typography variant="body2" sx={{ color: "#6b7280", mb: 2, fontWeight: 500 }}>
                          Age: {product.productAge}
                        </Typography>

                        <Divider sx={{ mb: 2, borderStyle: "dashed" }} />

                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="h5" fontWeight={900} sx={{ color: "#2d6a4f" }}>
                            ${product.productPrice}
                          </Typography>
                          
                          <Button
                            variant="contained"
                            onClick={(e) => {
                              onAdd({
                                _id: product._id,
                                quantity: 1,
                                name: product.productName,
                                price: product.productPrice,
                                image: product.productImages[0],
                              });
                              e.stopPropagation();
                            }}
                            sx={{
                              minWidth: "44px",
                              width: "44px",
                              height: "44px",
                              borderRadius: "12px",
                              bgcolor: "#2d6a4f",
                              "&:hover": { bgcolor: "#1b4332" },
                              p: 0
                            }}
                          >
                            <ShoppingCartOutlinedIcon sx={{ color: "#fff" }} />
                          </Button>
                        </Stack>
                      </Box>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <Box sx={{ width: "100%", py: 10, textAlign: "center" }}>
                <Typography variant="h6" color="text.secondary">New arrivals are coming soon!</Typography>
              </Box>
            )}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}