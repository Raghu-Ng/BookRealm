import React, { useState, useEffect } from "react";
import "./productListing.styles.css";
import ProductListingCard from "../../cards/product-listing-card/product-listing-card/ProductListingCard";
import axios from "axios";

const ProductListing = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://bookrealm.onrender.com/book");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-listing-container">
      <div className="container">
        <h2>
          Here are some <span className="text-primary">books</span> that you
          might like
        </h2>
        <div className="listings-wrapper">
          {books.slice(0, 4).map((book, index) => (
            <ProductListingCard key={index} bookData={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
