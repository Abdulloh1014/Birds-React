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


/** REDUX SLICE & SELECTOR   */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),

});
const productsRetriever = createSelector(
  retrieveProducts,
  (products) => ({products})
);

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
     const { onAdd } = props; 
     const { setProducts } = actionDispatch(useDispatch());
     const {products} = useSelector(productsRetriever);
     const [productSearch, setProductSearch] = useState<ProductInquiry>({
        page: 1,
        limit: 8,
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
        if(searchText === "") {
            productSearch.search = "";
            setProductSearch({ ...productSearch });
        }
    }, [searchText])

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
        setProductSearch({...productSearch});
    };

    const paginationHandler = (e: ChangeEvent<any>, value: number) => {
       productSearch.page = value;
       setProductSearch({...productSearch})
    };

    const choseDishHandler = (id: string) => {
      history.push(`/products/${id}`);
    }

    return (
        <div className={"products"}>
            <Container>
                <Stack flexDirection="column" alignItems="center">

                    <Stack className={"rest-sarlavxa-bolim"}>

                        <Box className={"burak-sarlavxa"}>
                            Burak Restaurant
                        </Box>

                        <Box sx={{ position: "relative", display: "flex", }}
                        className={"inputt"}>
                            <input
                                
                                type={"search"}
                                placeholder={"Type here"}
                                name={"singleResearch"}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => { if ( e.key === "Enter") searchProdutHandler();

                                 }}
                                  
                                style={{
                                    width: "253px",
                                    height: "37px",
                                    padding: "0 40px 0 12px",
                                    borderRadius: "17px",
                                    border: "1px solid #ccc",
                                    outline: "none",
                                    fontSize: "14px",
                                    marginRight: "63px"
                                    
                                }}
                            />

                            <Button color={"primary"} variant={"contained"}
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
                          productSearch.order === "createdAt" ? "primary" : "secondary"}
                          onClick={() => searchOrderHandler("createdAt") }
                          >
                          New
                        </Button>
                        <Button
                         variant={"contained"}
                          className={"btn-left"}
                          color={
                          productSearch.order === "productPrice" ? "primary" : "secondary"}
                          onClick={() => searchOrderHandler("productPrice") }
                          >
                            
                          Price
                        </Button>
                        <Button
                         variant={"contained"}
                          className={"btn-left"}
                           color={
                          productSearch.order === "productViews" ? "primary" : "secondary"}
                          onClick={() => searchOrderHandler("productViews") }
                          >
                          Wiews
                        </Button>

                        </Stack>
                    </Stack>

 
                    <Stack className={"cards-frame"}>

                        <Stack className={"cards-btn"}>
                            <div className={"card-left-btn"}>

                                <Button variant={"contained"} 
                                    color={
                                    productSearch.productCollection === ProductCollection.PARROT 
                                    ? "primary" : "secondary"}
                                    onClick={() => searchCollectionHandler(ProductCollection.PARROT)}>
                                     PARROT
                                </Button>

                                <Button variant={"contained"} 
                                    color={
                                    productSearch.productCollection === ProductCollection.CANARIES
                                    ? "primary" : "secondary"}
                                    onClick={() => searchCollectionHandler(ProductCollection.CANARIES)}>
                                     CANARIES
                                </Button>

                                <Button variant={"contained"} 
                                    color={
                                    productSearch.productCollection === ProductCollection.PIGEONS 
                                    ? "primary" : "secondary"}
                                    onClick={() => searchCollectionHandler(ProductCollection.PIGEONS)}>
                                     PIGEONS
                                </Button>

                                <Button variant={"contained"} 
                                    color={
                                    productSearch.productCollection === ProductCollection.QUAILS 
                                    ? "primary" : "secondary"}
                                    onClick={() => searchCollectionHandler(ProductCollection.QUAILS)}>
                                     QUALIS
                                </Button>

                                <Button variant={"contained"} 
                                    color={
                                    productSearch.productCollection === ProductCollection.PHEASANTS 
                                    ? "primary" : "secondary"}
                                    onClick={() => searchCollectionHandler(ProductCollection.PHEASANTS)}>
                                     PHEASANTS
                                </Button>

                            </div>
                        </Stack>

                        <Stack className={"product-wrapper"}>
                            {products.length !== 0 ? (
                                products.map((product: Product) => {
                                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                                    const sizeVolume = 
                                    product.productCollection === ProductCollection.PARROT
                                    ? product.productCollection + " litre"
                                    : product.productAge + " size";
                                    return (
                                        <Stack key={product._id} className={"product-card"}
                                        onClick={() => choseDishHandler(product._id)}
                                        >
                                            <Stack 
                                            className={"product-img"}
                                            sx={{ backgroundImage: `url(${imagePath})`,  }}
                                            >
                                            
                                            <div className={"product-sale"}>{sizeVolume}</div>
                                            <Button
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
                                            >
                                                <img 
                                                className="shopping-icon"
                                                src={"/icons/shopping-cart.svg"} 
                                                style={{ display: "flex"}} 
                                                />
                                            </Button>
                                            <Button className={"view-btn"} sx={{right: "36px"}}>
                                                <Badge badgeContent={product.productViews} color="secondary">
                                                    <RemoveRedEyeIcon
                                                    sx={{color: 
                                                        product.productViews === 0 ? "gray" : "white", }}
                                                      />
                                                </Badge>
                                                
                                            </Button>

                                            </Stack> 
                                            <Box className={"product-narx"}>
                                                <span className={"product-title"}>
                                                    {product.productName}
                                                </span>

                                               <div className={"product-www"}>
                                                    <MonetizationOnIcon />
                                                        {product.productPrice}
                                                </div>

                                                

                                               
                                            </Box>

                                        </Stack>
                                    );
                                })
                            ) : (
                                <Box className="no-data">Product are not available</Box>
                            )}
                        </Stack>

                    </Stack>


                    <Stack className={"pagination-section"}>
                        <Pagination 
                        count={
                            products.length !== 0
                            ? productSearch.page + 1
                            : productSearch.page
                        }
                        page={productSearch.page}
                        renderItem={(item) => (
                            <PaginationItem
                            components={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                            }}
                            {...item}
                            color={"secondary"}
                             />
                        )}
                        onChange={paginationHandler}
                        />
                    </Stack>
                </Stack>
            </Container>

             <div className={"brand-logo"}>
                <Box className={"logo-text"}> Our Family Brands</Box>
                <Stack className={"burak-foto"}>
                    <Box className={"burak-box"}><img src={"/img/gurme.webp"} alt="Safood Logo" /></Box>
                    <Box className={"burak-box"}><img src={"/img/seafood.webp"} alt="Safood Logo" /></Box>
                    <Box className={"burak-box"}><img src={"/img/sweets.webp"} alt="Safood Logo" /></Box>
                    <Box className={"burak-box"}><img src={"/img/doner.webp"} alt="Safood Logo" /></Box>
                   
                   
                </Stack>
             </div>

             <div className={"address"}>
                  <Container>
                    <Stack className={"address-area"}>
                        <Box className={"title"}>Our address</Box>
                        <iframe
                        style={{marginTop: "60"}}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4304.009129507858!2d72.35687446020327!3d40.76280806409186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bcedb3adddd9f3%3A0xa6dbbc6cd1305025!2sLazeez!5e0!3m2!1sru!2skr!4v1763290728575!5m2!1sru!2skr"
                        width="1320"
                        height="500"
                        referrerPolicy="no-referrer-when-downgrade"
                        >

                        </iframe>
                    </Stack>
                  </Container>
             </div>


        </div>

       
    );
}





