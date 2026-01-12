

import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";


/** REACT APP STATE  **/
export interface AppRootState {
    homePage: HomePageState;
    productsPage: ProductPageState;
    ordersPage: OrdersPageState;
}


/** HOMEPAGE **/
export interface HomePageState {
    popularProduct: Product[];
    newProduct: Product[];
    topUsers: Member[];
}

/** PRODUCTS PAGE **/
export interface ProductPageState {
    founder: Member | null;
    chosenProduct: Product | null;
    products: Product[];
}
/** ORDERS PAGE **/
export interface OrdersPageState {
    pausedOrders: Order[];
    processOrders: Order[];
    finishedOrders: Order[];
};