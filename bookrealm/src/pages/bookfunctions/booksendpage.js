// import React from "react";
// import Navbar from "../../components/layouts/navbar/Navbar";
// import Footer from "../../components/layouts/footer/footer";
// import BookList from "./book";

// const BookSendpage = () => {
//   return (
//     <section>
//       <Navbar darkTheme={true} />
//       <BookList />
//       <Footer />
//     </section>
//   );
// };

// export default BookSendpage;


import React, { useState } from "react";
import Navbar from "../../components/layouts/navbar/Navbar";
import Footer from "../../components/layouts/footer/footer";
import BookList from "./book";
import LoginPage from "../admin/adminlogin";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const BookSendpage = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Function to authenticate admin
  const authenticateAdmin = (username) => {
    // Dummy admin authorization logic
    // Check if the username is 'admin'
    if (username === 'admin') {
      setIsAdminAuthenticated(true);
    } else {
      setIsAdminAuthenticated(false);
      // alert("You need to login as admin to access this page");
      toast('You need to login as admin to access this page')
    }
  };

  return (
    <section>
      <Navbar darkTheme={true} />
      {/* Check if admin is authenticated, if yes, render BookList, otherwise render AdminLoginPage */}
      {isAdminAuthenticated ? (
        <div>
        <div className="flex justify-center mt-4">
        <Link to="/admin" className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
          Go to Admin Page
        </Link>
      </div>

        <BookList />
        </div>
      ) : (
        <LoginPage authenticate={authenticateAdmin} />
      )}
      <Footer />
    </section>
  );
};

export default BookSendpage;
