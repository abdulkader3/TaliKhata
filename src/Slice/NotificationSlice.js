import { createSlice } from '@reduxjs/toolkit';
import { notificationService } from '../services/NotificationService';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: [],
    unreadCount: 0,
    browserNotificationsEnabled: false
  },
  reducers: {
    addNotification: (state, action) => {
      state.items.push({
        ...action.payload,
        id: Date.now(),
        read: false,
        createdAt: new Date().toISOString()
      });
      state.unreadCount += 1;
    },
    markAsRead: (state, action) => {
      const notification = state.items.find(item => item.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    setBrowserNotificationsEnabled: (state, action) => {
      state.browserNotificationsEnabled = action.payload;
    },
    checkForDueNotifications: (state, action) => {
      const { customers, suppliers } = action.payload;
      const now = new Date();
      
      // Check customers
      Object.values(customers).forEach(container => {
        container.items.forEach(customer => {
          if (customer.returnDate && customer.returnTime) {
            const dueDate = new Date(customer.returnDate + 'T' + customer.returnTime);
            const timeDiff = dueDate - now;
            const hoursDiff = timeDiff / (1000 * 60 * 60);
            
            // Check for overdue or due soon
            const isOverdue = hoursDiff < 0;
            const isDueSoon = hoursDiff > 0 && hoursDiff <= 24;
            
            // Create notification if payment is overdue or due soon and no notification exists
            if ((isOverdue || isDueSoon) && 
                !state.items.some(item => 
                  item.customerId === customer.id && 
                  item.dueDate === customer.returnDate + 'T' + customer.returnTime &&
                  item.type === (isOverdue ? 'payment_overdue' : 'due_reminder')
                )) {
              state.items.push({
                id: Date.now(),
                type: isOverdue ? 'payment_overdue' : 'due_reminder',
                customerId: customer.id,
                customerName: customer.name,
                containerName: customer.containerName,
                amount: customer.borrowedAmount,
                dueDate: customer.returnDate + 'T' + customer.returnTime,
                read: false,
                createdAt: new Date().toISOString()
              });
              state.unreadCount += 1;
            }
          }
        });
      });

      // Check suppliers - similar logic for suppliers
      Object.values(suppliers).forEach(container => {
        container.items.forEach(supplier => {
          if (supplier.returnDate && supplier.returnTime) {
            const dueDate = new Date(supplier.returnDate + 'T' + supplier.returnTime);
            const timeDiff = dueDate - now;
            const hoursDiff = timeDiff / (1000 * 60 * 60);
            
            if (hoursDiff > 0 && hoursDiff <= 24 && 
                !state.items.some(item => 
                  item.customerId === supplier.id && 
                  item.dueDate === supplier.returnDate + 'T' + supplier.returnTime
                )) {
              state.items.push({
                id: Date.now(),
                type: 'due_reminder',
                customerId: supplier.id,
                customerName: supplier.name,
                containerName: supplier.containerName,
                amount: supplier.borrowedAmount,
                dueDate: supplier.returnDate + 'T' + supplier.returnTime,
                read: false,
                createdAt: new Date().toISOString()
              });
              state.unreadCount += 1;
            }
          }
        });
      });
    }
  }
});

export const { 
  addNotification, 
  markAsRead, 
  checkForDueNotifications,
  setBrowserNotificationsEnabled 
} = notificationSlice.actions;
export default notificationSlice.reducer;