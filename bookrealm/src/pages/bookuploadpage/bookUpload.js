// import React, { useState } from "react";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";

// function BookUpload() {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [image, setImage] = useState(null);
//   const [pdf, setPdf] = useState(null);

//   const storage = getStorage();

//   // const handleUpload = async (file, type) => {
//   //   if (!file) return;

//   //   const storageRef = storage.ref(`/${type}/${file.name}`);
//   //   await storageRef.put(file);
//   //   const url = await storageRef.getDownloadURL();
//   //   console.log(url);
//   // };

//   // const handleUpload = async (file, type) => {
//   //   if (!file) return;
//   //   const storageRef = ref(storage, `${type}/${file.name}`);
//   //   await uploadBytes(storageRef, file);
//   //   const url = await getDownloadURL(storageRef);
//   //   console.log(url);
//   // };

//   function handleUpload() {
//     if (!file) {
//       alert("Please choose a file first!");
//     }

//     const storageRef = ref(storage, `/files/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const percent = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );

//         // update progress
//         setPercent(percent);
//       },
//       (err) => console.log(err),
//       () => {
//         // download url
//         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//           console.log(url);
//         });
//       }
//     );
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Data:", title, author, image, pdf);
//     handleUpload(image, "images");
//     handleUpload(pdf, "pdfs");
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Author"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//         />
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={(e) => setPdf(e.target.files[0])}
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default BookUpload;

// import { useState } from "react";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";

// function BookUpload() {
//   // State to store uploaded file
//   const [file, setFile] = useState("");

//   // progress
//   const [percent, setPercent] = useState(0);

//   // Handle file upload event and update state
//   function handleChange(event) {
//     setFile(event.target.files[0]);
//   }

//   const handleUpload = () => {
//     if (!file) {
//       alert("Please upload an image first!");
//     }
//     const storage = getStorage();
//     const storageRef = ref(storage, `/files/${file.name}`);

//     // progress can be paused and resumed. It also exposes progress updates.
//     // Receives the storage reference and the file to upload.
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const percent = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );

//         // update progress
//         setPercent(percent);
//       },
//       (err) => console.log(err),
//       () => {
//         // download url
//         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//           console.log(url);
//         });
//       }
//     );
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleChange} accept="/image/*" />
//       <button onClick={handleUpload}>Upload to Firebase</button>
//       <p>{percent} "% done"</p>
//     </div>
//   );
// }

// export default BookUpload;

import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/layouts/navbar/Navbar";
import { toast } from "react-toastify";

function BookUpload() {
  const [isEbook, setIsEbook] = useState("physical");
  const [ebookFile, setEbookFile] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [desc, setDesc] = useState("");
  const [language, setLanguage] = useState("");
  const [price, setPrice] = useState(0);
  const [length, setLength] = useState(0);

  const navigate = useNavigate();

  const handleEbookChange = (event) => {
    setIsEbook(event.target.value === "ebook");
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleEbookFileChange = (event) => {
    setEbookFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const storage = getStorage();
    const storageRef = ref(storage);

    const uploadFile = async (file, path) => {
      const fileRef = ref(storageRef, path);
      const uploadTask = uploadBytesResumable(fileRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // You can use this to update a progress bar
          },
          (error) => {
            reject(error);
            toast.error('Your book has not been uploaded due to sme issues')
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
            toast.success('Book has been sent to review for upload')
          }
        );
      });
    };

    try {
      let ebookURL = null;
      if (ebookFile) {
        ebookURL = await uploadFile(ebookFile, `ebooks/${ebookFile.name}`);
      }
      const imageURL = await uploadFile(image, `images/${image.name}`);
      const data = {
        isEbook,
        ebookFile: ebookURL,
        title,
        authors,
        desc,
        language,
        price: Number(price),
        length: Number(length),
        image: imageURL,
      };

      let userid = localStorage.getItem("userId");

      console.log(data);
      const response = await axios.post("https://bookrealm.onrender.com/book/create", {
        userid: userid,
        title: data.title,
        subtitle: data.desc,
        authors: data.authors,
        image: data.image,
        type: data.isEbook,
        language: data.language,
        price: data.price,
        book_length: data.length,
        url: data.ebookFile,
      });
      console.log(response.data);
      navigate("/mypublications");
    } catch (error) {
      console.error("Error uploading files or submitting data:", error);
    }
  };

  return (
    <>
      <section>
        <Navbar darkTheme={true} />
        <div className="text-center text-2xl mt-4">
          Upload your <span className="text-primary">Book</span> for publication
          approval
        </div>
        <div className="flex items-center justify-center p-10">
          <div className="mx-auto w-full max-w-[550px] bg-white">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Book Name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="authors"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Author(s)
                </label>
                <input
                  type="text"
                  name="authors"
                  id="authors"
                  placeholder="Name of the author(s)"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                  value={authors}
                  onChange={(e) => setAuthors(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="desc"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Book Description
                </label>
                <textarea
                  type="text"
                  name="desc"
                  id="desc"
                  placeholder="Enter book description"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="language"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Language
                </label>
                <input
                  type="text"
                  name="language"
                  id="language"
                  placeholder="Enter book language"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                />
              </div>
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-4">
                    <label
                      htmlFor="price"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-4">
                    <label
                      htmlFor="length"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Length
                    </label>
                    <input
                      type="number"
                      name="length"
                      id="length"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      required
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Book Type
                </label>
                <div>
                  <input
                    type="radio"
                    id="physical"
                    name="bookType"
                    value="physical"
                    checked={!isEbook}
                    onChange={handleEbookChange}
                    required
                  />
                  <label htmlFor="physical" className="ml-2">
                    Physical Book
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="ebook"
                    name="bookType"
                    value="ebook"
                    checked={isEbook}
                    onChange={handleEbookChange}
                    required
                  />
                  <label htmlFor="ebook" className="ml-2">
                    Ebook
                  </label>
                </div>
              </div>
              {isEbook && (
                <div className="mb-4">
                  <label
                    htmlFor="ebookFile"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Ebook File
                  </label>
                  <input
                    type="file"
                    id="ebookFile"
                    name="ebookFile"
                    onChange={handleEbookFileChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white text-[#6B7280]"
                    required
                  />
                </div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Book Cover
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white text-[#6B7280]"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="hover:shadow-form w-full rounded-md bg-primary py-3 px-8 text-center text-base font-semibold text-secondary outline-none"
                >
                  Submit Book Upload Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default BookUpload;
