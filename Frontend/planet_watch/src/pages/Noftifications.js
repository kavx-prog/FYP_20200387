import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../axios';
import { Button, Modal } from 'react-bootstrap'; // Import Modal component
import jwtDecode from 'jwt-decode';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null); // Track selected notification

  const handleButtonClick = (id) => {
    setSelectedNotificationId(id);
  };

  const openNotificationModal = () => {
    setIsNotificationModalOpen(true);
  };

  const closeNotificationModal = () => {
    setIsNotificationModalOpen(false);
    setSelectedNotificationId(null); // Reset selected notification on close
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const decodedToken = jwtDecode(token);
      const user = {
        id: decodedToken.user_id,
      };

      const response = await axiosInstance.get('notifications/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markNotificationsAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('access_token');
      const decodedToken = jwtDecode(token);
      const user = {
        id: decodedToken.user_id,
      };

      const response = await axiosInstance.post(
        `marknotifications/${notificationId}/`,
        user,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.message);
      setNotifications(
        notifications.map((notification) =>
          notification.id === notificationId ? { ...notification, is_read: true } : notification
        )
      ); // Update notifications state with read status
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div>
      <button className="btn btn-lg" style={{ width: "70px", backgroundColor: "#B3FF84" }} onClick={openNotificationModal}>
        <img
          src={require("../assets/images/notifications-active.png")}
          style={{ width: "30px" }}
        />
      </button>

      <Modal show={isNotificationModalOpen} onHide={closeNotificationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Unread Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {notifications.filter((notification) => !notification.is_read).map((notification) => (
              <li key={notification.id}>
                <strong>{notification.message}</strong>
                <br />
                {notification.timestamp}
                <Button
                  style={{ width: "70px", backgroundColor: "white", border: "none" }}
                  onClick={() => {
                    handleButtonClick(notification.id);
                    markNotificationsAsRead(notification.id);
                  }}
                >
                  <img src={require("../assets/images/check-circle.png")} style={{ width: "20px" }} />
                </Button>
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Notifications;
