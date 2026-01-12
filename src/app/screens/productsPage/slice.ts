import { createSlice } from "@reduxjs/toolkit";
import { ProductPageState } from "../../../lib/types/screen";


const initialState: ProductPageState = {
    founder: null,
    chosenProduct: null,
    products: [],
}

const productPageSlice = createSlice({
    name: "productPage",
    initialState,
    reducers: {
        setFounder:(state, action) => {
            state.founder = action.payload;
        },
        setChosenProduct:(state, action) => {
            state.chosenProduct = action.payload;
        },
        setProducts:(state, action) => {
            state.products = action.payload;
        },
    },
});

export const { setFounder, setChosenProduct, setProducts } = 
productPageSlice.actions;

const ProductsPageReducer = productPageSlice.reducer;
export default ProductsPageReducer;