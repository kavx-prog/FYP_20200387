import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../axios';
import { Button, Container } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const handleButtonClick = (id) => {
    
    setIsClicked(id);
    // You can perform actions based on the clicked record ID
  };
  const openNotificationModal = () => {
    setIsNotificationModalOpen(true);
  };

  const closeNotificationModal = () => {
    setIsNotificationModalOpen(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('access_token')
      const decodedToken = jwtDecode(localStorage.getItem('access_token'));
      const user = {
        id: decodedToken.user_id,
        
        // Include other user fields as needed
      };
      const response = await axiosInstance.get('notifications/',{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(response.data);
      console.log(notifications)
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markNotis = async ()=>{
 
        try {
        const token = localStorage.getItem('access_token')
          const decodedToken = jwtDecode(localStorage.getItem('access_token'));
          const user = {
            id: decodedToken.user_id,
            
            // Include other user fields as needed
          };
          console.log(user)
    
          const response = await axiosInstance.post(`marknotifications/${isClicked}/`, user, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data.message);
        } catch (error) {
          console.error(error.response.data.error);
        }
      }

  return (
    <div>
      
      {/* <Container>
      <button onClick={fetchNotifications}>notifications</button>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>
            <strong>{notification.message}</strong> */}
            {/* {notification.is_read ? ' (Read)' : ' (Unread)'} */}
          {/* </li>
        ))}
      </ul>
      </Container> */}
      <div>
      <button class="btn btn-lg" style={{width:"70px",backgroundColor:"#B3FF84"}} onClick={openNotificationModal} onDoubleClick={closeNotificationModal}><img
    src={require("../assets/images/notifications-active.png")}
    style={{ width: "30px" }}
  ></img>
  </button>
      {isNotificationModalOpen && (
       
          <div className="modalContainer_4">
          
          <ul>
        {notifications.filter(notification => !notification.is_read).map(notification => (
          <li key={notification.id}>
            <strong>{notification.message}</strong>
            {/* {notification.is_read ? ' (Read)' : ' (Unread)'} */}
            <br></br>  {notification.timestamp}
            <Button style={{width:"70px",backgroundColor:"white",border:"none"}} onClick={() => { handleButtonClick(notification.id)
            markNotis();
    
    // console.log(data.id)
   
  }}><img
    src={require("../assets/images/check-circle.png")}
    style={{ width: "20px" }}
  ></img>
  
  </Button>
          </li>
        ))}
      </ul>
            {/* <div className="footer">
              <button onDoubleClick={closefloodModal} id="cancelBtn">
                Cancel
              </button>
              
            </div> */}
          </div>
        
      )}
    </div>
    </div>
  );
};

export default Notifications;
