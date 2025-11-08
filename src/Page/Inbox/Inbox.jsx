import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markAsRead } from '../../Slice/NotificationSlice';

const Inbox = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications?.items || []);

  const handleNotificationClick = (notificationId) => {
    dispatch(markAsRead(notificationId));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 p-4">
      <h1 className="text-xl font-bold mb-4">Notifications</h1>
      
      <div className="space-y-3">
        {notifications.map(notification => (
          <div
            key={notification.id}
            onClick={() => handleNotificationClick(notification.id)}
            className={`p-4 rounded-lg shadow-sm ${
              notification.read ? 'bg-white' : 'bg-blue-50'
            } cursor-pointer transition-colors duration-200`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">{notification.containerName}</span>
              <span className="text-xs text-gray-500">
                {formatDate(notification.createdAt)}
              </span>
            </div>
            
            <p className="text-sm mb-2">
              {notification.type === 'due_reminder' && (
                <>
                  <span className="font-medium">{notification.customerName}</span> has a payment of{' '}
                  <span className="font-medium">৳{notification.amount}</span> due on{' '}
                  {formatDate(notification.dueDate)}
                </>
              )}
              {notification.type === 'payment_overdue' && (
                <div className="text-red-600">
                  <span className="font-medium">{notification.customerName}</span>'s payment of{' '}
                  <span className="font-medium">৳{notification.amount}</span> was due on{' '}
                  {formatDate(notification.dueDate)} and is now overdue!
                </div>
              )}
              {!['due_reminder', 'payment_overdue'].includes(notification.type) && (
                notification.message
              )}
            </p>
            
            {!notification.read && (
              <div className="w-2 h-2 bg-blue-500 rounded-full absolute top-4 right-4" />
            )}
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No notifications yet
          </div>
        )}
      </div>
    </div>
  );
}

export default Inbox;
