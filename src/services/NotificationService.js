// Device detection for iOS
const isIOS = () => {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
};

class NotificationService {
    constructor() {
        this.hasPermission = false;
        this.isSupported = 'Notification' in window && !isIOS();
        this.checkIntervalId = null;
    }

    async initialize() {
        if (!this.isSupported) {
            console.log('Browser notifications are not supported on this device');
            return false;
        }

        // Check if we already have permission
        if (Notification.permission === 'granted') {
            this.hasPermission = true;
            return true;
        }

        // Request permission
        try {
            const permission = await Notification.requestPermission();
            this.hasPermission = permission === 'granted';
            return this.hasPermission;
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return false;
        }
    }

    async requestPermission() {
        if (!this.isSupported) return false;

        if (Notification.permission === 'denied') {
            // Redirect to browser settings if permission was denied
            this.openNotificationSettings();
            return false;
        }

        return this.initialize();
    }

    openNotificationSettings() {
        // For Chrome
        if (chrome?.notifications?.getPermissionLevel) {
            chrome.notifications.getPermissionLevel(() => {
                window.open('chrome://settings/content/notifications');
            });
        } else {
            // Generic settings page for other browsers
            alert('Please enable notifications in your browser settings to receive important updates.');
        }
    }

    async showNotification(title, options = {}) {
        if (!this.isSupported || !this.hasPermission) return;

        try {
            const notification = new Notification(title, {
                icon: '/favicon.ico', // Add your app icon path here
                badge: '/favicon.ico', // Add your app icon path here
                ...options
            });

            notification.onclick = function(event) {
                event.preventDefault();
                window.focus();
                if (options.onClick) options.onClick(event);
                notification.close();
            };

            return notification;
        } catch (error) {
            console.error('Error showing notification:', error);
        }
    }

    // Method to show welcome notification
    async showWelcomeNotification() {
        if (await this.initialize()) {
            this.showNotification('Welcome to TaliKhata!', {
                body: 'Thanks for enabling notifications. You\'ll receive updates about payment dues and returns.',
                tag: 'welcome'
            });
            this.startDateChecking();
        }
    }

    // Start checking dates periodically
    startDateChecking() {
        if (this.checkIntervalId) return;
        
        // Check immediately on start
        this.checkDates();
        
        // Then check every hour
        this.checkIntervalId = setInterval(() => this.checkDates(), 60 * 60 * 1000);
    }

    // Stop checking dates
    stopDateChecking() {
        if (this.checkIntervalId) {
            clearInterval(this.checkIntervalId);
            this.checkIntervalId = null;
        }
    }

    // Check dates from Redux store
    async checkDates() {
        if (!this.hasPermission) return;

        const state = window.store?.getState();
        if (!state?.clientData) return;

        const { customers, suppliers } = state.clientData;
        
        // Check all containers in customers and suppliers
        Object.values(customers).forEach(container => {
            container.items.forEach(item => this.checkItemDates(item, 'customer'));
        });

        Object.values(suppliers).forEach(container => {
            container.items.forEach(item => this.checkItemDates(item, 'supplier'));
        });
    }

    // Check dates for a specific item
    checkItemDates(item, type) {
        if (!item.returnDate) return;

        const returnDate = new Date(item.returnDate);
        const now = new Date();
        const oneDayBefore = new Date(returnDate);
        oneDayBefore.setDate(oneDayBefore.getDate() - 1);

        // Check if return date is expired
        if (now > returnDate) {
            this.showNotification(`Payment Overdue - ${type}`, {
                body: `The payment for ${item.name || 'a contact'} is overdue! Original return date was ${returnDate.toLocaleDateString()}.`,
                tag: `overdue-${item.id}`,
                requireInteraction: true
            });
        }
        // Check if return date is tomorrow
        else if (now.getDate() === oneDayBefore.getDate() &&
                 now.getMonth() === oneDayBefore.getMonth() &&
                 now.getFullYear() === oneDayBefore.getFullYear()) {
            this.showNotification(`Payment Due Tomorrow - ${type}`, {
                body: `Payment for ${item.name || 'a contact'} is due tomorrow!`,
                tag: `due-tomorrow-${item.id}`
            });
        }
    }
}

export const notificationService = new NotificationService();