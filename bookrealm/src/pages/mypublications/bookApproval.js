import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './mypublications.style.css'


const ApprovalGrid = ({ userId }) => {
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await axios.get(
          `https://bookrealm.onrender.com/book/approval/${userId}`
        );
        const books = response.data;
        setUserBooks(books);
      } catch (error) {
        console.error("Error fetching user books:", error);
      }
    };

    fetchUserBooks();
  }, [userId]);

  return (
    <div className="container-book-approval">
      <h2 className="font-semibold text-secondary text-center mt-4 text-3xl">
        Your Book Approval Requests
      </h2>
      <div className="book--approval-wrapper">
        {userBooks.map((book) => (
          <div key={book._id} className="max-w-sm rounded shadow-lg m-4 book-approval-card">
            <img className="w-full" src={book.image} alt={book.title} />
            <div className="px-6 py-4">
              <div className="book-approval-card-text"> 
              <div className="font-bold text-xl mb-2">Title : { book.title}</div>

              <p className="">Author : {book.authors}</p>
              <p className="text-sm">Price : {book.price}</p>
              <p className="text-sm my-1">Description : {book.subtitle}</p>
              </div>
              {book.approved === "Approved" ? (
                <Link to={"/book-details/" + book._id}>
                  <p className="text-[#2cfc03] text-sm ">  Status : {book.approved}</p>
                </Link>
              ) : (
                <p className="text-[#fc0303] text-sm">Status : {book.approved}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalGrid;
