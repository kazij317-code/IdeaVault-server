const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://ideavault:z5jiJq9cRlotHIEW@cluster0.wenolut.mongodb.net/?appName=Cluster0";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db('admin').command({ ping: 1 });

const db = client.db('ideavault');
const ideasCollection = db.collection('ideas');

// Create API for all ideas
app.get('/ideas', async (req, res) => {     
      let cursor = ideasCollection.find();
      const result = await cursor.toArray();
      // console.log(result);
      res.send(result);
    })

// Create API for featured data
app.get('/featured', async (req, res) => {
      const cursor = ideasCollection.find().limit(6);
      const result = await cursor.toArray();
      res.send(result);
    });


// Create API for single idea
app.get('/ideas/:ideaId', async (req, res) => {
      // const ideaId = req.params.ideaId;
      //   console.log(req.user, 'req');

      const { ideaId } = req.params;
      //   console.log(ideaId);
      const query = { _id: new ObjectId(ideaId) };
      const result = await ideasCollection.findOne(query);
      res.send(result);
    });





 console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello Assignment9!');
});

app.listen(port, () => {
  console.log(`App is running well on port ${port}`);
});
