import React from "react";
import Footer from "../../components/layouts/footer/footer";
import Navbar from "../../components/layouts/navbar/Navbar";
import ApprovalGrid from "./bookApproval";
import { Link } from "react-router-dom";
import "./mypublications.style.css";

const MyPublications = () => {
  let userId = localStorage.getItem("userId");

  return (
    <section className="MyBookspage">
      <Navbar darkTheme={true} />
      <div className="upload-button-container">
        <Link to="/bookupload">
          <button className="button-primary">Upload a book</button>
        </Link>
      </div>
      <ApprovalGrid userId={userId} />
      <Footer />
    </section>
  );
};

export default MyPublications;
