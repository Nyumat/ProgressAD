import express from 'express';
import dotenv from 'dotenv';
import os from 'os';
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();
app.use(cors());
dotenv.config();

const PORT = process.env.PORT;

app.get("/api", (req, res) => {
      res.send({username: os.userInfo().username});
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const uri = process.env.URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));


