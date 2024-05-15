import React, { useContext, useState } from "react";
import "./productListingCard.styles.css";
import { useNavigate } from "react-router-dom";
import { userContext, cartContext } from "../../../../App";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartBackendContext from "../../../../pages/context/CartBackendContext";
import { toast } from 'react-toastify';


const ProductListingCard = ({ bookData }) => {
  const navigate = useNavigate()
  const user = useContext(userContext)
  const { cartItem, setcartItem } = useContext(cartContext)
  const {addCartItem,} = useContext(CartBackendContext)
  const [showDropdown, setshowDropdown] = useState(false)
  const [options, setoptions] = useState({quantity:1,hr:1})
//  console.log(options)
//  console.log(options.quantity)

  const handelclick = () => {
    navigate(`/book-details/${bookData._id}`)
  }
  const handelBuyClick = async() => {
    if (user) {
      const type='Buy'
      setcartItem([...cartItem, bookData])
      await addCartItem(bookData._id, bookData.type, bookData.price*options.quantity, options.quantity,bookData.image,bookData.authors,bookData.title,type);
      // alert(`The book ${bookData.title} is added to the cart`);
      toast.info(`The book ${bookData.title} is added to the cart`)
      // navigate('/cart',{state:{options,type}})
    } else {
      // toast("Please login in to your account to proceed");
      alert("Please login in to your account to proceed");
      navigate("/login");
    }
  }

  const handelRentClick = async() => {
    if (user) {
      const type="Rent"
      setcartItem([...cartItem, bookData])
      await addCartItem(bookData._id, bookData.type, bookData.price*options.hr/30, options.hr,bookData.image,bookData.authors,bookData.title,type);
      // alert(`The book ${bookData.title} is added to the cart`);
      toast(`The book ${bookData.title} is added to the cart`)
      // navigate('/cart',{state:{options,type}})
    } else {
      navigate("/login");
       // toast("Please login in to your account to proceed");
      alert("Please login in to your account to proceed");
    }
  }
  const toggleDropdown = () => {
    // setshowDropdown(!showDropdown)
    setshowDropdown(true)
  }
  const handeloptions = (name,operation) => {
    setoptions((prev) => {
      console.log(options)
      return{
        ...prev,
        [name]:operation==='i' ? options[name]+1 : options[name] -1,
      }
    } )
  }

  return (
    <div className="product-listing-card " >
      <div className="product-listing-img-container">
        <img
          src={bookData.image}
          alt="product-listing"
          className="product-listing-image"
          onClick={handelclick}
        />
      </div>
      <div className="product-listing-details-container" onClick={handelclick}>
        <div >
          <h3 className="text-primary"><b>{bookData.title.slice(0, 45)}</b></h3>
          <p className="author-name"><small>{bookData.authors.slice(0, 80)}</small></p>
        </div>
        <p className="pricing">&#8377;{bookData.price}</p>
      </div>

      <div className="card-btn-container">
        {/* <button className="btn-addcart text-secondary" onClick={toggleDropdown}  >Add to  <FontAwesomeIcon icon={faCartShopping} /></button> */}
        <button className="btn-addcart text-secondary"  onMouseEnter={toggleDropdown}  >Add to  <FontAwesomeIcon icon={faCartShopping} /></button>
        {showDropdown && (
          <div className="dropdown-menu">
            <div className="buy">

            <button className="dropdown-menu-buy" onClick={handelBuyClick}>Buy
            </button>
            <div className="optioncounter">
                            <button className="optioncounterbuttonn" disabled={options.quantity<=1} onClick={() => handeloptions('quantity','d')}>-</button>
                            <p className="optioncounterbutton text-secondary" >{options.quantity}</p>
                            <button className="optioncounterbuttonn" onClick={() => handeloptions('quantity','i')}>+</button>
                        </div>
            </div>

            {bookData.type === 'ebook' ? <div className="rent">
            <button className="dropdown-menu-rent" onClick={handelRentClick}>Rent
            </button>
            <div className="optioncounter">
                            <button className="optioncounterbuttonn" disabled={options.hr<=1} onClick={() => handeloptions('hr','d')}>-</button>
                            <p className="optioncounterbutton text-secondary" >{options.hr}</p>
                            <button className="optioncounterbuttonn" onClick={() => handeloptions('hr','i')}>+</button>
                        </div>
                        </div> : " " }
          </div>)}
        <button className="btn-addcart text-secondary" onClick={handelclick}>
          View
        </button>
      </div>
     
    </div>
  );
};

export default ProductListingCard;