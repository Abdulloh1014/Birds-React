import React, { useEffect, useState } from "react";
import { Container, Stack, Box, Grid, Typography, Button, Rating, Chip, Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Divider from "../../components/divider";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setFounder, setChosenProduct } from "./slice";
import { createSelector } from "reselect";
import { retrieveChosenProduct, retrieveRestaurant } from "./selector";
import { Product } from "../../../lib/types/product";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Member) => dispatch(setFounder(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({ chosenProduct })
);
const restaurentRetriever = createSelector(
  retrieveRestaurant,
  (restaurant) => ({ restaurant })
);

interface ChosenProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductsProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  const { setRestaurant, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { restaurant } = useSelector(restaurentRetriever);
  
  // Thumbnail uchun state
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  useEffect(() => {
    const product = new ProductService();
    product.getProduct(productId).then(data => setChosenProduct(data)).catch(err => console.log(err));

    const member = new MemberService();
    member.getRestaurant().then(data => setRestaurant(data)).catch(err => console.log(err));
  }, [productId]);

  if (!chosenProduct) return null;

  return (
    <div className={"chosen-product"} style={{ padding: "40px 0", background: "#f9f9f9" }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          
          {/* CHAP TOMON: RASMLAR GALEREYASI */}
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              {/* Asosiy Rasm */}
              <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                style={{ borderRadius: "16px", overflow: "hidden", width: "100%", height: "450px" }}
              >
                {chosenProduct?.productImages.map((ele: string, index: number) => (
                  <SwiperSlide key={index}>
                    <img 
                      src={`${serverApi}/${ele}`} 
                      alt="product" 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Kichik Rasmlar (Thumbnails) */}
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                style={{ height: "100px", cursor: "pointer" }}
              >
                {chosenProduct?.productImages.map((ele: string, index: number) => (
                  <SwiperSlide key={index} style={{ borderRadius: "8px", overflow: "hidden" }}>
                    <img 
                      src={`${serverApi}/${ele}`} 
                      alt="thumb" 
                      style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} 
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Stack>
          </Grid>

          {/* O'NG TOMON: MA'LUMOTLAR */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: "16px", background: "#fff" }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="#222">
                    {chosenProduct?.productName}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center" mt={1}>
                    {/* <Chip label={restaurant?.memberNick} color="primary" variant="outlined" size="small" /> */}
                    <Typography variant="body2" color="text.secondary">
                      {restaurant?.memberPhone}
                    </Typography>
                  </Stack>
                </Box>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Rating value={4.5} precision={0.5} readOnly />
                  <Stack direction="row" alignItems="center" color="text.secondary">
                    <RemoveRedEyeIcon sx={{ fontSize: 20, mr: 0.5 }} />
                    <Typography variant="body2">{chosenProduct?.productViews} views</Typography>
                  </Stack>
                </Stack>

                <Divider height="1" width="100%" bg="#eee" />

                <Box sx={{ 
  minHeight: "150px", // Eng kam balandlik
  maxHeight: "250px", // Maksimal balandlik (agar matn juda ko'p bo'lsa)
  overflowY: "auto",   // Matn sig'masa skroll paydo bo'ladi
  pr: 1,               // Skroll bar uchun o'ng tomondan ozgina joy
  mb: 2,               // Pastki elementdan masofa
  "&::-webkit-scrollbar": { width: "4px" }, // Skrollni ingichka va chiroyli qilish
  "&::-webkit-scrollbar-thumb": { background: "#ccc", borderRadius: "10px" }
}}>
  <Typography variant="h6" gutterBottom fontWeight="bold">
    Description
  </Typography>
  <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
    {chosenProduct?.productDesc || "No description available for this delicious product."}
  </Typography>
</Box>

                <Box sx={{ p: 2, borderRadius: "12px", background: "#f0f7ff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="h5" fontWeight="bold" color="#1976d2">
                    Price: ${chosenProduct?.productPrice}
                  </Typography>
                </Box>

                <Button 
                  variant="contained" 
                  size="large"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                  sx={{ 
                    borderRadius: "30px", 
                    py: 1.5, 
                    fontSize: "1.1rem",
                    textTransform: "none",
                    boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)"
                  }}
                  onClick={(e) => {
                    onAdd({
                      _id: chosenProduct._id,
                      quantity: 1,
                      name: chosenProduct.productName,
                      price: chosenProduct.productPrice,
                      image: chosenProduct.productImages[0],
                    });
                    e.stopPropagation();
                  }}
                >
                  Add To Basket
                </Button>
              </Stack>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </div>
  );
}