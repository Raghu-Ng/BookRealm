import React, { useState, useEffect } from "react";
import "./productlistingall.style.css";
import ProductListingCard from "../../cards/product-listing-card/product-listing-card/ProductListingCard";
import axios from "axios";

export const ProductListingAll = () => {
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
    <section>
      <div className="container">
        <div className="grid-container">
          {books.map((book, index) => {
            return (
              <div key={index} className="grid-item">
                <ProductListingCard bookData={book} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};