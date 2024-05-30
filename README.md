# Project Name

- TEAL CLIMATE

## Table of Contents

- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)

## Technologies Used

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: PostgresSQL

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [PostgresSQL](https://www.postgresql.org/download/) (version 16 or higher) (ensure it's running locally)

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/AbdullahSoomroOfficial/tealClimate.git
   cd tealClimate
   ```

2. Start backend server

   ```bash
   cd backend
   npm i
   npm run dev
   ```

3. Start frontend server
   ```bash
   cd frontend
   npm i
   npm run dev
   ```

## Project Structure

<pre>
tealClimate/
├── backend/ # Express application
|   ├── public/ # Static files
│   ├── src/ # Source files
│   │   ├── controllers/ # Route controllers
│   │   ├── database/ # Database configuration and connection
│   │   ├── middlewares/ # Custom middlewares
│   │   ├── routes/ # Express routes
│   │   ├── services/ # Service layer
│   └───└── app.js # Entry point for the backend
├── frontend/ # React application
│   ├── public/ # Static files
│   ├── src/ # Source files
│   │   ├── components/ # React components
│   │   |   ├── ui/ # UI components
│   │   ├── └── layout/ # Layout components
│   │   ├── contexts/ # React contexts
│   │   ├── pages/ # React pages
└───└───└── utils/ # Utility functions
</pre>
