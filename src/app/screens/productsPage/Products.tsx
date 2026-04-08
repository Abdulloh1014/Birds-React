import React, { ChangeEvent, useEffect, useState } from "react";
import { 
  Box, Button, Container, Stack, Typography, Card, 
  CardMedia, IconButton, InputBase, Paper, Chip, 
  Pagination, PaginationItem, Grid 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TuneIcon from "@mui/icons-material/Tune";

import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

const productsRetriever = createSelector(retrieveProducts, (products) => ({ products }));

export default function Products(props: { onAdd: (item: CartItem) => void }) {
  const { onAdd } = props;
  const dispatch = useDispatch();
  const { products } = useSelector(productsRetriever);
  const history = useHistory();

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 4,
    order: "createdAt",
    productCollection: ProductCollection.PARROT,
    search: "",
  });

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const product = new ProductService();
    product.getProducts(productSearch).then((data) => dispatch(setProducts(data)));
  }, [productSearch, dispatch]);

  const handleCollectionChange = (collection: ProductCollection) => {
    setProductSearch({ ...productSearch, page: 1, productCollection: collection });
  };

  return (
    <Box sx={{ bgcolor: "#fbfcf8", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        
        {/* TOP SECTION: TITLE & SEARCH */}
        <Stack spacing={4} alignItems="center" sx={{ mb: 8 }}>
          <Box textAlign="center">
            <Typography variant="h3" fontWeight={900} sx={{ color: "#1b4332", mb: 1 }}>
              Bird Paradise
            </Typography>
            <Typography variant="body1" sx={{ color: "#52796f" }}>
             Bring the most beautiful sounds of nature into your home.
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: "4px 12px",
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", sm: 500 },
              borderRadius: "50px",
              border: "2px solid #e9edc9",
              bgcolor: "#fff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)"
            }}
          >
            <InputBase
              sx={{ ml: 2, flex: 1, fontWeight: 500 }}
              placeholder="Search for birds..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setProductSearch({ ...productSearch, search: searchText })}
            />
            <IconButton onClick={() => setProductSearch({ ...productSearch, search: searchText })} sx={{ p: "10px", color: "#2d6a4f" }}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Stack>

        <Grid container spacing={4}>
          {/* LEFT SIDE: CATEGORIES */}
          <Grid item xs={12} md={3}>
            <Stack spacing={1} sx={{ position: "sticky", top: 100 }}>
              <Typography variant="subtitle2" sx={{ ml: 1, mb: 1, color: "#95d5b2", fontWeight: 800, letterSpacing: 1.5 }}>
                COLLECTIONS
              </Typography>
              {Object.values(ProductCollection).map((coll) => (
                <Button
                  key={coll}
                  variant={productSearch.productCollection === coll ? "contained" : "text"}
                  onClick={() => handleCollectionChange(coll)}
                  sx={{
                    justifyContent: "flex-start",
                    borderRadius: "12px",
                    py: 1.5,
                    px: 3,
                    fontWeight: 700,
                    textTransform: "none",
                    bgcolor: productSearch.productCollection === coll ? "#2d6a4f" : "transparent",
                    color: productSearch.productCollection === coll ? "#fff" : "#40916c",
                    "&:hover": { bgcolor: productSearch.productCollection === coll ? "#1b4332" : "#f0f7f4" }
                  }}
                >
                  {coll}
                </Button>
              ))}
            </Stack>
          </Grid>

          {/* RIGHT SIDE: PRODUCTS */}
          <Grid item xs={12} md={9}>
            {/* SORTING BUTTONS */}
            <Stack direction="row" spacing={2} sx={{ mb: 4, justifyContent: "flex-end" }}>
              {["createdAt", "productPrice", "productViews"].map((order) => (
                <Chip
                  key={order}
                  label={order === "createdAt" ? "Newest" : order === "productPrice" ? "Price" : "Popular"}
                  onClick={() => setProductSearch({ ...productSearch, order })}
                  variant={productSearch.order === order ? "filled" : "outlined"}
                  sx={{
                    fontWeight: 600,
                    cursor: "pointer",
                    bgcolor: productSearch.order === order ? "#40916c" : "transparent",
                    color: productSearch.order === order ? "#fff" : "#40916c",
                    borderColor: "#40916c"
                  }}
                />
              ))}
            </Stack>

            <Grid container spacing={3}>
              {products.length !== 0 ? (
                products.map((product: Product) => (
                  <Grid item xs={12} sm={6} key={product._id}>
                    <Card
                      sx={{
                        borderRadius: "24px",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.02)",
                        transition: "0.3s",
                        border: "1px solid #f0f0f0",
                        "&:hover": { transform: "translateY(-10px)", boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }
                      }}
                    >
                      <Box sx={{ position: "relative", m: 1.5 }}>
                        <CardMedia
                          component="img"
                          height="320"
                          image={`${serverApi}/${product.productImages[0]}`}
                          sx={{ borderRadius: "20px", cursor: "pointer" }}
                          onClick={() => history.push(`/products/${product._id}`)}
                        />
                        <Chip
                          label={product.productAge}
                          sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            bgcolor: "rgba(255,255,255,0.9)",
                            backdropFilter: "blur(4px)",
                            fontWeight: 700,
                            color: "#1b4332"
                          }}
                        />
                        <IconButton
                          onClick={() => onAdd({
                            _id: product._id,
                            quantity: 1,
                            name: product.productName,
                            price: product.productPrice,
                            image: product.productImages[0],
                          })}
                          sx={{
                            position: "absolute",
                            bottom: -20,
                            right: 20,
                            bgcolor: "#d8f3dc",
                            color: "#1b4332",
                            "&:hover": { bgcolor: "#b7e4c7" },
                            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                          }}
                        >
                          <ShoppingCartIcon />
                        </IconButton>
                      </Box>

                      <Box sx={{ p: 3, pt: 3 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                          <Typography variant="h6" fontWeight={800} sx={{ color: "#1b4332" }}>
                            {product.productName}
                          </Typography>
                          <Typography variant="body2" sx={{ bgcolor: "#f0f7f4", px: 1.5, py: 0.5, borderRadius: "8px", color: "#2d6a4f", fontWeight: 700 }}>
                            {product.productGender}
                          </Typography>
                        </Stack>
                        
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="h5" sx={{ color: "#2d6a4f", fontWeight: 900 }}>
                            ${product.productPrice}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <VisibilityIcon sx={{ fontSize: 16, color: "#95d5b2" }} />
                            <Typography variant="caption" sx={{ color: "#52796f", fontWeight: 600 }}>
                              {product.productViews}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Box sx={{ width: "100%", textAlign: "center", py: 10 }}>
                  <Typography variant="h6" color="text.secondary">There are currently no birds available.
</Typography>
                </Box>
              )}
            </Grid>

            {/* PAGINATION */}
            <Stack sx={{ mt: 8 }} alignItems="center">
              <Pagination
                count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
                page={productSearch.page}
                onChange={(e, v) => setProductSearch({ ...productSearch, page: v })}
                renderItem={(item) => (
                  <PaginationItem
                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    {...item}
                    sx={{
                      borderRadius: "12px",
                      fontWeight: 700,
                      "&.Mui-selected": { bgcolor: "#2d6a4f", color: "#fff", "&:hover": { bgcolor: "#1b4332" } }
                    }}
                  />
                )}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}