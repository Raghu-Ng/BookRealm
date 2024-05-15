import React, { useContext, useState,useEffect } from "react";
import "./cart-item-card.style.css";
import { cartContext } from "../../../App";
import { useLocation, useNavigate } from "react-router-dom";
import CartBackendContext from "../../../pages/context/CartBackendContext";
import { toast } from "react-toastify";

const CartItemCard = ({ bookdata }) => {
  const { deleteCartItem } = useContext(CartBackendContext);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location)
  // const { cartItem, setcartItem } = useContext(cartContext);
  // const [options, setoptions] = useState(location.state ? location.state.options : {})
  // const  order_type = location.state ? location.state.type : ''
  const order_type = bookdata.order_type;
  // console.log(bookdata,'bookdata form cartcard')
  // console.log(order_type)
  // console.log(bookdata,'from cartcard');

  const handleRemove = () => {
    toast.info('item removed form the cart')
    deleteCartItem(bookdata._id)
  };


  const dateString = bookdata.date
  const date = new Date(dateString)
  const formattedDate = date.toLocaleString()
  // console.log(formattedDate)

  return (
    <section className="cart-item">
      <div className="cart-item-img-container">
        <img
          src={bookdata.image}
          alt="cart-item-img"
          className="cart-item-img"
          onClick={() => navigate(`/book-details/${bookdata.bookid}`)}
        />
      </div>
      <div className="cart-item-content-container">
        <h2 className="text-primary"><b>{bookdata.title}</b>,<small style={{ fontSize: "smaller" }}>{bookdata.authors}</small></h2>

        <div className="text-secondary">
          <p>Book-Type : {bookdata.type}</p>
          <p>Order-Type : {order_type}</p>
          {/* <p>date : {bookdata.date}</p> */}
          {order_type === 'Buy' ?
            //  <p>Quantity : {options.quantity}</p>
            //   : 
            //  <p>Hours : {options.hr}</p>
            <p>Quantity : {bookdata.rent_period}</p>
            :
            <p>Hours : {bookdata.rent_period}</p>
          }
        </div>

        <h3 className="cart-item-price"><b>&#8377;{bookdata.price}</b></h3>

        <div className="cart-btn-container">
          <div className="cart-btn-part">
            <button onClick={handleRemove} className="delete_button">
              Remove from Cart
            </button>
          </div>
          <div className="cart-date-part text-secondary" style={{ fontSize: "small" }}>
            {/* <p>date : {bookdata.date}</p> */}
            <p>Date : {formattedDate}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartItemCard;
