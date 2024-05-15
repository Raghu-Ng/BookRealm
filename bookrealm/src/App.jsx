import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/util/ScrollToTop.js";
import fire from "./firebase/Firebase.js";
import BookApprovalpage from "./pages/admin/admin.js";
import BookDetailsPage from "./pages/bookdetailspage/BookDetails.js";
import BookSendpage from "./pages/bookfunctions/booksendpage.js";
import BooksPage from "./pages/bookspage/BooksPage.js";
import BookUpload from "./pages/bookuploadpage/bookUpload.js";
import CartPage from "./pages/cartpage/Cartpage.js";
import HomePage from "./pages/homepage/homepage.js";
import { Login } from "./pages/loginnpage/login.js";
import MyBookspage from "./pages/mybooks/myBookspage.js";
import SearchPage from "./pages/searchpage/SearchPage.js";
import { Signup } from "./pages/signuppage/signup.js";
import { UserPortal } from "./pages/userportal/UserPortal.js";
import AdminTransactions from "./pages/admin/admintxn.js";
// import { Portalstate } from "./pages/userportal/context/Portalstate.js";
import CartState from "./pages/context/CartState.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReadBook from "./pages/mybooks/readBook.js";
import MyPublications from "./pages/mypublications/mypublications.js";

export const userContext = createContext({});
export const cartContext = createContext({});

const App = () => {
  const auth = getAuth(fire);
  const [authenticateUser, setauthenticateUser] = useState("");
  const [cartItem, setcartItem] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  // console.log(cartItem,'from app.js')

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user, "from app.js");
      // console.log("userId", user.uid);
      if (user) {
        localStorage.setItem("userId", user.uid);
        setauthenticateUser(user);
      } else {
        localStorage.removeItem("userId");
        setauthenticateUser(null);
      }
    });
  }, [onAuthStateChanged]);

  useEffect(() => {
    let total = 0;
    cartItem.forEach((item) => {
      total = total + parseInt(item.price);
    });
    setTotalAmount(total);
  }, [cartItem]);

  return (
    <ScrollToTop>
      <userContext.Provider value={authenticateUser}>
        {/* <Portalstate> */}
        <cartContext.Provider value={{ cartItem, totalAmount, setcartItem }}>
          <CartState>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/book-details/:id" element={<BookDetailsPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/bookupload" element={<BookUpload />} />
              <Route path="/user" element={<UserPortal />} />
              <Route path="/admin" element={<BookApprovalpage />} />
              <Route path="/list" element={<BookSendpage />} />
              <Route
                path="/transactions"
                element={<AdminTransactions />}
              />
              <Route path="/mypublications" element={<MyPublications />} />
              <Route path="/mybooks" element={<MyBookspage />} />
              <Route path="/mybook/:id" element={<ReadBook />} />
            </Routes>
          </CartState>
        </cartContext.Provider>
        {/* </Portalstate> */}
      </userContext.Provider>
      {/* <ToastContainer /> */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </ScrollToTop>
  );
};

export default App;
