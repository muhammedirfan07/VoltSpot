import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/collaboration/Sidebar';
import Headerr from '../../components/collaboration/Headerr';
import socket from '../../Server/socket';
import {
  viewNotificationsAPI,
  deleteNotificationAPI,
  deleteAllNotificationsAPI,
} from '../../Server/allAPI';

const Notification = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    fetchNotifications();
    socket.on('notification', (newNotification) => {
      setNotifications((prev) => [newNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  const fetchNotifications = async () => {
    console.log("Inside fetchNotifications...");
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = { Authorization: `Bearer ${token}` };
      const result = await viewNotificationsAPI(reqHeader);
      if (result.status === 200) {
        const notificationsArray = Array.isArray(result.data) ? result.data : [];
        console.log("Notifications:", notificationsArray);
        setNotifications(notificationsArray);
        setUnreadCount(notificationsArray.filter((n) => n.status === "unread").length);
      }
    } catch (error) {
      console.log("Error fetching notifications:", error);
      setNotifications([]); // Set to empty array in case of error
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      console.log("inside the handle delete notification ...........");
      try {
        const token = sessionStorage.getItem("token");
        const reqHeader = { Authorization: `Bearer ${token}` };
        const result = await deleteNotificationAPI(notificationId, reqHeader);
        if (result.status === 200) {
          setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
        }
      } catch (error) {
        console.log('Error deleting notification:', error);
      }
    }
  };

  const handleClearAllNotifications = async () => {
    if (window.confirm("Are you sure you want to delete all notifications?")) {
      console.log("inside the all delete notifications..............");
      try {
        const token = sessionStorage.getItem("token");
        const reqHeader = { Authorization: `Bearer ${token}` };
        const result = await deleteAllNotificationsAPI(reqHeader);
        if (result.status === 200) {
          setNotifications([]);
          setUnreadCount(0);
        }
      } catch (error) {
        console.log('Error clearing all notifications:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 overflow-hidden to-black flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded-md text-white"
        onClick={toggleSidebar}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar - Hidden on mobile by default, shown when toggled */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block fixed md:static z-40 h-screen`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-auto p-4 md:p-8 w-full">
        {/* Header */}
        <Headerr />

        {/* Stats Cards */}
        <div className="flex w-full justify-end gap-4 md:gap-6 mb-6 md:mb-4">
          <button
            onClick={handleClearAllNotifications}
             className="bg-gradient-to-b text-center w-full md:w-25 text-amber-50 from-gray-700 to-black p-2 md:p-3 rounded-xl"
          >
            Clear All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-gradient-to-b from-gray-700 to-black p-4 md:p-6 rounded-xl">
            <h1 className="text-amber-100 text-xl mb-2 pb-2 border-b border-gray-50">Notifications</h1>
            {notifications?.map((notification) => (
              <div key={notification?._id} className="p-2 border-b border-gray-50">
                <p className='text-gray-100'>{notification?.message}</p>
                <p
                  className={`text-sm font-semibold ${
                    notification?.status === "approved"
                      ? "text-green-500"
                      : notification?.status === "rejected"
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  Status: {notification?.status}
                </p>
                <button
                  onClick={() => handleDeleteNotification(notification?._id)}
                  className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;