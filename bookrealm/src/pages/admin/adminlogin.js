// import React, { useState } from "react";

// const LoginPage = ({ authenticate }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     if (username === "admin" && password === "password") {
//       // If authentication succeeds, call the authenticate function passed as a prop
//       // and pass the username as an argument to indicate successful authentication
//       authenticate(username);
//     } else {
//       // If authentication fails, you can display an error message or handle it as needed
//       alert("Invalid username or password");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from "react";

const LoginPage = ({ authenticate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Here you would typically perform authentication logic, for simplicity, let's assume a dummy check
    if (username === "admin" && password === "password") {
      // If authentication succeeds, call the authenticate function passed as a prop
      // and pass the username as an argument to indicate successful authentication
      authenticate(username);
    } else {
      // If authentication fails, you can display an error message or handle it as needed
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
  type="button"
  onClick={handleLogin}
  style={{
    backgroundColor: "black",
    color: "white",
    padding: "0.5rem",
  }}
  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white custom-button"
>
  Sign In
</button>
 </div>
    </div>
  );
};

export default LoginPage;