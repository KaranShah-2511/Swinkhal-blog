import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/connectdb.js';
import blog from './routes/blog.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/error.js';

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors());
app.use(express.json());
app.use('/images', express.static('./images'))
connectDB(DATABASE_URL);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/blog', blog);
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`);
});


//To show image in browser

// http://localhost:8000/images/1680195535444--IMG_20210205_092212.jpg