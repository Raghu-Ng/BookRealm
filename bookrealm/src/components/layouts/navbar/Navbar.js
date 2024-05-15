import React, { useContext, useState, useEffect } from "react";
import "./navbar.styles.css";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from "firebase/auth";
import fire from "../../../firebase/Firebase";
import axios from "axios";

export default function Navbar({ darkTheme, darkTextTheme }) {
  const user = useContext(userContext);
  const navigate = useNavigate();
  const auth = getAuth(fire);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `https://bookrealm.onrender.com/user/id/${user.uid}`
          );
          console.log("fetch success for navbar");
          setUserData(response.data);
          // console.log(response)
        } catch (error) {
          console.error("Error fetching user data:", error);
          // toast.error('Error fetching your information,check your network')
        }
      }
    };
    fetchUserData();
  }, [user]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const imageData = localStorage.getItem("selectedFile");

  const handelLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userId");
        localStorage.removeItem("selectedFile");
        console.log("logout successful");
        navigate("/");
        console.log(user, "after logout");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section
      className={
        darkTheme
          ? "background-dark navbar-container relative"
          : "background-transparent navbar-container"
      }
    >
      <div className="container flex justify-between align-center">
        <Link to="/" className="logo">
          Book<span className="text-primary">Realm</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </div>

        <nav className={`nav-link-container ${isMenuOpen ? "active " : ""}`}>
          <Link
            to="/"
            className={`${darkTextTheme ? "nav-links-dark" : "nav-links"} `}
          >
            Home
          </Link>
          <Link
            to="/books"
            className={`${darkTextTheme ? "nav-links-dark" : "nav-links"} `}
          >
            Books
          </Link>
          {user ? (
            <>
              <Link
                onClick={handelLogout}
                to="/"
                className={`${darkTextTheme ? "nav-links-dark" : "nav-links"} `}
              >
                Logout
              </Link>
              <Link
                to="/cart"
                className={`${
                  darkTextTheme
                    ? "nav-links-dark cart-link"
                    : "nav-links cart-link"
                } `}
              >
                <FontAwesomeIcon icon={faCartShopping} />
              </Link>
              <div className=" ml-5" style={{ color: "white" }}>
                <p>hi , user </p>
                {/* <p>hi , {userData.first_name} </p> */}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`${darkTextTheme ? "nav-links-dark" : "nav-links"} `}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`${darkTextTheme ? "nav-links-dark" : "nav-links"} `}
              >
                Sign up
              </Link>
            </>
          )}
          <Link
            to={`${user ? "/user" : "/login"}`}
            onClick={() => {
              if (!user) {
                alert("Please Login to view your profile");
              }
            }}
            className={`${
              darkTextTheme ? "nav-links-dark cart-link" : "nav-links cart-link"
            } `}
          >
            <div className="relative ml-3">
              <button
                type="button"
                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                {user ? (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={
                      imageData
                        ? imageData
                        : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    }
                    alt=""
                  />
                ) : (
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                )}
              </button>
            </div>
          </Link>
        </nav>
      </div>
    </section>
  );
}
