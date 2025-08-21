const express = require('express');
//
require("dotenv").config();


const app = express();
const web = require('./routes/web');
const connectDB = require('./db/connectDB')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const cors = require("cors");







app.use(
    cors({
        origin: "https://coursebooking1.netlify.app",
        credentials: true,    // allow credentials (cookies)
    })
);


//token get cookie
app.use(cookieParser())



//connectDB()
connectDB()
app.use(express.json())

//image upload
app.use(fileUpload({
    useTempFiles : true,
    // tempFileDir : '/tmp/'
}));


// app.get('/', (req, res) => {               //routing
//   res.send('Hello World!')
// })


app.use('/api',web); //localhost:3000/api       path
app.listen(process.env.PORT, console.log('Server start at'+process.env.PORT));