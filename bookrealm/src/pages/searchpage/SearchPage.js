import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/layouts/navbar/Navbar";
import Footer from "../../components/layouts/footer/footer";
import "./searchpage.styles.css";
import axios from "axios";
// import { book } from "../../util/bookData";
import SearchResultCard from "../../components/cards/search-result-card/SearchResultCard";
import { toast } from "react-toastify";

const SearchPage = () => {
  const location = useLocation();
  const [searchResult, setSearchResult] = useState([]);
  const [bookdata, setbookdata] = useState({});

  // useEffect(() => {
  //   let searchValue = [];

  //   searchValue = book.filter((data) =>
  //     data.book_name.toLowerCase().includes(location.state.toLowerCase())
  //   );

  //   setSearchResult(searchValue);
  // }, [location.state]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://bookrealm.onrender.com/book");
        console.log("Books", response);
        setbookdata(response.data);
        // Assuming the response data is an array of books, filter them based on the search query
        const searchValue = response.data.filter((data) =>
          data.title.toLowerCase().includes(location.state.toLowerCase())
        );
        setSearchResult(searchValue);
        
      } catch (error) {
        console.error("Error fetching book:", error.message);
      }
    };

    fetchBooks(); // Call the fetchBooks function
  }, [location.state]); // Dependency array to re-run the effect when location.state changes



  return (
    <section>
      <Navbar darkTheme={true} />
      <div className="search-result-container">
        <div className="container">
          <h2 className="text-secondary"><b>Your <span className="text-primary">Search </span></b>Result</h2>
          {searchResult.map((result) => (
            <SearchResultCard key={result.id} bookData={result} />
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default SearchPage;
