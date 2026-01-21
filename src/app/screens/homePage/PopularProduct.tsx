import React from "react";
import { Box, Container, Stack, Typography, Card, Divider, Button, CardMedia, IconButton, Grid } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularProduct } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

const popularProductRetriever = createSelector(
  retrievePopularProduct,
  (popularProduct) => ({ popularProduct })
);

export default function PopularProducts() {
  const { popularProduct } = useSelector(popularProductRetriever);
  const history = useHistory();

  const choseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <Box sx={{ width: "100%", py: 8, bgcolor: "#fff" }}>
      {/* 1252px kenglikka moslangan konteyner */}
      <Container sx={{ maxWidth: "1252px !important", px: {xs: 2, md: 0} }}>
        <Stack spacing={4}>
          
          {/* Header Section */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={800} sx={{ color: "#1b4332", mb: 0.5 }}>
                Popular Birds
              </Typography>
              <Typography variant="body2" sx={{ color: "#52796f" }}>
                Our most viewed and loved feathered friends this week.
              </Typography>
            </Box>
            <Button 
              variant="text"
              onClick={() => history.push("/products")}
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                color: "#2d6a4f", 
                fontWeight: 700,
                textTransform: "none",
                "&:hover": { bgcolor: "transparent", textDecoration: "underline" }
              }}
            >
              View All
            </Button>
          </Stack>

          {/* Grid orqali kartalarni joylash - bu rasmni sig'dirishning eng xavfsiz yo'li */}
          <Grid container spacing={3}>
            {popularProduct.length !== 0 ? (
              popularProduct.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;

                return (
                  <Grid item xs={12} sm={6} md={3} key={product._id}>
                    <Card
                      onClick={() => choseDishHandler(product._id)}
                      sx={{
                        height: "100%",
                        borderRadius: "24px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                        border: "1px solid #f0f4f2",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 12px 30px rgba(45, 106, 79, 0.12)",
                        }
                      }}
                    >
                      {/* Image Area */}
                      <Box sx={{ position: "relative", p: 1.5 }}>
                        <CardMedia
                          component="img"
                          image={imagePath}
                          alt={product.productName}
                          sx={{ 
                            aspectRatio: "1/1", // Rasmni kvadrat qilish (rasm buzilmaydi)
                            borderRadius: "18px",
                            objectFit: "cover", // Rasmni markazlashtirib sig'dirish
                            width: "100%"
                          }}
                        />
                        <Box sx={{
                          position: "absolute",
                          top: 25,
                          right: 25,
                          bgcolor: "rgba(255, 255, 255, 0.9)",
                          backdropFilter: "blur(4px)",
                          px: 1.2,
                          py: 0.4,
                          borderRadius: "8px",
                          fontSize: "11px",
                          fontWeight: 800,
                          color: "#1b4332",
                        }}>
                          {product.productAge}
                        </Box>
                      </Box>

                      {/* Info Area */}
                      <Box sx={{ p: 2, pt: 0.5, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="subtitle1" fontWeight={800} sx={{ color: "#1b4332" }}>
                            {product.productName}
                          </Typography>
                          <IconButton size="small">
                            <FavoriteBorderIcon fontSize="small" sx={{ color: "#95d5b2" }} />
                          </IconButton>
                        </Stack>
                        
                        <Typography variant="caption" sx={{ color: "#52796f", mb: 2, display: "block" }}>
                          Category: {product.productGender}
                        </Typography>

                        <Box sx={{ mt: "auto" }}>
                          <Divider sx={{ mb: 1.5, opacity: 0.5 }} />
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" fontWeight={900} sx={{ color: "#2d6a4f" }}>
                              ${product.productPrice}
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                              <VisibilityIcon sx={{ fontSize: 14, color: "#95d5b2" }} />
                              <Typography variant="caption" fontWeight={700} color="text.secondary">
                                {product.productViews}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <Grid item xs={12}>
                <Typography textAlign="center" py={5}>No products found</Typography>
              </Grid>
            )}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}