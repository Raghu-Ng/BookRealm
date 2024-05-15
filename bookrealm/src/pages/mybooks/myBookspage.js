import React from "react";
import Footer from "../../components/layouts/footer/footer";
import Navbar from "../../components/layouts/navbar/Navbar";
import UserBooksGrid from "./userBooks";

const MyBookspage = () => {
  let userId = localStorage.getItem("userId");

  return (
    <section className="MyBookspage">
      <Navbar darkTheme={true} />
      <UserBooksGrid userId={userId} />
      <Footer />
    </section>
  );
};

export default MyBookspage;
