import express from 'express';
import dotenv from 'dotenv';
import os from 'os';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import tracker from './middleware/tracker.js';
import setHeaders from './utils/setHeaders.js';
import register from './routes/register.js';

const app = express();

// Parse incoming requests data
app.use(bodyParser.urlencoded({ extended: true }));
// Parse incoming requests data as JSON
app.use(bodyParser.json());
// Allow cross-origin requests
app.use(cors());
// Track the requests to the backend.
app.use(tracker);
// Set the headers for the requests.
app.use(setHeaders);
// Register a user endpoint 
app.use('/api/users/register', register);


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


