# React User Management System

A modern, responsive user management application built with React, Material-UI, and React Query. This application provides a professional interface for managing users with advanced features and smooth interactions.

## 🚀 Features

- **Modern UI Design**

  - Glassmorphism effects
  - Responsive layout for all devices
  - Smooth animations and transitions
  - Professional color scheme with blue gradient theme
  - Custom scrollbars and interactive elements

- **Advanced User Management**

  - User listing with infinite scroll
  - Real-time search functionality
  - User deletion with confirmation
  - Detailed user information display
  - Responsive data table

- **Technical Features**
  - Infinite scroll pagination
  - Debounced search
  - Real-time data updates
  - Error handling and loading states
  - Optimized performance with React Query
  - Type-safe API interactions

## 🛠 Technical Stack

- **Frontend Framework**: React 19
- **UI Library**: Material-UI v7
- **State Management**: React Query v5
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Development Tools**: ESLint

## 📦 Project Structure

```
src/
├── components/
├── hooks/
│   ├── useDebounce.js       # Custom hook for search debouncing
│   └── useUsers.js          # User data management hook
├── pages/
│   ├── List.jsx            # Main user listing page
│   ├── Modal.jsx           # Confirmation modal component
│   ├── UCard.jsx           # User card component
│   └── UTable.jsx          # User table component
├── services/
│   └── index.jsx           # API service functions
├── shared/
│   ├── CustomAlert/        # Global alert component
│   └── FullScreenLoader/   # Loading indicator component
└── helpers/
    ├── axios.jsx           # Axios instance configuration
    └── utils.jsx           # Utility functions
```

## 🔧 Core Components

### List Component

- Main interface for user management
- Implements infinite scroll
- Handles search functionality
- Manages user deletion

### UTable Component

- Responsive data table
- Sortable columns
- Action buttons for each user
- Custom styling with glassmorphism effect

### Modal Component

- Confirmation dialogs
- User detail display
- Action confirmations

### CustomAlert Component

- Global notification system
- Multiple severity levels
- Auto-dismiss functionality

## 🎨 Styling Features

- **Glassmorphism Effects**

  - Semi-transparent backgrounds
  - Blur effects
  - Subtle borders

- **Responsive Design**

  - Mobile-first approach
  - Breakpoints for all screen sizes
  - Adaptive layouts

- **Interactive Elements**
  - Hover effects
  - Smooth transitions
  - Loading animations

## 🔄 State Management

- **React Query Implementation**

  - Efficient data fetching
  - Automatic background updates
  - Cache management
  - Optimistic updates

- **Custom Hooks**
  - `useDebounce`: Optimizes search performance
  - `useUsers`: Manages user data fetching and state

## 🔌 API Integration

- **Axios Configuration**
  - Custom instance setup
  - Request/response interceptors
  - Error handling
  - Authentication header management

## 🎯 Performance Optimizations

- Debounced search to reduce API calls
- Infinite scroll for efficient data loading
- React Query caching for improved performance
- Optimized re-renders with proper component structure

## 📱 Responsive Design Breakpoints

- Mobile: < 640px
- Tablet: 641px - 1024px
- Desktop: > 1024px

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## 🔒 Environment Configuration

The application uses environment-specific configuration:

- Development:

  ```json
  {
    "API_URL": "http://localhost:3000",
    "URL_SOCKETS": "http://localhost:3000"
  }
  ```

- Production:
  ```json
  {
    "API_URL": "https://api.example.com",
    "URL_SOCKETS": "https://api.example.com"
  }
  ```

## 🎨 UI/UX Features

- Professional blue gradient background
- Glassmorphism effects on cards and modals
- Smooth animations and transitions
- Custom scrollbars
- Interactive hover effects
- Loading indicators and spinners
- Responsive tables and forms
- Modern typography and spacing

## 🔧 Best Practices

- Component composition for reusability
- Custom hooks for logic separation
- Consistent error handling
- Loading state management
- Responsive design patterns
- Type-safe API interactions
- Optimized performance
