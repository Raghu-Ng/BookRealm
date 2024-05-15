import React, { useContext, useState, useEffect } from "react";
import { userContext } from "../../App";
import { Link } from "react-router-dom";
import Navbar from '../../components/layouts/navbar/Navbar'
import './UserPortal.css'
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import upload from './upload-pic.png'
import axios from 'axios'
import Footer from '../../components/layouts/footer/footer'
import { toast } from 'react-toastify';

export const UserPortal = () => {
  const authenticateUser = useContext(userContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [personalcred, setpersonalcred] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phoneno: "",
    country: "",
    street_address: "",
    city: "",
    region: "",
    postal_code: "",
  });
  // const [photo, setphoto] = useState(null)
  const [userData, setUserData] = useState(null);

  //photo on change
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      localStorage.setItem("selectedFile", e.target.result);
    };
    // console.log(photo);
    reader.readAsDataURL(file);
    console.log(file);
    // const a = reader.readAsDataURL(file);
    // const b = URL.createObjectURL(selectedFile)
    // console.log(a,'a')
    // console.log(b,'b')
    // console.log(file,'file')
    // console.log(selectedFile,'selectedfile')
  };
  //personal info on change
  const onchange = (e) => {
    setpersonalcred((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // console.log(personalcred)
  };
  // const imageData = localStorage.getItem('selectedFile');
  // // console.log(imageData)

  //personal info submit
  const handlesubmit = async (e) => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      email,
      phoneno,
      country,
      street_address,
      city,
      postal_code,
      region,
    } = personalcred;
    // alert("your personal information has been saved");
    toast.success('your personal information has been saved')
    try {
      const response = await axios.put(
        `https://bookrealm.onrender.com/user/update/${authenticateUser.uid}`,
        {
          userid: authenticateUser.uid,
          email: email,
          first_name: first_name,
          last_name: last_name,
          phoneno: phoneno,
          country: country,
          street_address: street_address,
          city: city,
          postal_code: postal_code,
          region: region,
          // image:selectedFile
        }
      );
      // console.log("Post", response);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://bookrealm.onrender.com/user/id/${authenticateUser.uid}`
        );
        setUserData(response.data);
        // console.log(response)
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error fetching your information,check your network')
      }
    };
    fetchUserData();
  }, [authenticateUser.uid]);

  const handleedit = () => {
    setUserData(null)
    toast.warning('This will change Your saved information')
  }
  // if(authenticateUser.length===0){
  // setUserData(null)
  // console.log(authenticateUser.length)
  // }
  return (
    <section>
      <Navbar darkTheme={true} />

      <div className="user-options-wrapper">
        <div className="user-options-container">
          <div className="user-upload-option">
            <div className="user-upload-option-text">
              <h2>You can publish your own books here!</h2>
            </div>
            <button>
              <Link to="/mypublications" className="button-primary">
                My publications
              </Link>
            </button>
          </div>
          <div className="user-upload-option">
            <div className="user-upload-option-text">
              <h2>Read the books you've already purchased!</h2>
            </div>
            <button>
              <Link to="/mybooks" className="button-primary">
                My Books
              </Link>
            </button>
          </div>
        </div>
      </div>
      <hr className="text-primary mx-[10%]"/>
      <h1 className="text-center text-primary mt-9 ">Profile</h1>
      <p className="mt-1 text-sm leading-6 text-gray-600 text-center text-primary">
        This information will be only displayed to you.
      </p>

      <div className="wrapper">
        <form className="text-primary" onSubmit={handlesubmit}>
          <div className="infocontainer">
            {/* photo */}
            <div className="info-photo">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full ">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900 mb-5 text-center"
                  >
                    Photo
                  </label>
                  <div className="text-center photo-inside">
                    <img
                      src={
                        selectedFile
                          ? URL.createObjectURL(selectedFile)
                          : upload
                      }
                      alt=""
                      required
                      onChange={onchange}
                      className={`${selectedFile ? "photo-slot" : ""}`}
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    {!selectedFile ? (
                      <>
                        <p className="pl-3">
                          <span>Upload a file </span>
                        </p>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="mt-2 flex items-center gap-x-3 justify-center">
                    <button
                      type="button"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mt-5"
                      onClick={() => {
                        document.getElementById("file-upload").click();
                      }}
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* personal information */}
            {userData === null && (
              <div className="info-photo-text">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="first_name"
                          id="first_name"
                          onChange={onchange}
                          required
                          autoComplete="given-name"
                          className="text-secondary block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="last_name"
                          id="last_name"
                          onChange={onchange}
                          autoComplete="family-name"
                          className="text-secondary block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          // onChange={onchange}
                          // placeholder={authenticateUser.email}
                          value={authenticateUser.email}
                          readOnly={true}
                          autoComplete="email"
                          className="text-secondary block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        phone no.
                      </label>
                      <div className="mt-2">
                        <input
                          id="phoneno"
                          name="phoneno"
                          onChange={onchange}
                          required
                          pattern="[0-9]*"
                          minLength={10}
                          maxLength={10}
                          type="tel"
                          autoComplete="tel"
                          className="text-secondary block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          name="country"
                          onChange={onchange}
                          required
                          autoComplete="country-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>select</option>
                          <option>India</option>
                          <option>Canada</option>
                          <option>United States</option>
                          <option>Mexico</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street_address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="street_address"
                          id="street_address"
                          onChange={onchange}
                          required
                          autoComplete="street_address"
                          className="text-secondary block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          onChange={onchange}
                          required
                          autoComplete="address-level2"
                          className="text-secondary block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="region"
                          id="region"
                          onChange={onchange}
                          required
                          autoComplete="address-level1"
                          className="text-secondary block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal_code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          pattern="[0-9]*"
                          name="postal_code"
                          id="postal_code"
                          onChange={onchange}
                          required
                          maxLength={6}
                          autoComplete="postal_code"
                          className="text-secondary block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6  ">
                  <button
                    type="submit"
                    id="save"
                    className='className="text-sm font-semibold leading-6 mr-0 button-primary'
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {userData !== null && (
              <div className="info-card-text">
                <div className="border-b border-gray-900/10 pb-12 ">
                  <h2 className="text-base font-semibold leading-7 text-gray-900 ml-7">
                    Personal Information{" "}
                  </h2>
                  <div className="mt-10 grid grid-cols-1 gap-x-0.5 gap-y-5 sm:grid-cols-2 ">
                    <div className="info-card">
                      <span className="info-label">First Name :</span>
                      <span className="info-value">{userData.first_name}</span>
                    </div>
                    <div className="info-card">
                      <span className="info-label">Last Name :</span>
                      <span className="info-value">{userData.last_name}</span>
                    </div>
                    <div className="info-card">
                      <span className="info-label">Email :</span>
                      <span className="info-value">{userData.email}</span>
                    </div>
                    <div className="info-card">
                      <span className="info-label">Phone Number :</span>
                      <span className="info-value">{userData.phoneno}</span>
                    </div>
                    <div className="info-card">
                      <span className="info-label">Country :</span>
                      <span className="info-value">{userData.country}</span>
                    </div>
                    <div className="info-card">
                      <span className="info-label">City :</span>
                      <span className="info-value">{userData.city}</span>
                    </div>
                    <div className="info-card">
                      <span className="info-label">Region :</span>
                      <span className="info-value">{userData.region}</span>
                    </div>
                    <div className="info-card">
                      <span className="info-label">Postal Code : </span>
                      <span className="info-value">{userData.postal_code}</span>
                    </div>
                  </div>
                  <div className="info-card street ">
                    <span className="info-label">Street Address :</span>
                    <p className="info-value">{userData.street_address}</p>
                  </div>
                </div>
                <button className="button-primary" onClick={handleedit}>
                  edit
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      <Footer />
    </section>
  );
};
