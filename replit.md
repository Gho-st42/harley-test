# Harley Gaming Café Management System

## Overview

This is a complete web application for Harley Gaming Café - a gaming café management system built with vanilla HTML, CSS, and JavaScript. The system provides a full-featured booking and ordering platform with real-time availability tracking, bilingual support (English/Arabic), and an admin panel for management operations.

The application uses Google Sheets as a backend database via Google Apps Script, making it a serverless solution that doesn't require traditional backend infrastructure.

## System Architecture

### Frontend Architecture
- **Pure Web Technologies**: Built entirely with HTML5, CSS3, and vanilla JavaScript (no frameworks)
- **Modular JavaScript**: Code is organized into ES6 modules for maintainability
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Progressive Web App Features**: Offline-capable with service worker support

### Backend Architecture
- **Google Apps Script**: Serverless backend handling all data operations
- **Google Sheets Database**: Acts as the primary data storage with multiple sheets
- **RESTful API Design**: Clean API endpoints for CRUD operations
- **Error Handling**: Comprehensive error handling with timeout management

### Data Storage
- **Google Sheets as Database**: Multiple sheets for different data types
  - Bookings sheet: Customer reservations and room bookings
  - Orders sheet: Food and drink orders
  - Availability sheet: Real-time room and device status
  - Notifications sheet: Customer notification preferences

## Key Components

### 1. Customer-Facing Pages
- **Home Page (index.html)**: Landing page with hero section and call-to-action buttons
- **Services Page (services.html)**: Interactive service cards with detailed information
- **Booking Page (book.html)**: Room reservation form with real-time pricing
- **Orders Page (orders.html)**: Food ordering system with cart functionality
- **Availability Page (availability.html)**: Real-time room availability display

### 2. Admin Panel (admin.html)
- **Authentication**: Password-protected admin access
- **Dashboard**: Overview of bookings, orders, and system statistics
- **Booking Management**: View and manage all room reservations
- **Order Management**: Track food orders and update status
- **Availability Control**: Update room and device availability status

### 3. Core JavaScript Modules
- **main.js**: Application entry point and global functionality
- **language.js**: Bilingual support system (English/Arabic)
- **sheets.js**: Google Sheets API integration layer
- **booking.js**: Booking form logic and price calculation
- **orders.js**: Food ordering system and cart management
- **availability.js**: Real-time availability tracking
- **admin.js**: Admin panel functionality

## Data Flow

### 1. Customer Booking Flow
1. Customer fills out booking form
2. JavaScript validates and calculates pricing
3. Data sent to Google Apps Script endpoint
4. Script stores booking in Google Sheets
5. Confirmation displayed to customer
6. Admin receives notification

### 2. Food Ordering Flow
1. Customer browses menu and adds items to cart
2. Order details collected (name, room, items)
3. Order submitted to Google Apps Script
4. Data stored in Orders sheet
5. Printable receipt generated
6. Kitchen receives order notification

### 3. Availability Updates
1. Admin updates room/device status in admin panel
2. Changes sent to Google Apps Script
3. Availability sheet updated in real-time
4. Customer availability page reflects changes automatically

## External Dependencies

### Google Services
- **Google Apps Script**: Backend processing and API endpoints
- **Google Sheets**: Database storage and management
- **Google Fonts**: Typography (Orbitron, Tajawal for Arabic)

### Third-Party Assets
- **Pixabay Images**: Placeholder images for services and backgrounds
- **Font Awesome**: Icons for UI elements (if implemented)

### Browser APIs
- **Fetch API**: HTTP requests to Google Apps Script
- **Local Storage**: Caching user preferences and language settings
- **Print API**: Receipt printing functionality

## Deployment Strategy

### Static Hosting
- **GitHub Pages**: Primary deployment platform
- **Netlify/Vercel**: Alternative hosting options
- **CDN Integration**: Asset delivery optimization

### Google Apps Script Setup
1. Create new Google Apps Script project
2. Deploy script as web app with public access
3. Configure Google Sheets with proper permissions
4. Update API endpoint URL in sheets.js

### Configuration Steps
1. Set up Google Sheets with required sheet names
2. Configure admin password in Apps Script
3. Update API endpoint URL in frontend code
4. Test all functionality end-to-end

## Changelog
- July 05, 2025. Initial setup
- July 05, 2025. Added "Visit us now" section with embedded Google Maps at coordinates 28.0745067, 30.8132634
- July 05, 2025. Replaced image background with gradient design for better performance and visual appeal
- July 05, 2025. Moved language switcher from top-right to bottom-right corner for better UX

## User Preferences

Preferred communication style: Simple, everyday language.
Admin password: harley2024admin (for testing and access)
Location coordinates: 28.0745067, 30.8132634 (for embedded map)