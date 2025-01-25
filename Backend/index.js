import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/db/index.js";
import userRouter from "./src/routes/users.route.js"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("It's FINAL HACKATHON");
});

app.use("/api/v1",userRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️  Server ir running at the port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("❌ MONGO DB connection failed ❌", error);
  });
