# 🚚 Moveryy - Complete Moving & Transport Platform

A comprehensive web application for managing moving services, built with React, Vite, and Tailwind CSS.

## 🌟 Features

### 👥 **Multi-User Platform**
- **Customer Portal**: Browse services, compare prices, book moves
- **Admin Dashboard**: Manage users, bookings, payments, and analytics  
- **Driver Dashboard**: Accept orders, track earnings, manage profile

### 🎯 **Core Functionality**
- **Service Booking**: House moving, car transport, office relocation
- **Real-time Tracking**: Order status and driver location
- **Payment Integration**: Secure payment processing
- **Rating System**: Customer feedback and driver ratings
- **Analytics**: Comprehensive business insights

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Moveryy-Web-Version
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual configuration values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
Moveryy-Web-Version/
├── src/
│   ├── Layout/           # Layout components
│   │   ├── UserLayout.jsx      # Customer interface layout
│   │   ├── AdminLayout.jsx     # Admin dashboard layout
│   │   └── Transport.jsx       # Driver dashboard layout
│   ├── Pages/            # Page components
│   │   ├── User/              # Customer pages
│   │   ├── Admin/             # Admin pages
│   │   └── Transport/         # Driver pages
│   ├── features/         # Redux features/slices
│   ├── app/             # Redux store configuration
│   └── main.jsx         # Application entry point
├── public/              # Static assets
├── .env.example         # Environment variables template
└── package.json         # Dependencies and scripts
```

## 🎨 User Interfaces

### 🏠 **Customer Portal** (`/`)
- Browse and compare moving services
- Get instant quotes
- Book services online
- Track order status
- Rate and review drivers

### 👨‍💼 **Admin Dashboard** (`/admin`)
- User management
- Booking oversight
- Payment processing
- Analytics and reporting
- System settings

### 🚛 **Driver Dashboard** (`/transport`)
- View available orders
- Accept/decline bookings
- Track earnings
- Manage profile
- View customer ratings

## 🛠 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Deployment
npm run deploy       # Deploy to production (configure as needed)
```

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env` and configure:

- **API_BASE_URL**: Backend API endpoint
- **GOOGLE_MAPS_API_KEY**: For location services
- **STRIPE_KEY**: For payment processing
- **FIREBASE_CONFIG**: For real-time features

### Tailwind CSS
The project uses Tailwind CSS v4 for styling. Configuration is in `tailwind.config.js`.

## 📱 Responsive Design

- **Mobile-first approach**
- **Tablet optimization**
- **Desktop enhancement**
- **Touch-friendly interfaces**

## 🔐 Security Features

- **Input validation**
- **XSS protection**
- **CSRF protection**
- **Secure authentication**
- **Data encryption**

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Deploy to AWS S3
```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name --delete
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📊 Performance

- **Lazy loading** for route components
- **Image optimization**
- **Bundle splitting**
- **Caching strategies**
- **SEO optimization**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Code Style

- **ESLint** for code linting
- **Prettier** for code formatting
- **Conventional Commits** for commit messages
- **Component documentation** with JSDoc

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 5173
   npx kill-port 5173
   ```

2. **Module not found errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build failures**
   ```bash
   # Clear Vite cache
   npx vite --force
   ```

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Create GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the fast build tool
- **Tailwind CSS** for the utility-first CSS framework
- **React Icons** for the beautiful icon library

---

**Built with ❤️ for the moving and transport industry**