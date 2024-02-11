// import React, { useState } from 'react';
// import axios from 'axios';
// import axiosInstance from '../axios';
// function Logout() {
//   const [message, setMessage] = useState('');

//   const handleLogout = () => {
   
//    const token = localStorage.getItem('refresh-token')
//       axiosInstance
//         .post('logout/', {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`,
//               },
//         })
//         .then((response) => {
//           setMessage(response.data.message);
//           // Handle any additional actions upon successful logout
//         })
//         .catch((error) => {
//           setMessage('Logout failed');
//           // Handle errors, such as an invalid token
//         });
    
//   };

//   return (
//     <div>
//       <button onClick={handleLogout}>Logout</button>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default Logout;
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the tokens from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('firstTimeLogin');

    // Redirect to the login page or perform any other logout-related actions
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} style={{width:"60px",backgroundColor:"#B3FF84",marginRight:"10px",borderRadius:"10px"}}> <img
    src={require("../assets/images/log-out.png")}
    style={{ width: "30px" }}
  ></img></button>
  );
};

export default Logout;

