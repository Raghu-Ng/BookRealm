import React, { useContext, useEffect, useState } from "react";
import "./detailssection.style.css";
import { useParams, useNavigate } from "react-router-dom";
import { userContext, cartContext } from "../../../App";
import axios from "axios";
import CartBackendContext from "../../../pages/context/CartBackendContext";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

export const DetailsSection = () => {
  const { id } = useParams(); //console.log(id)
  const [bookdata, setbookdata] = useState([]);
  const user = useContext(userContext);
  const { cartItem, setcartItem } = useContext(cartContext);
  const [options, setoptions] = useState({ quantity: 1, hr: 1 });
  const { addCartItem, } = useContext(CartBackendContext)

  const navigate = useNavigate();

  useEffect(() => {
    //     let newData = book.filter((book) => book._id === id)
    // console.log(newData[0])
    //     setbookdata(newData[0])     //[0] to get the first element/object of the newbook array
    //   })

    //   const handleAddToCart = () => {
    //     if(user) {
    //         //add to cart
    //         setCartItems([...cartItems, bookdata]);
    //         alert(`The book ${bookdata.book_name} is added to the cart`);
    //     } else {
    //         navigate('/login');
    //         alert("Please Login or Sign up first..");
    //     }
    // }

    // let newData = book.filter((book) => book._id == id);
    // console.log(newData[0])
    // setbookdata(newData[0]); //[0] to get the first element/object of the newbook array
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`https://bookrealm.onrender.com/book/${id}`);
        console.log("Book", response);
        setbookdata(response.data);
      } catch (error) {
        console.error("Error fetching book:", error.message);
      }
    };
    fetchBooks();
  }, [id]);

  // const handelAddClick = () => {
  //   // console.log("from handeladdclick",user)
  //   if (user) {
  //     setcartItem([...cartItem, bookdata]);
  //     console.log("items in cart are", cartItem);
  //     alert(`The book ${bookdata.title} is added ot the cart`);
  //     navigate(`/book-details/${bookdata._id}`);
  //   } else {
  //     navigate("/login");
  //     alert("Please login in to your account to proceed");
  //   }
  // };
  const handelBuyClick = async () => {
    if (user) {
      const type = 'Buy'
      setcartItem([...cartItem, bookdata])
      await addCartItem(bookdata._id, bookdata.type, bookdata.price * options.quantity, options.quantity, bookdata.image, bookdata.authors, bookdata.title, type);
      // alert(`The book ${bookdata.title} is added to the cart`);
      toast(`The book ${bookdata.title} is added to the cart`)
      // navigate('/cart',{state:{options,type}})
    } else {
      navigate("/login");
      alert("Please login in to your account to proceed");
    }
  }

  const handelRentClick = async () => {
    if (user) {
      const type = "Rent"
      setcartItem([...cartItem, bookdata])
      await addCartItem(bookdata._id, bookdata.type, bookdata.price * options.hr / 30, options.hr, bookdata.image, bookdata.authors, bookdata.title, type);
      // alert(`The book ${bookdata.title} is added to the cart`);
      // navigate('/cart',{state:{options,type}})
      toast(`The book ${bookdata.title} is added to the cart`)
    } else {
      navigate("/login");
      alert("Please login in to your account to proceed");
    }
  }

  const handeloptions = (name, operation) => {
    setoptions((prev) => {
      console.log(options)
      return {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
      }
    })
  }

  return (
    <section className="deatil-section-container">
      <div className="container">
        <div className="flex-container">
          <div className="book-img-container">
            <img src={bookdata.image} alt="book" className="bookimg" />
          </div>
          <div className="book-detail-container">
            <h2 className="text-primary"><b>{bookdata.title}</b></h2>
            <p className="text-primary">{bookdata.authors}</p>
            <div className="book--details-container-text text-secondary">

            <p className="book-description text-secondary">{bookdata.subtitle}</p>
            <p>
              <b>Book-Type : </b>
              {bookdata.type}
            </p>
            <p>
              <b>Language : </b>
              {bookdata.language}
            </p>
            <p>
              <b>Book Length : </b>
              {bookdata.book_length}
            </p>
            {/* <p>
              {bookdata.url}
            </p> */}
            </div>

            <h3> &#8377;{bookdata.price}</h3>


<div className="add-to-cart-details-section">
<div className="add-to-cart-details-section-text">

<p className="text-secondary"><small>{bookdata.type === 'ebook'?  "Buy or Rent the book by selecting the quantity or hours of rent " : "Select the quantity of books and add to cart "}</small> </p>
</div>
            <div className="add-to-cart-part">

              <div className="add-to-cart-buy">
                <div className="doptioncounter">
                  <button className="doptioncounterbuttonn" disabled={options.quantity <= 1} onClick={() => handeloptions('quantity', 'd')}>-</button>
                  <p className="doptioncounterbutton text-secondary" >{options.quantity}</p>
                  <button className="doptioncounterbuttonn" onClick={() => handeloptions('quantity', 'i')}>+</button>
                </div>
                <button className=" button-primary" onClick={handelBuyClick}>Buy <FontAwesomeIcon icon={faCartShopping} />
                </button>
              </div>

             {bookdata.type === 'ebook' ? <div className="add-to-cart-rent">
                <div className="doptioncounter">
                  <button className="doptioncounterbuttonn" disabled={options.hr <= 1} onClick={() => handeloptions('hr', 'd')}>-</button>
                  <p className="doptioncounterbutton text-secondary" >{options.hr}</p>
                  <button className="doptioncounterbuttonn" onClick={() => handeloptions('hr', 'i')}>+</button>
                </div>
                <button className="button-primary" onClick={handelRentClick}>Rent <FontAwesomeIcon icon={faCartShopping} />
                </button>
              </div> : ''}

            </div>
</div>






          </div>
        </div>
      </div>
    </section>
  );
};
