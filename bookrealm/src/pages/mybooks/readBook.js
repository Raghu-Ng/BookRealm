import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
// import { Document, Page, pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();

// import { Viewer, Worker } from "@react-pdf-viewer/core";

// function MyPdfViewer({ fileUrl }) {
//   return (
//     <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
//       <Viewer fileUrl={fileUrl} />
//     </Worker>
//   );
// }

function ReadBook() {
  const { id } = useParams();
  const [userBooks, setUserBooks] = useState("");
  const [isBookInTransactions, setIsBookInTransactions] = useState(false);
  const [transaction, setTransaction] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchUserBooks = async () => {
      try {
        const response = await axios.get(
          `https://bookrealm.onrender.com/transaction/${userId}`
        );
        const transactions = response.data;
        // const bookIdsInTransactions = transactions.map(
        //   (transaction) => transaction.bookid
        // );
        // setIsBookInTransactions(bookIdsInTransactions.includes(id));
        const bookTransaction = transactions.find(
          (transaction) => transaction.bookid === id
        );

        if (bookTransaction) {
          if (bookTransaction.type === "rent") {
            const expiryDate = new Date(bookTransaction.date);
            expiryDate.setHours(
              expiryDate.getHours() + bookTransaction.rent_period
            );
            if (new Date() < expiryDate) {
              setIsBookInTransactions(true);
              setTransaction(bookTransaction);
            }
          } else {
            setIsBookInTransactions(true);
            setTransaction(bookTransaction);
          }
        }
        if (bookTransaction) {
          const book = await axios.get(`https://bookrealm.onrender.com/book/${id}`);
          if (book) {
            setUserBooks(book.data);
          }
        }
      } catch (error) {
        console.error("Error fetching user transactions:", error);
      }
    };

    fetchUserBooks();
  }, [id]);

  return (
    <div className="h-screen">
      {isBookInTransactions ? (
        // <div>
        //   <h2>Book Details</h2>
        //   <Document
        //     file={url}
        //     options={{ workerSrc: "/pdf.worker.js" }}
        //     onContextMenu={(e) => e.preventDefault()}
        //   >
        //     <Page pageNumber={1} />
        //   </Document>
        // </div>
        <div>
          <h2 className="font-semibold text-primary text-center mt-4 text-3xl my-4">
            {userBooks.title}
          </h2>
          {/* <p>Return date: {transaction.date.setHours(transaction.date.getHours() + transaction.rent_period)}</p> */}
          <embed
            src={userBooks.url + "#toolbar=0"}
            className="mx-auto h-screen w-[90%]"
          />
        </div>
      ) : (
        <h2>Unauthorised access</h2>
      )}
    </div>
  );
}

export default ReadBook;
