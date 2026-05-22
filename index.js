const express = require('express');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const { createRemoteJWKSet, jwtVerify } = require('jose-cjs');
dotenv.config();
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);
app.use(express.json());
const port = process.env.PORT || 5000;

const uri = process.env.MONGODB_URI;

// const JWKS = createRemoteJWKSet(new URL(`${process.env.CLIENT_URL}/api/auth/jwks`));

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

// const verifyToken = async (req, res, next) => {
//   const { authorization } = req.headers;
//   const token = authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorize' });
//   }

//   try {
//     const JWKS = createRemoteJWKSet(new URL(`${process.env.CLIENT_URL}/api/auth/jwks`));
//     const { payload } = await jwtVerify(token, JWKS);
//     req.user = payload;

//     next();
//   } catch (error) {
//     console.error('Token validation failed:', error);
//     return res.status(401).json({ message: 'Unauthorize' });
//   }
// };

const verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization?.split(" ")[1];

  console.log("TOKEN:", token);

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const JWKS = createRemoteJWKSet(
      new URL(`${process.env.CLIENT_URL}/api/auth/jwks`)
    );

    const { payload } = await jwtVerify(token, JWKS);

    req.user = payload;

    next();
  } catch (error) {
    console.error("Token validation failed:", error);

    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};


async function run() {
  try {
    const db = client.db('ideavault');
    const ideasCollection = db.collection('ideas');

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

    app.get("/my-ideas", verifyToken, async (req, res) => {
      const email = req.user.email;

      const result = await ideasCollection
        .find({ userEmail: email })
        .toArray();

      res.send(result);
    });

    app.delete("/ideas/:id", async (req, res) => {
      const id = req.params.id;

      const result = await ideasCollection.deleteOne({
        _id: new ObjectId(id),
      });

      res.send(result);
    });

// verifyToken, 

    app.patch("/ideas/:id", async (req, res) => {
      try {
        const id = req.params.id;
        
        // Handles flat structures and explicit nested objects from the frontend forms safely
        const incomingData = req.body.ideaData || req.body;
        
        // Ensure immutable ID keys are discarded prior to updating MongoDB
        const { _id, ...cleanUpdateData } = incomingData;

        const result = await ideasCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: cleanUpdateData,
          }
        );

        res.send(result);
      } catch (error) {
        console.error("Patch Error:", error);
        res.status(500).json({ message: "Internal update failed" });
      }
    });
// ideaId

    app.get("/ideas/:ideaId", verifyToken, async (req, res) => {
  try {
    // Change "id" to "ideaId" to match your route path parameter
    const { ideaId } = req.params;

    if (!ObjectId.isValid(ideaId)) {
      return res.status(400).send({
        message: "Invalid idea id",
      });
    }

    const result = await ideasCollection.findOne({
      _id: new ObjectId(ideaId),
    });

    if (!result) {
      return res.status(404).send({
        message: "Idea not found",
      });
    }

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

    app.get("/ideas/meta/:id", async (req, res) => {
      const id = req.params.id;

      const idea = await ideasCollection.findOne({
        _id: new ObjectId(id),
      });

      res.send({
        title: idea?.title || "Idea Details",
        shortDescription: idea?.shortDescription || "",
      });
    });

    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Assignment9!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});