# TEAL CLIMATE

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
├───backend/
|   ├───public/
│   ├───src/
│   │   ├───controllers/
│   │   ├───database/
│   │   ├───middlewares/
│   │   ├───routes/
│   │   ├───services/
│   │   ├───app.js
│   │   ├───.env.development
│   ├───└───.env.production
├───frontend/
│   ├───src/
│   │   ├───assets/
│   │   ├───components/
│   │   |   ├───layout/
│   │   ├───└───ui/
│   │   ├───contexts/
│   │   ├───pages/
│   │   ├───utils/
│   │   ├───App.jsx/
│   │   ├───global.css/
│   ├───└───main.jsx/
│   ├───.env.development 
│   ├───.env.production 
│   ├───build.sh 
│   ├───index.html
│   ├───postcss.config.js
│   ├───tailwind.config.js
│   ├───vite.config.js
├───.gitignore
├───.prettierignore
├───eslint.config.mjs
├───prettier.config.mjs
└───README.md
</pre>
