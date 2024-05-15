// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const BookList = () => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://bookrealm.onrender.com/book/');
//         console.log('Response data:', response.data); // Logging response data
//         setBooks(response.data);
//       } catch (error) {
//         console.error('Error fetching books:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   const deleteBook = async (id) => {
//     try {
//       await axios.delete(`/api/books/delete/${id}`);
//       setBooks(books.filter(book => book._id !== id));
//     } catch (error) {
//       console.error('Error deleting book:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Book List</h1>
//       <ul>
//         {books.map(book => (
//           <li key={book._id}>
//             <div>
//               <h2>{book.title}</h2>
//               <p>{book.subtitle}</p>
//               <p>Authors: {book.authors}</p>
//               <img src={book.image} alt={book.title} />
//               <p>Type: {book.type}</p>
//               <p>Language: {book.language}</p>
//               <p>Price: {book.price}</p>
//               <p>Book Length: {book.book_length}</p>
//               <button onClick={() => deleteBook(book._id)}>Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BookList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://bookrealm.onrender.com/book/");
        console.log("Response data:", response.data); // Logging response data
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchData();
  }, []);

  const deleteBook = async (id) => {
    try {
      await axios.delete(`https://bookrealm.onrender.com/book/delete/${id}`);
      setBooks(books.filter((book) => book._id !== id));
     toast.info('book is deleted')
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error('error deleting the book')
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Book List</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id} className="mb-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-2">{book.title}</h2>
              <p className="text-gray-700 mb-2">{book.subtitle}</p>
              <p className="text-gray-600 mb-2">Authors: {book.authors}</p>
              <img
                src={book.image}
                alt={book.title}
                className="rounded-md mb-2"
              />
              <p className="text-gray-600 mb-2">Type: {book.type}</p>
              <p className="text-gray-600 mb-2">Language: {book.language}</p>
              <p className="text-gray-600 mb-2">Price: {book.price}</p>
              <p className="text-gray-600 mb-2">
                Book Length: {book.book_length}
              </p>
              <button
                onClick={() => deleteBook(book._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "0.5rem",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
