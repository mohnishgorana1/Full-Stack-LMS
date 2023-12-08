import dotenv from "dotenv";
import app from "./app.js";
import connectToDB from './config/dbConnection.js'

dotenv.config({
  path: "./env",
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async() => {
    await connectToDB();
  console.log(`SERVER UP At http://localhost:${PORT}`);
});
