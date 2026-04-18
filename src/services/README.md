# Moveryy Services Documentation

This directory contains all the API services and utilities for the Moveryy web application. The services are organized into logical modules with comprehensive error handling, caching, and real-time capabilities.

## 📁 Service Structure

```
src/services/
├── api.js                    # Core API client with axios
├── authService.js           # Authentication & user management
├── userService.js           # Customer-related operations
├── transportService.js      # Driver/transport operations
├── adminService.js          # Administrative functions
├── notificationService.js   # Push notifications & WebSocket
├── locationService.js       # GPS, geocoding & mapping
├── index.js                 # Central export point
└── README.md               # This documentation
```

## 🚀 Quick Start

### 1. Initialize Services

```javascript
import { initializeServices } from '../services';

// Initialize all services when app starts
await initializeServices();
```

### 2. Using Services with React Hooks

```javascript
import { useAuth, useTransport, useLocation } from '../hooks/useServices';

function MyComponent() {
  const { user, login, logout } = useAuth();
  const { getDashboardData } = useTransport();
  const { getCurrentPosition } = useLocation();

  // Use the services...
}
```

### 3. Direct Service Usage

```javascript
import { authService, transportService } from '../services';

// Login user
const userData = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Get available orders
const orders = await transportService.getAvailableOrders();
```

## 🔧 Core Services

### API Client (`api.js`)

The foundation service that handles all HTTP communications.

**Features:**
- Automatic token management
- Request/response interceptors
- Error handling and retry logic
- File upload support
- Request timeout and cancellation

**Usage:**
```javascript
import { api } from '../services';

// GET request
const data = await api.get('/endpoint');

// POST request
const result = await api.post('/endpoint', { data });

// File upload
const uploadResult = await api.upload('/upload', formData, onProgress);
```

### Authentication Service (`authService.js`)

Handles user authentication, registration, and profile management.

**Key Methods:**
- `login(credentials)` - User login
- `signupBusiness(userData)` - Business user registration
- `signupAdmin(userData)` - Admin user registration
- `logout()` - User logout
- `getCurrentUser()` - Get current user profile
- `updateProfile(data)` - Update user profile
- `forgotPassword(email)` - Password reset
- `isAuthenticated()` - Check auth status

### User Service (`userService.js`)

Customer-facing operations for booking and service management.

**Key Methods:**
- `searchMovers(params)` - Search for moving services
- `createBooking(data)` - Create new booking
- `getBookings(status)` - Get user bookings
- `cancelBooking(id, reason)` - Cancel booking
- `rateService(bookingId, rating)` - Rate completed service
- `getPriceEstimate(data)` - Get price estimates

### Transport Service (`transportService.js`)

Driver/transport operations for order management and earnings.

**Key Methods:**
- `getDashboardData()` - Driver dashboard data
- `getAvailableOrders(filters)` - Available orders
- `acceptOrder(orderId)` - Accept an order
- `startTrip(bookingId)` - Start trip
- `completeTrip(bookingId, data)` - Complete trip
- `getEarnings(period)` - Earnings data
- `submitCustomerRating(data)` - Rate customers

### Admin Service (`adminService.js`)

Administrative functions for system management.

**Key Methods:**
- `getDashboardData()` - Admin dashboard
- `getUsers(filters)` - User management
- `getAllBookings(filters)` - Booking management
- `getAnalytics(period)` - System analytics
- `processRefund(paymentId, amount)` - Payment refunds
- `moderateReview(reviewId, action)` - Content moderation

## 🔄 Real-time Services

### Notification Service (`notificationService.js`)

Handles push notifications and real-time updates via WebSocket.

**Features:**
- WebSocket connection management
- Push notification subscription
- Browser notification display
- Automatic reconnection
- Event-based messaging

**Usage:**
```javascript
import notificationService from '../services/notificationService';

// Subscribe to order notifications
notificationService.subscribe('order', (data) => {
  console.log('New order:', data);
});

// Initialize service
await notificationService.initialize();
```

### Location Service (`locationService.js`)

GPS, geocoding, and mapping functionality.

**Features:**
- Current position tracking
- Address geocoding/reverse geocoding
- Distance calculations
- Route planning
- Nearby service search

