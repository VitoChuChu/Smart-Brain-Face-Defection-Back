import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import knex from "knex";

// Contorller
import handleRegister from "./controllers/register.js";
import handleSignin from "./controllers/signin.js";
import handleprofile from "./controllers/profile.js";
import { handleImage, handleAPICall } from "./controllers/image.js";
import handleDelete from "./controllers/delete.js";

const app = express();
app.use(express.json());
app.use(cors());

// Connect DB to Web
const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

app.get("/", (req, res) => {
  res.json("Successed!");
});
app.post("/signin", (req, res) => handleSignin(req, res, bcrypt, db));
app.post("/register", (req, res) => handleRegister(req, res, bcrypt, db));
app.delete("/delete", (req, res) => handleDelete(req, res, db));
app.get("/profile/:id", (req, res) => handleprofile(req, res, db));
app.put("/image", (req, res) => handleImage(req, res, db));
app.post("/imageUrl", (req, res) => handleAPICall(req, res));

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
  console.log(`Server is working on port ${PORT}`);
});
