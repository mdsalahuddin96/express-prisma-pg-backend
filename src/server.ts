import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server ready at: http://localhost:${PORT}`);
  });
};
startServer()