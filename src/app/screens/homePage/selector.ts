import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";


const selectHomePage = (state: AppRootState) => state.homePage;

export const retrievePopularProduct = createSelector(
    selectHomePage,
    (homePage) => homePage.popularProduct
);

export const retrieveNewProduct = createSelector(
    selectHomePage,
    (homePage) => homePage.newProduct
);

export const retrieveTopUsers = createSelector(
    selectHomePage,
    (homePage) => homePage.topUsers
);