**Usage:**
```javascript
import locationService from '../services/locationService';

// Get current position
const position = await locationService.getCurrentPosition();

// Start watching position
locationService.startWatching((position) => {
  console.log('Position updated:', position);
});

// Geocode address
const coords = await locationService.geocodeAddress('123 Main St');
```

## 🎣 React Hooks

### useAuth Hook

```javascript
const {
  user,              // Current user data
  isAuthenticated,   // Auth status
  login,            // Login function with loading/error states
  logout,           // Logout function
  refreshUser       // Refresh user data
} = useAuth();
```

### useApiCall Hook

Generic hook for API calls with loading and error states:

```javascript
const {
  data,       // Response data
  loading,    // Loading state
  error,      // Error state
  execute,    // Function to execute the API call
  reset       // Reset states
} = useApiCall(serviceMethod);
```

## 🔒 Error Handling

All services include comprehensive error handling:

```javascript
try {
  const result = await authService.login(credentials);
} catch (error) {
  console.error('Login failed:', error.message);
  // error.status - HTTP status code
  // error.code - Error code
  // error.details - Additional error details
}
```

## 📱 Offline Support

The services include offline capabilities:

- **Service Worker**: Caches API responses and static files
- **Background Sync**: Syncs data when connection is restored
- **Offline Detection**: Handles network unavailability gracefully

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# API Configuration
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_WS_URL=ws://localhost:3001

# Push Notifications
REACT_APP_VAPID_PUBLIC_KEY=your-vapid-key

# Google Maps
REACT_APP_GOOGLE_MAPS_API_KEY=your-maps-key
```

### Service Configuration

Modify `serviceConfig` in `index.js`:

```javascript
export const serviceConfig = {
  pagination: {
    defaultLimit: 20,
    maxLimit: 100
  },
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedImageTypes: ['image/jpeg', 'image/png']
  },
  location: {
    defaultRadius: 10, // km
    updateInterval: 30000 // 30 seconds
  }
};
```

## 🧪 Testing Services

```javascript
import { checkServiceHealth } from '../services';

// Check if all services are healthy
const health = await checkServiceHealth();
console.log('Service status:', health.status);
```

## 🔄 Service Lifecycle

### Initialization

```javascript
import { initializeServices } from '../services';

// App.js
useEffect(() => {
  initializeServices();
}, []);
```

### Cleanup

```javascript
import { cleanupServices } from '../services';

// Cleanup when app unmounts
useEffect(() => {
  return () => {
    cleanupServices();
  };
}, []);
```

## 📊 Monitoring & Analytics

Services include built-in logging and monitoring:

- Request/response logging
- Error tracking
- Performance metrics
- User activity tracking

## 🔐 Security Features

- **Token Management**: Automatic token refresh
- **Request Signing**: HMAC request signing
- **Rate Limiting**: Client-side rate limiting
- **Input Validation**: Request data validation
- **HTTPS Only**: Secure communication

## 🚀 Performance Optimizations

- **Request Caching**: Intelligent response caching
- **Request Deduplication**: Prevent duplicate requests
- **Lazy Loading**: Load services on demand
- **Connection Pooling**: Reuse HTTP connections
- **Compression**: Request/response compression

## 📚 API Documentation

For detailed API documentation, refer to:
- Backend API documentation
- Swagger/OpenAPI specifications
- Postman collections

## 🤝 Contributing

When adding new services:

1. Follow the existing service pattern
2. Include comprehensive error handling
3. Add TypeScript definitions if using TS
4. Update this documentation
5. Add unit tests
6. Update the index.js exports

## 🐛 Troubleshooting

### Common Issues

**Network Errors:**
- Check API URL configuration
- Verify CORS settings
- Check network connectivity

**Authentication Issues:**
- Verify token storage
- Check token expiration
- Validate credentials

**WebSocket Connection:**
- Check WebSocket URL
- Verify authentication
- Check firewall settings

### Debug Mode

Enable debug mode in `.env`:
```bash
REACT_APP_DEBUG_MODE=true
REACT_APP_LOG_LEVEL=debug
```

This will provide detailed logging for troubleshooting.

---

For more information, contact the development team or refer to the main project documentation.