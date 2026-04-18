/**
 * Notification Service
 * 
 * Handles push notifications, in-app notifications, and real-time updates
 * using WebSocket connections and service workers.
 */

import { api } from './api';

class NotificationService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.listeners = new Map();
  }

  // Initialize notification service
  async initialize() {
    try {
      // Request notification permission
      await this.requestPermission();
      
      // Initialize WebSocket connection
      this.initializeWebSocket();
      
      // Register service worker for push notifications
      await this.registerServiceWorker();
      
      console.log('✅ Notification service initialized');
    } catch (error) {
      console.error('❌ Failed to initialize notification service:', error);
    }
  }

  // Request notification permission
  async requestPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('✅ Notification permission granted');
        return true;
      } else {
        console.warn('⚠️ Notification permission denied');
        return false;
      }
    }
    return false;
  }

  // Initialize WebSocket connection
  initializeWebSocket() {
    try {
      const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:3001';
      const token = localStorage.getItem('moveryy_token');
      
      this.socket = new WebSocket(`${wsUrl}?token=${token}`);
      
      this.socket.onopen = () => {
        console.log('✅ WebSocket connected');
        this.isConnected = true;
        this.reconnectAttempts = 0;
      };
      
      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleNotification(data);
        } catch (error) {
          console.error('❌ Failed to parse WebSocket message:', error);
        }
      };
      
      this.socket.onclose = () => {
        console.log('🔌 WebSocket disconnected');
        this.isConnected = false;
        this.attemptReconnect();
      };
      
      this.socket.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
      };
    } catch (error) {
      console.error('❌ Failed to initialize WebSocket:', error);
    }
  }

  // Attempt to reconnect WebSocket
  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      
      console.log(`🔄 Attempting to reconnect WebSocket (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms`);
      
      setTimeout(() => {
        this.initializeWebSocket();
      }, delay);
    } else {
      console.error('❌ Max reconnection attempts reached');
    }
  }

  // Register service worker for push notifications
  async registerServiceWorker() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('✅ Service worker registered:', registration);
        
        // Subscribe to push notifications
        await this.subscribeToPush(registration);
      } catch (error) {
        console.error('❌ Service worker registration failed:', error);
      }
    }
  }

  // Subscribe to push notifications
  async subscribeToPush(registration) {
    try {
      const vapidPublicKey = process.env.REACT_APP_VAPID_PUBLIC_KEY;
      if (!vapidPublicKey) {
        console.warn('⚠️ VAPID public key not configured');
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey)
      });

      // Send subscription to server
      await api.post('/notifications/subscribe', {
        subscription: subscription.toJSON()
      });

      console.log('✅ Push notification subscription successful');
    } catch (error) {
      console.error('❌ Push notification subscription failed:', error);
    }
  }

  // Convert VAPID key
  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Handle incoming notifications
  handleNotification(data) {
    const { type, payload } = data;
    
    // Emit to registered listeners
    if (this.listeners.has(type)) {
      const callbacks = this.listeners.get(type);
      callbacks.forEach(callback => {
        try {
          callback(payload);
        } catch (error) {
          console.error('❌ Notification listener error:', error);
        }
      });
    }

    // Show browser notification if permission granted
    if (Notification.permission === 'granted') {
      this.showBrowserNotification(data);
    }

    console.log('📢 Notification received:', type, payload);
  }

  // Show browser notification
  showBrowserNotification(data) {
    const { title, body, icon, tag, actions } = data.payload;
    
    const options = {
      body,
      icon: icon || '/logo.png',
      tag,
      badge: '/logo.png',
      requireInteraction: false,
      actions: actions || []
    };

    new Notification(title, options);
  }

  // Subscribe to notification type
  subscribe(type, callback) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(callback);
    
    console.log(`📝 Subscribed to notifications: ${type}`);
  }

  // Unsubscribe from notification type
  unsubscribe(type, callback) {
    if (this.listeners.has(type)) {
      const callbacks = this.listeners.get(type);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
        console.log(`📝 Unsubscribed from notifications: ${type}`);
      }
    }
  }

  // Send notification (for testing)
  async sendTestNotification(type, payload) {
    try {
      await api.post('/notifications/test', { type, payload });
      console.log('✅ Test notification sent');
    } catch (error) {
      console.error('❌ Failed to send test notification:', error);
    }
  }

  // Get notification history
  async getNotificationHistory(page = 1, limit = 20) {
    try {
      const response = await api.get(`/notifications/history?page=${page}&limit=${limit}`);
      if (response.success) {
        console.log('✅ Notification history loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load notification history');
      }
    } catch (error) {
      console.error('❌ Notification history error:', error);
      throw error;
    }
  }

  // Mark notification as read
  async markAsRead(notificationId) {
    try {
      await api.patch(`/notifications/${notificationId}/read`);
      console.log('✅ Notification marked as read:', notificationId);
    } catch (error) {
      console.error('❌ Failed to mark notification as read:', error);
    }
  }

  // Update notification preferences
  async updatePreferences(preferences) {
    try {
      const response = await api.put('/notifications/preferences', preferences);
      if (response.success) {
        console.log('✅ Notification preferences updated');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update preferences');
      }
    } catch (error) {
      console.error('❌ Update notification preferences error:', error);
      throw error;
    }
  }

  // Disconnect
  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.isConnected = false;
      console.log('🔌 Notification service disconnected');
    }
  }
}

// Create singleton instance
const notificationService = new NotificationService();

export default notificationService;