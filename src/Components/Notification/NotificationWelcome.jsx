import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { notificationService } from '../../services/NotificationService';
import { setBrowserNotificationsEnabled } from '../../Slice/NotificationSlice';

const NotificationWelcome = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeNotifications = async () => {
            // Check if notifications are supported
            if (!notificationService.isSupported) {
                // If on iOS, don't show any prompts
                if (notificationService.isIOS()) {
                    return;
                }
                // For other unsupported browsers, show a message
                alert('Browser notifications are not supported in your browser.');
                return;
            }

            // Show welcome message and request permission
            const result = await notificationService.requestPermission();
            if (result) {
                dispatch(setBrowserNotificationsEnabled(true));
                notificationService.showWelcomeNotification();
            }
        };

        // Run the initialization
        initializeNotifications();
    }, [dispatch]);

    return null; // This component doesn't render anything
};

export default NotificationWelcome;