// import React,{useContext, useState} from "react";
// import CartBackendContext from "./CartBackendContext";
// import axios  from "axios";
// import { userContext,cartContext } from "../../App";
// import {  toast } from 'react-toastify';


// const CartState = ( props) => {
//     const {cartItem,setcartItem } = useContext(cartContext)
//     const host = "https://bookrealm.onrender.com/cart"
//     // const cartinitial = []
//     // const [cart,setcart] = useState(cartinitial)
//     const authenticateUser = useContext(userContext)
//     // console.log(authenticateUser.uid)
//     // console.log('this is cart' ,cartItem)

//     const getcartItem = async() => {
//         const response = await axios.get(`${host}/${authenticateUser.uid}`)    
//         setcartItem(response.data)  
//         console.log('cart item successfully fetched',response.data)
//     } 


//     const addCartItem = async (book_id,type,amount,time,image,author,title,order_type) => {
//         try {
//             const cartItemData = {
//                 userid: authenticateUser.uid, 
//                 bookid: book_id, 
//                 type:type, 
//                 price: amount, 
//                 rent_period: time, 
//                 image: image, 
//                 authors: author,
//                 title: title,
//                 order_type:order_type
//             };
//             const response = await axios.post(`${host}/add`, cartItemData);
//             console.log(response.data,'item added to cart successfully'); 
//         } catch (error) {
//             console.error(error);
//         }
//     };
//     const deleteCartItem = async(id) => {
//         try {
//             const response= await axios.delete(`${host}/delete/${id}`)
//             const  updatecart = cartItem.filter(item => item._id !== id)
//             setcartItem(updatecart)
//             console.log(response.data,'cartitem successfully deleted')
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     return(
//         <CartBackendContext.Provider value={{getcartItem,addCartItem,deleteCartItem}}>
//             {props.children}
//         </CartBackendContext.Provider>
//     )
// }

// export default CartState;


import React, { useContext, useState } from "react";
import CartBackendContext from "./CartBackendContext";

import axios  from "axios";
import { userContext,cartContext } from "../../App";
import {  toast } from 'react-toastify';






const CartState = (props) => {
  const { cartItem, setcartItem } = useContext(cartContext);
  const host = "https://bookrealm.onrender.com/cart";
  // const cartinitial = []
  // const [cart,setcart] = useState(cartinitial)
  const authenticateUser = useContext(userContext);
  // console.log(authenticateUser.uid)
  // console.log('this is cart' ,cartItem)

  const getcartItem = async () => {
    const response = await axios.get(`${host}/${authenticateUser.uid}`);
    setcartItem(response.data);
    console.log("cart item successfully fetched", response.data);
  };

  const addCartItem = async (
    book_id,
    type,
    amount,
    time,
    image,
    author,
    title,
    order_type
  ) => {
    try {
      const cartItemData = {
        userid: authenticateUser.uid,
        bookid: book_id,
        type: type,
        price: amount,
        rent_period: time,
        image: image,
        authors: author,
        title: title,
        order_type: order_type,
      };
      const response = await axios.post(`${host}/add`, cartItemData);
      console.log(response.data, "item added to cart successfully");
    } catch (error) {
      console.error(error);
    }
  };
  const deleteCartItem = async (id) => {
    try {
      const response = await axios.delete(`${host}/delete/${id}`);
      const updatecart = cartItem.filter((item) => item._id !== id);
      setcartItem(updatecart);
      console.log(response.data, "cartitem successfully deleted");
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <CartBackendContext.Provider
      value={{ getcartItem, addCartItem, deleteCartItem }}
    >
      {props.children}
    </CartBackendContext.Provider>
  );
};

export default CartState;
