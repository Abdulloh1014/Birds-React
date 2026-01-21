import React from "react";
import { Container, Box, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";

import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { retrieveNewProduct } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";


interface HomePageProps {
  onAdd: (item: CartItem) => void;
}
const newProductRetriever = createSelector(
  retrieveNewProduct,
  (newProduct) => ({ newProduct })
);

export default function NewDishes(props: HomePageProps) {
  const { onAdd } = props;
  const history = useHistory();
  const choseDishHandler = (id: string) => {
  history.push(`/products/${id}`);
};





  const { newProduct } = useSelector(newProductRetriever);

  console.log("newProduct:", newProduct);

  return (
    <div className={"new-products-frame"}>
      <Container>

       
        <Stack className={"main"}>
          <Box className={"category-title"}>New Product</Box>

          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {newProduct.length !== 0 ? (
                newProduct.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;

                  return (
                    <Card sx={{ width: 290, boxShadow: "lg",  borderRadius: 21,  overflow: "hidden", }}>
                     <CardOverflow sx={{ p: 0, borderTopLeftRadius: 21,
                                               borderTopRightRadius: 21,}}>
                            <img
                            key={product._id}
                            onClick={() => choseDishHandler(product._id)}
                            src={imagePath}
                             alt=""
                             style={{
                             width: "100%",
                             height: "300px",
                             objectFit: "cover",
                             display: "block",
                             cursor: "pointer"
                             }}
                             />
                      </CardOverflow>

                      <CardContent>

                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                           <Box>
                            <Typography
                            sx={{
                              fontWeight: "md",
                              fontSize: "22px",
                              color: "#1A1A1A",
                            }}
                          >
                            {product.productName}
                          </Typography>

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

                        <Typography className={"price"}
                        sx={{fontFamily: "revert", color: "green", fontWeight: 700}}
                        >
                          ${product.productPrice}
                        </Typography>
                        </Box>


                        <Box>
                          <Typography level="body-sm">
                          {product.productGender}
                        </Typography>

                        <Typography
                          level="body-xs"
                          fontSize="md"
                          textColor="#6B7280"
                          sx={{ fontWeight: "md" }}
                        >
                          {product.productAge}
                        </Typography>

                        </Box>

                        </Box>

                      </CardContent>

                      <CardOverflow>
                        <Button variant="solid" color="success" size="lg"
                        onClick={(e) => {
                onAdd({
                  _id: product._id,     // ✅
                  quantity: 1,
                  name: product.productName,
                  price: product.productPrice,
                  image: product.productImages[0],
                   });

                    e.stopPropagation();
               }}
      

                        >
                          Add to cart
                        </Button>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">
                  New products are not available!
                </Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
        


       
      </Container>
    </div>
  );
}


