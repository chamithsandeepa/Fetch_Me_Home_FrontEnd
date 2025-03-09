Frontend - Pet Adoption System

This is the frontend for the **Pet Adoption System**, built using **Vite**, **React**, and **TypeScript**. The application provides a user-friendly interface for pet adoption, including authentication, pet listings, and user management.

## 🏡 What is **Fetch Me Home**?

**Fetch Me Home** is a **pet adoption platform** that connects rescued pets with potential adopters. It offers a user-friendly interface where users can browse available pets, learn about their backgrounds, and complete the adoption process online. The platform also includes authentication, pet listings, and user management functionalities.

### 🌟 Key Features:
- 🐾 **Browse and Search Pets** – View a list of pets available for adoption.
- 👤 **User Authentication** – Secure login and sign-up functionality.
- 💾 **Pet Management** – Admins can add, update, or remove pet profiles.
- 📌 **API Integration** – Fetches real-time pet adoption data from the backend.
- 🎨 **Modern UI/UX** – Built with React and Tailwind CSS for a sleek and responsive design.

## 📌 Tech Stack

- **Vite** - Fast build tool for modern web applications
- **React** - Component-based UI framework
- **TypeScript** - Type-safe JavaScript
- **React Router** - For navigation
- **Tailwind CSS** - For styling
- **Axios** - For API requests

## 🚀 Getting Started

### 1️⃣ Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS recommended)
- [Yarn](https://yarnpkg.com/) or npm

### 2️⃣ Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/frontend.git
   cd frontend
   ```
2. Install dependencies:
   ```sh
   yarn install   # or npm install
   ```

### 3️⃣ Running the Development Server

Start the local development server:
   ```sh
   yarn dev   # or npm run dev
   ```
This will start the app at `http://localhost:5173` by default.

## 🔧 Project Structure

```
frontend/
│── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page-level components
│   ├── routes/            # React Router setup
│   ├── hooks/             # Custom hooks
│   ├── context/           # Global state management
│   ├── services/          # API service calls
│   ├── assets/            # Static assets (images, icons, etc.)
│   ├── types/             # TypeScript interfaces
│   ├── App.tsx            # Main application entry
│   ├── main.tsx           # Vite entry file
│── public/                # Static files
│── index.html             # HTML template
│── package.json           # Dependencies and scripts
│── tsconfig.json          # TypeScript configuration
│── vite.config.ts         # Vite configuration
```

## 🔐 Environment Variables

Create a `.env` file in the root directory and define your environment variables:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

## 📦 Building for Production

To create an optimized production build, run:
   ```sh
   yarn build   # or npm run build
   ```
The output will be in the `dist/` folder, ready for deployment.

## ✅ Linting & Formatting

Ensure your code follows the best practices:
```sh
   yarn lint   # or npm run lint
   yarn format # or npm run format
```

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

Happy coding! 🐶🐱🎉

