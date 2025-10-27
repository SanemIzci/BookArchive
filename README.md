# 📚 BookArchive

Your Personal Reading Companion - A comprehensive library management system designed to help you track, organize, and remember your reading journey.

![BookArchive](https://img.shields.io/badge/Version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19.1-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248)

## 🌟 Features

### 📖 Core Features
- **Book Management**: Add, edit, and delete books from your personal library
- **Reading Status Tracking**: Track books as "To Read", "Reading", or "Completed"
- **Rating & Reviews**: Rate books from 1-5 stars and write detailed reviews
- **Favorites**: Mark your favorite books for quick access
- **Book Categories**: Organize books by category (Novel, Science, Biography, Fantasy, etc.)
- **Image Uploads**: Upload book cover images using Cloudinary integration

### 📊 Analytics & Insights
- **Reading Statistics**: View comprehensive statistics about your reading habits
- **Category Analysis**: See which genres you read most
- **Reading Progress**: Track your reading progress with visual charts
- **Personal Dashboard**: Get insights into your reading journey

### 🎨 User Experience
- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Custom Color Palette**: Warm, book-themed color scheme
- **Interactive Components**: Smooth animations and transitions
- **Mobile Responsive**: Fully functional on all devices

## 🛠️ Tech Stack

### Frontend
- **React 19.1** - Modern UI library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Chart.js** - Analytics and visualization
- **React Icons** - Icon library
- **Headless UI** - Accessible UI components

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Multer** - File upload handling
- **bcryptjs** - Password hashing
- **Nodemailer** - Email functionality

## 📁 Project Structure

```
BookArchive/
├── backend/
│   ├── app.js                 # Main backend entry point
│   ├── config/
│   │   ├── db.js             # Database configuration
│   │   └── multer.js         # File upload configuration
│   ├── controllers/
│   │   ├── bookController.js # Book CRUD operations
│   │   ├── userController.js # User management
│   │   ├── statsController.js# Analytics
│   │   └── authController.js # Authentication
│   ├── middleware/
│   │   └── auth.js           # JWT verification
│   ├── models/
│   │   ├── bookModel.js      # Book schema
│   │   └── userModel.js      # User schema
│   └── routes/
│       ├── auth.js           # Auth routes
│       └── book.js           # Book routes
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Global styles
│   ├── components/
│   │   ├── Button.jsx        # Reusable button component
│   │   ├── BookCard.jsx      # Book display card
│   │   ├── Modal.jsx         # Add book modal
│   │   └── StarRating.jsx    # Rating component
│   ├── pages/
│   │   ├── Home.jsx          # Landing page
│   │   ├── Dashboard.jsx     # Main dashboard
│   │   ├── Details.jsx       # Book details
│   │   ├── Profile.jsx       # User profile & stats
│   │   └── Login.jsx         # Authentication
│   ├── layout/
│   │   ├── Navbar.jsx        # Navigation sidebar
│   │   └── Footer.jsx        # Site footer
│   └── redux/
│       ├── store.js          # Redux store
│       ├── BookSlice.js      # Book state
│       ├── UserSlice.js      # User state
│       └── StatsSlice.js     # Statistics state
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for image storage)
- npm or yarn

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/BookArchive.git
cd BookArchive
```

#### 2. Backend Setup
```bash
cd backend
npm install

# Create a .env file
touch .env

# Add the following to .env
DB_CONNECTION_STRING=mongodb://localhost:27017/bookarchive
ACCESS_TOKEN_SECRET=your_secret_key_here
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
```

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### Running the Application

#### Start Backend Server
```bash
cd backend
npm run dev  # Development mode with nodemon
# or
npm start    # Production mode
```

The backend server will run on `http://localhost:3000`

#### Start Frontend Server
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📖 Usage

### User Registration & Login
1. Navigate to the homepage
2. Click "Register" to create an account
3. Fill in your details and upload a profile picture
4. Login with your credentials

### Adding Books
1. Click "Log Books" in the sidebar
2. Fill in book details (title, author, category)
3. Select reading status (To Read, Reading, Completed)
4. Upload a book cover image
5. Add ratings and reviews
6. Click "Add Book"

### Managing Books
- **View all books**: Dashboard
- **Book details**: Click on any book card
- **Update status**: Use the dropdown in book details
- **Rate books**: Star rating component in details page
- **Write reviews**: Text area in book details
- **Mark favorites**: Toggle favorite status

### Viewing Statistics
1. Navigate to "Profile" in the sidebar
2. View comprehensive reading statistics
3. See category distribution charts
4. Track reading progress

## 🎨 Design & Styling

### Color Palette
- **Primary**: `#d6a49b` - Warm, book-themed color
- **Secondary**: `#dfdbd0` - Light, elegant background
- **Accent**: `#272935` - Dark text color
- **Neutral**: `#f0eee2` - Page background

### Typography
- **Noto-italic-bold**: Headings
- **Cormorant-italic**: Decorative text
- Tailwind default: Body text

### Component Library
- **Button Component**: Reusable with variants (primary, secondary, outline)
- **BookCard**: Consistent book display
- **Modal**: Add/edit functionality
- **Navbar**: Sidebar navigation with icons

## 🔐 Authentication & Security
- JWT-based authentication
- Password hashing with bcryptjs
- Secure API endpoints with middleware
- Token refresh functionality
- Protected routes

## 📦 API Endpoints

### Authentication
- `POST /user/register` - Register new user
- `POST /user/login` - User login
- `GET /user/profile` - Get user profile
- `POST /user/forgot-password` - Reset password request
- `POST /user/reset-password` - Reset password

### Books
- `GET /books` - Get all books (user-specific)
- `GET /books/:id` - Get book details
- `POST /books/add` - Add new book
- `PUT /books/:id` - Update book
- `DELETE /books/:id` - Delete book
- `PATCH /books/:id/status` - Update reading status
- `PATCH /books/:id/rating` - Update rating
- `PATCH /books/:id/favorite` - Toggle favorite
- `GET /books/favorites` - Get favorite books

### Statistics
- `GET /stats` - Get reading statistics

## 🧪 Testing
To test the application:

1. Register a new account
2. Add some books with different statuses
3. Rate and review books
4. Mark books as favorites
5. View statistics in the profile page

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Sanem** - [Your GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Tailwind CSS for styling framework
- React Icons for icon library
- Chart.js for data visualization
- Cloudinary for image storage
- MongoDB for database

---

**Made with ❤️ for book lovers**

