# 🌱 Urvann - Plant Shop Application

A full-stack plant shop application with catalog browsing and admin management system for plant inventory.


## 📋 Project Overview

Urvann is a modern web application for a plant shop that allows customers to browse through a catalog of plants and administrators to manage the plant inventory. The application features a responsive design, plant categorization, and a secure admin panel for adding and managing plants.

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with server-side rendering
- **TypeScript** - Type-safe JavaScript
- **Shadcn UI** - Component library based on Tailwind CSS
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage

## 🏗️ Project Structure

```
urvaan_assignment/
├── frontend/               # Next.js frontend application
│   ├── app/                # Next.js app directory
│   │   ├── admin/          # Admin panel
│   │   ├── catalog/        # Plant catalog page
│   │   └── plant/          # Individual plant page
│   ├── components/         # React components
│   │   └── ui/             # UI components from shadcn
│   ├── config/             # Configuration files
│   ├── lib/                # Utility libraries
│   └── public/             # Static assets
│
└── server/                 # Express.js backend
    ├── src/
    │   ├── config/         # Server configuration
    │   ├── controllers/    # Request handlers
    │   ├── middleware/     # Express middleware
    │   ├── models/         # MongoDB models
    │   └── routes/         # API routes
    └── server.js           # Entry point
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16+)
- npm or pnpm
- MongoDB database

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ADMIN_KEY=admin123
   ```

4. Start the server:
   ```bash
   npm start
   ```
   The server will run on http://localhost:5000

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   
   ```

3. Run the development server:
   ```bash
   npm run dev
   
   ```
   The frontend will run on http://localhost:3000

4. For production build:
   ```bash
   npm run build
   npm start
  
   ```

## 🔐 Admin Access

To access the admin panel:

1. Navigate to `/admin` route
2. Use the following admin key:
   ```
   admin123
   ```

## 🌟 Features

### Customer Features
- Browse plant catalog with filtering options
- View detailed information about each plant
- Responsive design for mobile and desktop
- Plant categorization

### Admin Features
- Secure admin panel with key-based authentication
- Add new plants to the inventory
- Set plant details (name, price, categories, stock status)
- Add custom categories for plants
- Image URL support for plant listings

## 📱 API Endpoints

### Plants API
- `GET /plants` - Get all plants
- `GET /plants/:id` - Get plant by ID
- `POST /plants` - Add a new plant (Admin only)
- `PUT /plants/:id` - Update a plant (Admin only)
- `DELETE /plants/:id` - Delete a plant (Admin only)

### Categories API
- `GET /categories` - Get all categories

## 🧩 Project Enhancement Ideas

- User authentication system
- Shopping cart functionality
- Payment gateway integration
- Order management
- User reviews and ratings
- Plant care tips section
- Newsletter subscription

---

Created by [GAGANRAGHAV](https://github.com/GAGANRAGHAV)
