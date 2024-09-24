# ReadFinder - GraphQL API

**ReadFinder** is a full-stack book search application that allows users to search for books using the Google Books API. Users can sign up, log in, search for books, and save their favorite books to their personal list. The application is built using a GraphQL API for efficient data querying, replacing the RESTful API from the earlier version.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Usage](#usage)
- [License](#license)

## Features

- **GraphQL API**: All interactions with the backend (login, signup, book saving, etc.) use GraphQL for efficient data querying and mutations.
- **Apollo Client**: The frontend uses Apollo Client to interact with the GraphQL API.
- **User Authentication**: JWT-based authentication with login, signup, and user-specific saved books.
- **Google Books API Integration**: Search for books directly from the Google Books API and save them to your personal list.

[Back to Table of Contents](#table-of-contents)

## Technologies

### Backend (GraphQL API)
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **GraphQL**: Query language for APIs used to fetch and mutate data.
- **Apollo Server**: GraphQL server implementation.
- **MongoDB**: NoSQL database for storing user data and saved books.
- **Mongoose**: ODM for MongoDB.
- **JWT (jsonwebtoken)**: JSON Web Tokens for user authentication.

### Frontend (React)
- **React**: Frontend JavaScript library for building the UI.
- **React Router**: For navigation between pages.
- **Apollo Client**: For handling GraphQL queries and mutations.
- **Vite**: Frontend build tool for faster development.
- **Bootstrap**: CSS framework for responsive design.

[Back to Table of Contents](#table-of-contents)

## Installation

### Prerequisites

- Node.js
- npm
- MongoDB

### Steps

1. Clone the repository:

   ```bash
   git clone git@github.com:ngojohn2002/ReadFinder-GraphQL-API.git
   ```

2. Navigate to the project directory:

   ```bash
   cd readfinder-graphql-api
   ```

3. Install server-side dependencies:

   ```bash
   cd server
   npm install
   ```

4. Install client-side dependencies:

   ```bash
   cd ../client
   npm install
   ```

5. Create a `.env` file in the `server` directory and add the following:

   ```bash
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=3001
   ```

6. Start the development server:

   ```bash
   npm run develop
   ```

   This will concurrently start the GraphQL server and the client (React) development server.

7. Open your browser and visit:

   ```bash
   http://localhost:3000
   ```

[Back to Table of Contents](#table-of-contents)

## Screenshots

![React Book Search Engine](./client/src/assets/React-Book-Search-Engine.png)

[Back to Table of Contents](#table-of-contents)

## Deployment

Alternatively, you can deploy the app on your preferred cloud platform. For this project, the application is deployed on Render and can be accessed at: [https://readfinder-9uox.onrender.com/](https://readfinder-9uox.onrender.com/).  

To deploy the backend:

1. Create a MongoDB cluster using MongoDB Atlas.
2. Deploy the `server` folder to Render or another Node.js hosting provider.
3. Ensure that the `.env` variables are properly set up.

To deploy the frontend:

1. Build the client:

   ```bash
   npm run build
   ```

2. Deploy the `client/dist` folder to Render or any static site hosting platform.

[Back to Table of Contents](#table-of-contents)

## Usage

1. **Sign Up**: New users can create an account using the signup form.
2. **Login**: Returning users can log in with their credentials.
3. **Search for Books**: Use the search bar to look up books via the Google Books API.
4. **Save Books**: After searching, users can save their favorite books to their profile.
5. **View Saved Books**: View the list of saved books on the "Saved Books" page.

[Back to Table of Contents](#table-of-contents)

## License

This project is licensed under the [MIT License](./LICENSE).

[Back to Table of Contents](#table-of-contents)

(21-MERN)