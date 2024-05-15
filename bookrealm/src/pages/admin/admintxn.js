import React, { useState, useEffect } from "react";
import Navbar from "../../components/layouts/navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminTransactions() {
  let [transactions, setTransactions] = useState([]);
  let [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let userId = localStorage.getItem("userId");

    async function getTxns() {
      try {
        let txns = await axios.post("https://bookrealm.onrender.com/transaction", {
          user: "admin",
        });
        setTransactions(txns.data);

        // Calculate and set the total amount, ensuring amounts are treated as numbers
        let total = txns.data.reduce((acc, txn) => acc + Number(txn.amount), 0);
        setTotalAmount(total);
      } catch (error) {
        console.log(error);
      }
    }

    if (userId === "admin") {
      getTxns();
    } else {
      navigate("/");
    }
  }, []);

  const navigate = useNavigate();

  const handleRowClick = (txnId) => {
    // navigate(`transactions/${txnId}`);
    console.log(txnId);
  };

  return (
    <>
      <Navbar darkTheme={true} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="mt-4 ml-4">
          <p>Total Amount Earned: {totalAmount * 0.15}</p>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Book
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr
                className="bg-white border-b"
                key={index}
                onClick={() => handleRowClick(txn._id)}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {txn.date}
                </th>
                <td className="px-6 py-4">{txn.userid}</td>
                <td className="px-6 py-4">{txn.bookid}</td>
                <td className="px-6 py-4">{txn.amount}</td>
                <td className="px-6 py-4">{txn.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminTransactions;
