const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});