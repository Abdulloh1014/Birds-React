import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";


const initialState: HomePageState = {
    popularProduct: [],
    newProduct: [],
    topUsers: [],
};


const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setPopularProduct: (state, action) => {
            state.popularProduct = action.payload;
        },
        setNewProduct: (state, action) => {
            state.newProduct = action.payload;
        },
        setTopUsers: (state, action) => {
            state.topUsers = action.payload;
        },
    },
});

export const { setPopularProduct, setNewProduct, setTopUsers } = homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;