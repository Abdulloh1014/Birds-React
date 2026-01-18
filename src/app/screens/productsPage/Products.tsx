import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Rating,
} from "@mui/material";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(
  retrieveProducts,
  (products) => ({ products })
);

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 6,
    order: "createdAt",
    productCollection: ProductCollection.PARROT,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS */

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProdutHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const choseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection="column" alignItems="center">
          <Stack className={"rest-sarlavxa-bolim"}>
            <Box className={"burak-sarlavxa"}>Menu Product</Box>

            <Box
              sx={{ position: "relative", display: "flex" }}
              className={"inputt"}
            >
              <input
                type={"search"}
                placeholder={"Type here"}
                name={"singleResearch"}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProdutHandler();
                }}
                style={{
                  width: "253px",
                  height: "37px",
                  padding: "0 40px 0 12px",
                  borderRadius: "17px",
                  border: "1px solid #ccc",
                  outline: "none",
                  fontSize: "14px",
                  marginRight: "63px",
                }}
              />

              <Button
                color={"success"}
                variant={"contained"}
                onClick={searchProdutHandler}
                style={{
                  position: "absolute",
                  right: "0",
                  top: "0",
                  height: "height: 36px,",
                  width: "99px",
                  border: "none",
                  borderRadius: "17px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                SEARCH
                <SearchIcon sx={{ fontSize: "20px" }} />
              </Button>
            </Box>
          </Stack>

          <Stack className={"right-top-btn"}>
            <Stack className={"btn-group"}>
              <Button
                variant={"contained"}
                className={"btn-left"}
                color={
                  productSearch.order === "createdAt"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>

              <Button
                variant={"contained"}
                className={"btn-left"}
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>

              <Button
                variant={"contained"}
                className={"btn-left"}
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productViews")}
              >
                Wiews
              </Button>
            </Stack>
          </Stack>

          <Stack className={"cards-frame"}>
            <Stack className={"cards-btn"}>
              <div className={"card-left-btn"}>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.PARROT
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.PARROT)
                  }
                >
                  PARROT
                </Button>

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.CANARIES
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.CANARIES)
                  }
                >
                  CANARIES
                </Button>

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.PIGEONS
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.PIGEONS)
                  }
                >
                  PIGEONS
                </Button>

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.QUAILS
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.QUAILS)
                  }
                >
                  QUALIS
                </Button>

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.PHEASANTS
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.PHEASANTS)
                  }
                >
                  PHEASANTS
                </Button>

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.PEACOCKS
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.PEACOCKS)
                  }
                >
                  PEACOCKS
                </Button>

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.EXOTIC
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.EXOTIC)
                  }
                >
                  EXOTIC
                </Button>
              </div>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;

                  return (
                    <Card 
                    
                    key={product._id}
                        
                       sx={{
                       width: 310,
                       height: 400,
                        borderRadius: 3,
                           boxShadow: 3,
                           }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                        }}
                      >
                        <CardMedia
                         onClick={() => choseDishHandler(product._id)}
                        className={"product-cards"}
                          component="img"
                          height="240"
                          src={imagePath}
                          alt="Premium Laptop"
                          sx={{cursor:"pointer",
                     objectFit: "cover",
                      }}
                        />

                        <Chip
                          label={product.productAge}
                          color="success"
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            fontWeight: 600,
                          }}
                        />
                      </Box>

                      <CardContent>
                        <Typography
  variant="h6"
  gutterBottom
  sx={{
    fontWeight: "md",
    fontSize: "22px",
    color: "#1A1A1A",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 1, // 🔥 orani ochadi
  }}
>
  {product.productName}

  <Typography >
                          {product.productGender}
                        </Typography>
</Typography>
 


                       
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          mb={2}
                        >
                          <Box>
                            <Typography
                              variant="h6"
                              component="span"
                              sx={{fontFamily: "revert", fontSize: "22px", color: "green", fontWeight: 700}}
                            >
                              ${product.productPrice}
                            </Typography>
                          </Box>

                           

                          <Box
                            display="flex"
                            alignItems="center"
                            flexDirection="column"
                            // gap="20px"
                            paddingBottom="0px"
                            marginBottom="0px"
                          >
                           

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
                          </Box>
                        </Box>

                        <Button
                          variant="contained"
                          color="success"
                          fullWidth
                          onClick={(e) => {
                                                onAdd({
                                                    _id: product._id,
                                                    quantity: 1,
                                                    name: product.productName,
                                                    price: product.productPrice,
                                                    image: product.productImages[0],
                                                });
                                                e.stopPropagation();
                                            } }
                          
                          sx={{
                            borderRadius: 2,
                          }}
                        >
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">
                  Product are not available
                </Box>
              )}
            </Stack>
          </Stack>

          <Stack className={"pagination-section"}>
            <Pagination
  count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
  page={productSearch.page}
  onChange={paginationHandler}
            // asosiy yashil rang (MUI'da "success" = green)
  shape="rounded"
  variant="outlined"           // yoki "text" yoki umuman olib tashlasangiz bo'ladi
  sx={{
    // Butun paginationni yashil ohangda qilish
    "& .MuiPagination-ul": {
      justifyContent: "center",
    },
    "& .MuiPaginationItem-root": {
      color: "#2e7d32",           // yashil matn/rang
      borderColor: "#4caf50",     // yashil chegara
      "&:hover": {
        backgroundColor: "#e8f5e9", // och yashil hover
        borderColor: "#66bb6a",
      },
      "&.Mui-selected": {
        backgroundColor: "#4caf50 !important", // tanlangan sahifa — yorqin yashil
        color: "white",
        borderColor: "#4caf50",
        "&:hover": {
          backgroundColor: "#66bb6a !important",
        },
      },
      "&.MuiPaginationItem-ellipsis": {
        color: "#2e7d32",
      },
    },
    // Arrow iconlarini ham yashil qilish
    "& .MuiPaginationItem-icon": {
      color: "#2e7d32",
    },
  }}
  renderItem={(item) => (
    <PaginationItem
      {...item}
      components={{
        previous: ArrowBackIcon,
        next: ArrowForwardIcon,
      }}
      // Agar xohlasangiz bu yerdan ham qo'shimcha style qo'yish mumkin
    />
  )}
/>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
