import React from "react";
import { Link } from "react-router-dom";
import "./searchresultcard.styles.css";


const SearchResultCard = ({ bookData }) => {
  console.log(bookData);


  return (
    <section className="cart-item">
      <div className="cart-item-img-container">
        <img
          src={bookData.image}
          alt="cart-item-img"
          className="cart-item-img"
        />
      </div>
      <div className="cart-item-content-container">
        <div className="seacrh-item-container-text text-primary">

          <h2>{bookData.title}</h2>
          <p className="text-secondary">{bookData.authors}</p>
        </div>
        <div className="product-details-btn">

          <Link to={`/book-details/${bookData._id}`} className="button-primary">
            Product Details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SearchResultCard;
