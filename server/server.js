const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
require("dotenv").config();
const Stripe = require("stripe")(process.env.SECRET_KEY);
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../client/build/images"));
  },
  filename: (req, file, cb) => {
    // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Custom filename of input field name and timestamp
    cb(null, file.originalname); // originalname has filename with extension
  },
});
const upload = multer({ storage: storage });

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use(express.static(path.join(__dirname, "../client/build")));
//app.use("/images", express.static(path.join(__dirname, "../client/images")));

app.post("/upload", upload.single("file"), (req, res) => {
  if (req.file === null) res.json({ status: "Error", error: "Didnt upload" });
  res.json({ status: "Successfully uploaded" });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};
app.post("/payment", async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: "usd",
    });
    status = "success";
  } catch (error) {
    console.log(error);
    status = "Failure";
  }
  res.json({ error, status });
});
// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
