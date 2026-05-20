const express = require('express');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const { createRemoteJWKSet, jwtVerify } = require('jose-cjs');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

const uri = process.env.MONGODB_URI;

const JWKS = createRemoteJWKSet(new URL(`${process.env.CLIENT_URL}/api/auth/jwks`));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const logger = (req, res, next) => {
  console.log(`${req.method} | ${req.url}`);
  next();
};

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  //   console.log(req.headers, 'from verify token');
  const token = authorization?.split(' ')[1];
  //   console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorize' });
  }

  try {
    const JWKS = createRemoteJWKSet(new URL('http://localhost:3000/api/auth/jwks'));
    const { payload } = await jwtVerify(token, JWKS);
    req.user = payload;

    next();
  } catch (error) {
    console.error('Token validation failed:', error);
    return res.status(401).json({ message: 'Unauthorize' });
  }
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db('admin').command({ ping: 1 });
    const db = client.db('ideavault');
    const ideasCollection = db.collection('ideas');
    // const enrollmentCollection = db.collection('enrollments');

    app.get('/ideas', async (req, res) => {
      const { search, category } = req.query;

      let query = {};

      if (category && category !== 'All' && category !== 'All Categories') {
        query.category = {
          $regex: `^${category}$`,
          $options: 'i'
        };
      }

      if (search) {
        query.$or = [
          {
            title: {
              $regex: search,
              $options: 'i',
            },
          },
          {
            instructor: {
              $regex: search,
              $options: 'i',
            },
          },
          {
            category: {
              $regex: search,
              $options: 'i',
            },
          },
          {
            tags: {
              $regex: search,
              $options: 'i',
            },
          },
        ];
      }

      if (search && category && category !== 'All' && category !== 'All Categories') {
        query = {
          $and: [
            {
              category: {
                $regex: `^${category}$`,
                $options: 'i'
              }
            },
            {
              $or: [
                {
                  title: {
                    $regex: search,
                    $options: 'i',
                  },
                },
                {
                  instructor: {
                    $regex: search,
                    $options: 'i',
                  },
                },
                {
                  category: {
                    $regex: search,
                    $options: 'i',
                  },
                },
                {
                  tags: {
                    $regex: search,
                    $options: 'i',
                  },
                },
              ]
            }
          ]
        };
      }

      let cursor = ideasCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/featured', async (req, res) => {
      const cursor = ideasCollection.find().limit(6);
      const result = await cursor.toArray();
      res.send(result);
    });

    // app.post('/ideas', verifyToken, async (req, res) => {
    //   try {
    //     const ideaData = req.body;
    //     const newidea = {
    //       ...ideaData,
    //       enrollCount: 0,
    //       createdAt: new Date(),
    //     };
    //     const result = await ideasCollection.insertOne(newidea);
    //     res.status(201).send(result);
    //   } catch (err) {
    //     console.error('Error adding idea:', err);
    //     res.status(500).json({ message: 'Internal server error' });
    //   }
    // });

    // ------------------
app.post("/ideas", verifyToken, async (req, res) => {
  const idea = req.body;

  const newIdea = {
    ...idea,
    userEmail: req.user.email, // from token
    createdAt: new Date(),
  };

  const result = await ideasCollection.insertOne(newIdea);

  res.send(result);
});

  // ------------------

  // ----------------------
app.get("/my-ideas", verifyToken, async (req, res) => {
  const email = req.user.email;

  const result = await ideasCollection
    .find({ userEmail: email })
    .toArray();

  res.send(result);
});
  // ---------------------
app.delete("/ideas/:id", async (req, res) => {
  const id = req.params.id;

  const result = await ideasCollection.deleteOne({
    _id: new ObjectId(id),
  });

  res.send(result);
});
  // -----------------------
// app.patch("/ideas/:id", async (req, res) => {
//   const id = req.params.id;
//   const updatedData = req.body;

//   const result = await ideasCollection.updateOne(
//     { _id: new ObjectId(id) },
//     {
//       $set: updatedData,
//     }
//   );

//   res.send(result);
// });
  // ----------------------
app.patch("/ideas/:id", async (req, res) => {
  const id = req.params.id;

  const result = await ideasCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: req.body,
    }
  );

  res.send(result);
});

  // ----------------------


    app.get('/ideas/:ideaId', logger, verifyToken, async (req, res) => {
      // const ideaId = req.params.ideaId;
      //   console.log(req.user, 'req');

      const { ideaId } = req.params;
      //   console.log(ideaId);
      const query = { _id: new ObjectId(ideaId) };
      const result = await ideasCollection.findOne(query);
      res.send(result);
    });

    // app.get('/enrollments/:userId', verifyToken, async (req, res) => {
    //   const { userId } = req.params;
    //   const result = await enrollmentCollection.find({ userId: userId }).toArray();
    //   res.send(result);
    // });

    // app.patch('/enrollments/:ideaId', verifyToken, async (req, res) => {
    //   //   console.log('from enrollment');

    //   const { ideaId } = req.params;
    //   const enrollmentData = req.body;

    //   const idea = await ideasCollection.findOne({ _id: new ObjectId(ideaId) });

    //   if (!idea) {
    //     return res.status(404).json({ message: 'idea not found' });
    //   }
    //   await ideasCollection.updateOne(
    //     { _id: new ObjectId(ideaId) },
    //     {
    //       $inc: { enrollCount: 1 },
    //       $set: {
    //         lastEnrolledAt: new Date(),
    //       },
    //     }
    //   );
    //   //   console.log(enrollmentData);

    //   const result = await enrollmentCollection.insertOne({
    //     ...enrollmentData,
    //     enrolledAt: new Date(),
    //   });

    //   res.send(result);
    // });

    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
