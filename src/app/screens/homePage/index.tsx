import React, { useEffect } from "react";
import PopularDishes from "./PopularProduct";
import NewDishes from "./NewProduct";
import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {setNewProduct, setPopularProduct, setTopUsers} from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import "./../../../css/home.css";
import { CartItem } from "../../../lib/types/search";




/** REDUX SLICE & SELECTOR   */

const actionDispatch = (dispatch: Dispatch) => ({
  setPopularProduct: (data: Product[]) => dispatch(setPopularProduct(data)),
  setNewProduct: (data: Product[]) => dispatch(setNewProduct(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),

});

interface HomePageProps {
  onAdd: (item: CartItem) => void;
}

export default function HomePage(props: HomePageProps) {
  const { setPopularProduct, setNewProduct, setTopUsers } = actionDispatch(useDispatch());
 const { onAdd } = props;

useEffect(() => {
  // Backend server data fetch => Data
  const product = new ProductService();  
  product
  .getProducts({
    page: 1,
    limit: 4,
    order: "productViews",
    // productCollection: ProductCollection.PARROT, 
  })     //backend dan data olish
  
  .then((data) => {
    setPopularProduct(data);   // olingan datani slicega yuborish
  })
  .catch((err) => console.log(err));

  product
  .getProducts({
    page: 1,
    limit: 4,
    order: "createdAt",
    // productCollection: ProductCollection.DISH,
  })
  .then((data) => {
    setNewProduct(data);
  })
  .catch((err) => console.log(err));

  const member = new MemberService();
  member.getTopUsers()
  .then(data => {
     setTopUsers(data);
  })
  .catch((err) => console.log(err));

}, []);


  return <div className={"homepage"}>
    <PopularDishes/>
    <NewDishes  onAdd={onAdd}/>
    <Advertisement/>
    <ActiveUsers/>
    <Events/>
  </div>;
}