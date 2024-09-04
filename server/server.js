const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/connection");
const { authMiddleware } = require("./utils/auth");
const typeDefs = require("./schemas/typeDefs");
const resolvers = require("./schemas/resolvers");

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authMiddleware({ req }),
});

// Start Apollo Server
async function startServer() {
  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: ({ req }) => authMiddleware({ req }),
    })
  );

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on http://localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
}

startServer();
