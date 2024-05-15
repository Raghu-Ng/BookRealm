import React from "react";
import "./bookpage.style.css";
import Navbar from "../../components/layouts/navbar/Navbar";
import SearchInputForm from "../../components/form/searchInputForm/Searchinputform";
import { ProductListingAll } from "../../components/layouts/productlistingall/ProductListingAll";
import Footer from "../../components/layouts/footer/footer";

const BooksPage = () => {
  return (
    <section className="bookpage">
      <Navbar darkTheme={true} />

      <div className="search-container val">
        <h2>
          Find the <span className="text-primary">Books</span> that you want
        </h2>
        <SearchInputForm darkTheme={false} />
      </div>
      <div className="searchblock"></div>
      <ProductListingAll />
      <Footer />
    </section>
  );
};

export default BooksPage;
