const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (_, res) => res.send('Hello! This is Cityrunner Ver.2'));

const port = 4000;

app.listen(port, () => console.log(`listening on => http://localhost:${port}`));