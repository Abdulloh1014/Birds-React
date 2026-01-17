import React from "react";

import { Box, Container, Stack } from "@mui/material";

import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import { CssVarsProvider } from "@mui/joy/styles";
import { AspectRatio } from "@mui/joy";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { retrievePopularProduct } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

const popularProductRetriever = createSelector(
  retrievePopularProduct,
  (popularProduct) => ({ popularProduct })
);

export default function PopularDishes() {
  const { popularProduct } = useSelector(popularProductRetriever);

  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="cards-frame fade-up active">
          <Stack className="popular-section">
            <Box className="category-title">Popular Product</Box>

            <Stack className="cards-frame">
              {popularProduct.length !== 0 ? (
                popularProduct.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;

                  return (
                    <CssVarsProvider key={product._id}>
                      <Card
                        variant="outlined"
                        sx={{
                          width: 290,
                          height: 410,
                          borderRadius: 21,
                        }}
                      >
                        <CardOverflow
                          sx={{
                            p: 0,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={imagePath}
                            alt=""
                            style={{
                              width: "100%",
                              height: "340px",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </CardOverflow>

                        <CardContent sx={{ pt: "0px" }}>

                          <Box sx={{ display: "flex", 
                                     flexDirection: "row", 
                                     justifyContent: "space-between", 
                                     alignItems: "center" 
                                     }}>

                               <Typography
                            sx={{
                              fontWeight: "md",
                              fontSize: "22px",
                              color: "#1A1A1A",
                            }}
                          >
                            {product.productName}
                          </Typography>

                          <Typography level="body-sm">
                            {product.productGender}
                          </Typography>
                          </Box>

                          <Typography>
                            {product.productDesc}
                          </Typography>


                          

                        </CardContent>

                        <CardOverflow
                          variant="soft"
                          sx={{ bgcolor: "background.level1" }}
                        >
                          <Divider inset="context" />

                          <CardContent orientation="horizontal">
                            <Typography
                              sx={{
                                fontWeight: "md",
                                color: "black",
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              {product.productViews}
                              <VisibilityIcon
                                sx={{
                                  fontSize: 15,
                                  marginLeft: "5px",
                                  color: "#374151",
                                }}
                              />
                            </Typography>

                            <Divider orientation="vertical" />

                            <Typography
                              level="body-xs"
                              fontSize="md"
                              textColor="#6B7280"
                              sx={{ fontWeight: "md" }}
                            >
                              {product.productAge}
                            </Typography>
                          </CardContent>
                        </CardOverflow>
                      </Card>
                    </CssVarsProvider>
                  );
                })
              ) : (
                <Box className="no-data">
                  Popular products are not available!
                </Box>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
