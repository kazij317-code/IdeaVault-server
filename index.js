const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());

const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
  res.send('Hello Assignment9!');
});

app.listen(port, () => {
  console.log(`App is running well on port ${port}`);
});
