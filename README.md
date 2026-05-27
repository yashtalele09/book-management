📚 Book Management System (React + Vite)

A simple Book Management System built using React + TypeScript + Vite that allows users to create, read, update, delete, search, and filter books using a mock API.

🚀 Live Demo

👉 Add your deployed link here

https://your-live-app-url.com
📌 Features
📖 Book Management
Add new books
Edit existing books
Delete books
View book details
🔍 Search & Filter
Search by title, author, genre, publication year
Filter by genre
Dynamic filtering with instant results
📄 Pagination
Books displayed in paginated format
Clean UI with page navigation
🎨 UI Features
Modern glassmorphism design
Responsive layout (mobile + desktop)
Modal-based Add/Edit form
Image preview support (thumbnail URL)
⚡ API Integration
CRUD operations using MockAPI
Axios-based service layer
🛠️ Tech Stack
React.js
TypeScript
Vite
Axios
React Router DOM
Lucide Icons
Tailwind CSS (or custom styling)
📁 Project Structure
src/
│
├── components/
│   ├── AddUpdatePanel.tsx
│   ├── InputField.tsx
│   ├── BookCard.tsx
│
├── pages/
│   ├── Homepage/
│   │   ├── BookListing.tsx
│   │   ├── Hero.tsx
│
├── services/
│   ├── BookApi.ts
│
├── types/
│   ├── book.ts
│
├── App.tsx
├── main.tsx
⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/your-username/book-management-system.git
2️⃣ Install Dependencies
npm install
3️⃣ Run Development Server
npm run dev

App will run at:

http://localhost:5173
🌐 Mock API Setup

This project uses MockAPI.

Example endpoint:

https://6a15993091ff9a63de08771c.mockapi.io/book
API Methods
Method	Endpoint	Description
GET	/book	Get all books
POST	/book	Add new book
PUT	/book/:id	Update book
DELETE	/book/:id	Delete book
📦 Book Data Model
export interface Book {
  id: string | number;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  thumbnail: string;
  description?: string;
}
🧠 Key Learnings
React component architecture
State management using hooks
API integration with Axios
CRUD operations
TypeScript type safety
Form handling and validation
UI/UX design principles

