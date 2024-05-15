// import React, { useState, useEffect } from 'react';

// function BookApprovalRequests() {
//     const [books, setBooks] = useState([]);

//     useEffect(() => {
//         fetchBooks();
//     }, []);

//     const fetchBooks = async () => {
//         try {
//             const response = await fetch('https://bookrealm.onrender.com/admin/approvalrequests');
//             if (!response.ok) {
//                 throw new Error('Failed to fetch books');
//             }
//             const data = await response.json();
//             setBooks(data);
//         } catch (error) {
//             console.error('Error fetching books:', error);
//         }
//     };

//     const approveBook = async (bookId) => {
//         try {
//             const response = await fetch(`https://bookrealm.onrender.com/admin/${bookId}/approve`, {
//                 method: 'PATCH'
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to approve book');
//             }
//             fetchBooks(); // Refresh book list after approval
//         } catch (error) {
//             console.error('Error approving book:', error);
//         }
//     };

//     const rejectBook = async (bookId) => {
//         try {
//             const response = await fetch(`https://bookrealm.onrender.com/admin/${bookId}/reject`, {
//                 method: 'PATCH'
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to reject book');
//             }
//             fetchBooks(); // Refresh book list after rejection
//         } catch (error) {
//             console.error('Error rejecting book:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Book Approval Requests</h1>
//             <div>
//                 {books.map(book => (
//                     <div key={book._id}>
//                         <p>Title: {book.title}</p>
//                         <p>Author: {book.authors}</p>
//                         <p>Genre: {book.type}</p>
//                         <button onClick={() => approveBook(book._id)}>Approve</button>
//                         <button onClick={() => rejectBook(book._id)}>Reject</button>
//                         <hr />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default BookApprovalRequests;

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function BookApprovalRequests() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        "https://bookrealm.onrender.com/admin/approvalrequests"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const approveBook = async (bookId) => {
    try {
      const response = await fetch(
        `https://bookrealm.onrender.com/admin/${bookId}/approve`,
        {
          method: "PATCH",
        }
      );
      if (!response.ok) {
        toast.error('failed to approve book')
        throw new Error("Failed to approve book");
      }
      fetchBooks(); // Refresh book list after approval
      toast.success('book successfully approved')
    } catch (error) {
      console.error("Error approving book:", error);
      toast.error('some error occured while approving the book')
    }
  };

  const rejectBook = async (bookId) => {
    try {
      const response = await fetch(
        `https://bookrealm.onrender.com/admin/${bookId}/reject`,
        {
          method: "PATCH",
        }
      );
      if (!response.ok) {
        toast.error('failed to failed book')
        throw new Error("Failed to reject book");
      }
      fetchBooks();
      toast.success('book successfully rejected')
    } catch (error) {
      console.error("Error rejecting book:", error);
      toast.error('some error occured while rejecting the book')
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Book Approval Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col"
          >
            <h2 className="text-xl font-bold mb-2">{book.title}</h2>
            <p className="mb-2">Author: {book.authors}</p>
            <p className="mb-4">Genre: {book.type}</p>
            <div className="flex justify-between mt-auto">
              <button
                onClick={() => approveBook(book._id)}
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 transition-colors duration-300"
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "0.5rem",
                }}
              >
                Approve
              </button>
              <button
                onClick={() => rejectBook(book._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "0.5rem",
                }}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookApprovalRequests;
