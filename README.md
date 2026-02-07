# Interview Prep App

A comprehensive platform designed to elevate the technical interview preparation experience. By integrating advanced AI capabilities with a modern, responsive interface, this application provides users with personalized practice scenarios, real-time feedback, and a robust learning environment.

## Overview

The **Interview Prep App** bridges the gap between theoretical knowledge and practical interview performance. It leverages Google's Generative AI to simulate realistic interview conditions, offering tailored questions and constructive critiques. Built on the MERN stack, it emphasizes performance, scalability, and a seamless user experience.

## Key Features

- **AI-Powered Simulations**  
  Generates context-aware interview questions and evaluates responses using Google's GenAI.

- **Modern Interface**  
  A clean, distraction-free UI built with React and Tailwind CSS, featuring smooth transitions via Framer Motion.

- **Secure Authentication**  
  Implementation of industry-standard security practices including JWT-based sessions and Google OAuth 2.0.

- **Rich Text Support**  
  Full markdown rendering capabilities for code snippets and technical documentation.

- **Responsive Design**  
  Optimized for a consistent experience across desktop and mobile devices.

## Technology Stack

**Frontend**
- React 19, Vite
- Tailwind CSS 4
- Radix UI Primitives, Lucide Icons
- Framer Motion

**Backend**
- Node.js, Express.js
- MongoDB (Mongoose ODM)
- Passport.js (Google Strategy), JWT, BCrypt
- Google Generative AI SDK, Multer

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/interview-prep-app.git
   cd interview-prep-app
   ```

2. **Backend Setup**
   Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory and configure the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_API_KEY=your_gemini_api_key
   ```
   Start the server:
   ```bash
   npm start
   ```

3. **Frontend Setup**
   Open a new terminal, navigate to the frontend directory, and install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
   Start the development server:
   ```bash
   npm run dev
   ```

## Development

Run the linter to ensure code quality:

```bash
cd frontend
npm run lint
```

## Screenshots

<!-- Add screenshots of your application here -->
![App Screenshot](https://via.placeholder.com/800x400?text=App+Screenshot+Placeholder)

## Contributing

We welcome contributions to improve the platform. Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License

This project is licensed under the ISC License.
