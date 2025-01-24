import express from "express";
import dotenv from "dotenv";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req , res) => {
    res.send("It's FINAL HACKATHON");
});

app.listen(process.env.PORT , () => {
    console.log(`Server ir running at the port: ${process.env.PORT}`);
});



