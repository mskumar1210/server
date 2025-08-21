const express = require('express');
require("dotenv").config();

const app = express();
const web = require('./routes/web');
const connectDB = require('./db/connectDB');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// ✅ CORS middleware (put it at very top, before routes)
app.use(cors({
    origin: "https://coursebuking.netlify.app", // Your Netlify frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Cookie parser
app.use(cookieParser());

// ✅ Image upload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/' // safer for Render
}));

// ✅ DB Connection
connectDB();

// ✅ Routes
app.use('/api', web);

// ✅ Root route for quick testing
app.get("/", (req, res) => {
    res.json({ message: "Server running ✅" });
});

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
