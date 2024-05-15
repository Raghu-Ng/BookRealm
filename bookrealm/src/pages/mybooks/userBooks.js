import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserBooksGrid = ({ userId }) => {
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await axios.get(
          `https://bookrealm.onrender.com/transaction/${userId}`
        );
        const cartItems = response.data;
        if (cartItems.length) {
          const booksPromises = cartItems.map(async (item) => {
            const bookResponse = await axios.get(
              `https://bookrealm.onrender.com/book/${item.bookid}`
            );
            return {
              ...bookResponse.data,
              rent_period: item.rent_period,
              date: item.date,
              txn_type: item.type,
            };
          });
          const books = await Promise.all(booksPromises);
          setUserBooks(books);
        }
      } catch (error) {
        console.error("Error fetching user books:", error);
      }
    };

    fetchUserBooks();
  }, [userId]);


  const isBookExpired = (book) => {
    if (book.type !== "rent") {
      return false;
    }
    const expiryDate = new Date(book.date);
    expiryDate.setHours(expiryDate.getHours() + book.rent_period);
    return new Date() > expiryDate;
  };

  return (
    <div>
      <h2 className="font-semibold text-primary text-center mt-4 text-3xl">
        Your Books
      </h2>
      <div>
        {userBooks.map((book, index) => (
          <div key={index} className="max-w-sm rounded shadow-lg m-4">
            <img className="w-full" src={book.image} alt={book.title} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{book.title}</div>
              <p className="text-gray-700 text-base">{book.authors}</p>
              <p className="text-gray-700 text-sm">{book.price}</p>
              <p className="text-gray-500 text-sm my-1">{book.subtitle}</p>
              {(book.type === "ebook" &&
                book.txn_type === "rent" &&
                !isBookExpired(book)) ||
              book.txn_type === "buy" ? (
                <Link to={"/mybook/" + book._id}>
                  <button className="button-primary">Read Now!</button>
                </Link>
              ) : book.type === "rent" && isBookExpired(book) ? (
                <p className="text-[#FF0000]">This book is expired.</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBooksGrid;
