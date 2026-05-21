// // -----------------------------Start: 52_2 ---------------------------------------
// (2) create server mongodb setup, env setup, nodemon setup .env file creation and then add idea page 
const express = require('express')
 
const dotenv = require('dotenv')

const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config()

const uri = process.env.MONGODB_URI;

const app = express()

 
const PORT = process.env.PORT


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    await client.close();
  }
}
run().catch(console.dir);
 


app.get('/', (req, res) =>{
    res.send("Server is running fine")
})



app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
    
})
 
// // ---------------------End:52_2-(1) to () --------------------------------
// // -----------------------------Start: 52_3 ---------------------------------------
// (3)core setup, create database for mongodb, create API for data add then create ideas page
const express = require('express')
const dotenv = require('dotenv')
// (18)
// const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config()

const uri = process.env.MONGODB_URI;
const app = express()
 
const PORT = process.env.PORT

// (19)st
// app.use(cors())
// app.use(express.json());
// (19)en and then run in command: npm i cors



const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {
    
    await client.connect();

    // (14)st create database for mongodb
    const db = client.db("wanderlust");
    const destinationCollection = db.collection("destinations")
    // (14)en

    // (15)st create API for data add/post
    app.post('/destination', async (req, res) => {
      const destinationData= req.body
      console.log(destinationData);
      const result = await destinationCollection.insertOne(destinationData)
      res.json(result)// or res.send(result)
    })
    // (15)en then go to add-destination page in wanderlust client
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // (20)commit it and check to add and then (start: 52_4)  then go to wanderlust-client and create page.jsx creating destinations folder in creating add-destinations in app folder
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send("Server is running fine")
})


app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
    
})
 
// // ---------------------End:52_3-(1) to () --------------------------------
// // -----------------------------Start: 52_4 ---------------------------------------
// (4) create api for data get
const express = require('express')
const dotenv = require('dotenv')

const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config()

const uri = process.env.MONGODB_URI;
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    
    await client.connect();

    // create database for mongodb
    const db = client.db("wanderlust");
    const destinationCollection = db.collection("destinations")
    // ---------------------------
    // (2)st create API for data get/display
    app.get("/destination", async(req, res) => {
      const result = await destinationCollection.find().toArray();
      res.json(result);
    })

    // or
    // app.get('/destination', async(req, res) =>{
    //     const cursor = destinationCollection.find();
    //     const result = await cursor.toArray();
    //     res.send(result);
    // })
    // (2)en then go to destinations page in client----------------------------

    // create API for data add/post
    app.post('/destination', async (req, res) => {
      const destinationData= req.body
      console.log(destinationData);
      const result = await destinationCollection.insertOne(destinationData)
      res.json(result)// or res.send(result)
    })
    // ----------------------------
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);
// --------------

app.get('/', (req, res) =>{
    res.send("Server is running fine")
})


app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
    
}) 
// // ---------------------End:52_4-(1) to () --------------------------------
// // -----------------------------Start: 52_5 ---------------------------------------
// (5)create API for details data display
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require('express')
const dotenv = require('dotenv')

const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

dotenv.config()

const uri = process.env.MONGODB_URI;
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    
    await client.connect();

    // create database for mongodb
    const db = client.db("wanderlust");
    const destinationCollection = db.collection("destinations")
    // ---------------------------
    //create API for data get/display
    app.get("/destination", async(req, res) => {
      const result = await destinationCollection.find().toArray();
      res.json(result);
    })

    // or
    // app.get('/destination', async(req, res) =>{
    //     const cursor = destinationCollection.find();
    //     const result = await cursor.toArray();
    //     res.send(result);
    // })
  //  ----------------------------

    // create API for data add/post
    app.post('/destination', async (req, res) => {
      const destinationData= req.body
      console.log(destinationData);
      const result = await destinationCollection.insertOne(destinationData)
      res.json(result)// or res.send(result)
    })
    // ----------------------------
// (9)st create API for details data display
app.get("/destination/:id", async(req, res) => {
  const {id} = req.params
  const result = await destinationCollection.findOne({_id: new ObjectId(id)})
  res.json(result)
})
// or
// app.get('/destination/:id', async(req, res) =>{
//         const id = req.params.id;        
//         const query ={
//             _id: new ObjectId(id)
//         }
//         const result = await destinationCollection.findOne(query)        
//         console.log('user id', id);        
//         res.send(result);
//     })
// (9)en then check browser for single id and go to client [id] page--------------------------------------
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);
// --------------

app.get('/', (req, res) =>{
    res.send("Server is running fine")
})


app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
    
}) 
// // ---------------------End:52_5-(1) to () --------------------------------
// // -----------------------------Start: 52_6 ---------------------------------------
// (4)create api for data edit
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require('express')
const dotenv = require('dotenv')

const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

dotenv.config()

const uri = process.env.MONGODB_URI;
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    
    await client.connect();

    // create database for mongodb
    const db = client.db("wanderlust");
    const destinationCollection = db.collection("destinations")
    // ---------------------------
    //create API for data get/display
    app.get("/destination", async(req, res) => {
      const result = await destinationCollection.find().toArray();
      res.json(result);
    })

    // or
    // app.get('/destination', async(req, res) =>{
    //     const cursor = destinationCollection.find();
    //     const result = await cursor.toArray();
    //     res.send(result);
    // })
  //  ----------------------------

    // create API for data add/post
    app.post('/destination', async (req, res) => {
      const destinationData= req.body
      console.log(destinationData);
      const result = await destinationCollection.insertOne(destinationData)
      res.json(result)// or res.send(result)
    })
    // ----------------------------
// create API for details data display
app.get("/destination/:id", async(req, res) => {
  const {id} = req.params
  const result = await destinationCollection.findOne({_id: new ObjectId(id)})
  res.json(result)
})
// or
// app.get('/destination/:id', async(req, res) =>{
//         const id = req.params.id;        
//         const query ={
//             _id: new ObjectId(id)
//         }
//         const result = await destinationCollection.findOne(query)        
//         console.log('user id', id);        
//         res.send(result);
//     })
// --------------------------------------
// (27)st create API for data edit
app.patch("/destination/:id", async (req, res) => {
  const {id} = req.params
  const updatedData = req.body

  const result = await destinationCollection.updateOne(
    {_id: new ObjectId(id)}, 
    {$set: updatedData}
  )
  res.json(result)

})

// ------
// or
// app.patch('/users/:id', async(req, res) =>{
//           const id = req.params.id;
//           // (6)st
//           const filter = {
//             _id: new ObjectId(id)
//           }
//           const modifiedUser = req.body;

//           const updatedDocument = {
//             $set: {
//               name: modifiedUser.name,
//               email: modifiedUser.email,
//               role: modifiedUser.role
//             }
//           }
//           const result = await userCollection.updateOne(filter, updatedDocument);
//           res.send(result);
// (27)en then go to client EditModal Page-------------------------------------------
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);
// --------------

app.get('/', (req, res) =>{
    res.send("Server is running fine")
})


app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
    
}) 
// // ---------------------End:52_6-(1) to () --------------------------------
// // -----------------------------Start: 52_7 ---------------------------------------
// (7)create api for data delete
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require('express')
const dotenv = require('dotenv')

const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

dotenv.config()

const uri = process.env.MONGODB_URI;
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    
    await client.connect();

    // create database for mongodb
    const db = client.db("wanderlust");
    const destinationCollection = db.collection("destinations")
    // ---------------------------
    //create API for data get/display
    app.get("/destination", async(req, res) => {
      const result = await destinationCollection.find().toArray();
      res.json(result);
    })

    // or
    // app.get('/destination', async(req, res) =>{
    //     const cursor = destinationCollection.find();
    //     const result = await cursor.toArray();
    //     res.send(result);
    // })
  //  ----------------------------

    // create API for data add/post
    app.post('/destination', async (req, res) => {
      const destinationData= req.body
      console.log(destinationData);
      const result = await destinationCollection.insertOne(destinationData)
      res.json(result)// or res.send(result)
    })
    // ----------------------------
// create API for details data display
app.get("/destination/:id", async(req, res) => {
  const {id} = req.params
  const result = await destinationCollection.findOne({_id: new ObjectId(id)})
  res.json(result)
})
// or
// app.get('/destination/:id', async(req, res) =>{
//         const id = req.params.id;        
//         const query ={
//             _id: new ObjectId(id)
//         }
//         const result = await destinationCollection.findOne(query)        
//         console.log('user id', id);        
//         res.send(result);
//     })
// --------------------------------------
// create API for data edit
app.patch("/destination/:id", async (req, res) => {
  const {id} = req.params
  const updatedData = req.body

  const result = await destinationCollection.updateOne(
    {_id: new ObjectId(id)}, 
    {$set: updatedData}
  )
  res.json(result)

})

// ------
// or
// app.patch('/users/:id', async(req, res) =>{
//           const id = req.params.id;
//           // (6)st
//           const filter = {
//             _id: new ObjectId(id)
//           }
//           const modifiedUser = req.body;

//           const updatedDocument = {
//             $set: {
//               name: modifiedUser.name,
//               email: modifiedUser.email,
//               role: modifiedUser.role
//             }
//           }
//           const result = await userCollection.updateOne(filter, updatedDocument);
//           res.send(result);
// -------------------------------------------
// (15)st create API for data delete
app.delete('/destination/:id', async (req, res) =>{
  const {id} = req.params;
  const result = await destinationCollection.deleteOne({_id: new ObjectId(id)})
  res.json(result)
})
// -----------
// or
// app.delete('/users/:id', async(req, res) =>{
//         const id = req.params.id;
//         const query = {
//             _id: new ObjectId(id)
//         }
//         const result = await userCollection.deleteOne(query)
//         res.send(result);
//     })
// (15) en then go to client DeleteAlert----------------------------------------


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfuly connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);
// --------------

app.get('/', (req, res) =>{
    res.send("Server is running fine")
})


app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
    
}) 
// // ---------------------End:52_7-(1) to () --------------------------------
// // -----------------------------Start: 53_6 ---------------------------------------
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require('express')
const dotenv = require('dotenv')

const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

dotenv.config()

const uri = process.env.MONGODB_URI;
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    
    await client.connect();

    // create database for mongodb
    const db = client.db("wanderlust");
    const destinationCollection = db.collection("destinations")

    // (17)
    const bookingCollection = db.collection("bookings")
    // ---------------------------
    //create API for data get/display
    app.get("/destination", async(req, res) => {
      const result = await destinationCollection.find().toArray();
      res.json(result);
    })

    // or
    // app.get('/destination', async(req, res) =>{
    //     const cursor = destinationCollection.find();
    //     const result = await cursor.toArray();
    //     res.send(result);
    // })
  //  ----------------------------

    // create API for data add/post
    app.post('/destination', async (req, res) => {
      const destinationData= req.body
      // console.log(destinationData);
      const result = await destinationCollection.insertOne(destinationData)
      res.json(result)// or res.send(result)
    })
    // ----------------------------
// create API for details data display
app.get("/destination/:id", async(req, res) => {
  const {id} = req.params
  const result = await destinationCollection.findOne({_id: new ObjectId(id)})
  res.json(result)
})
// or
// app.get('/destination/:id', async(req, res) =>{
//         const id = req.params.id;        
//         const query ={
//             _id: new ObjectId(id)
//         }
//         const result = await destinationCollection.findOne(query)        
//         console.log('user id', id);        
//         res.send(result);
//     })
// --------------------------------------
// create API for data edit
app.patch("/destination/:id", async (req, res) => {
  const {id} = req.params
  const updatedData = req.body

  const result = await destinationCollection.updateOne(
    {_id: new ObjectId(id)}, 
    {$set: updatedData}
  )
  res.json(result)

})

// ------
// or
// app.patch('/users/:id', async(req, res) =>{
//           const id = req.params.id;
//           // (6)st
//           const filter = {
//             _id: new ObjectId(id)
//           }
//           const modifiedUser = req.body;

//           const updatedDocument = {
//             $set: {
//               name: modifiedUser.name,
//               email: modifiedUser.email,
//               role: modifiedUser.role
//             }
//           }
//           const result = await userCollection.updateOne(filter, updatedDocument);
//           res.send(result);
// -------------------------------------------
// create API for data delete
app.delete('/destination/:id', async (req, res) =>{
  const {id} = req.params;
  const result = await destinationCollection.deleteOne({_id: new ObjectId(id)})
  res.json(result)
})
// -----------
// or
// app.delete('/users/:id', async(req, res) =>{
//         const id = req.params.id;
//         const query = {
//             _id: new ObjectId(id)
//         }
//         const result = await userCollection.deleteOne(query)
//         res.send(result);
//     })
// ---------------------------------------

// (19)st create API for booking data
app.post("/booking", async(req, res) => {
  const bookingData = req.body;
  const result = await bookingCollection.insertOne(bookingData)
  res.json(result);
})  
// (19)en then go to BookingCard--------------------------------


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfuly connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);
// --------------

app.get('/', (req, res) =>{
    res.send("Server is running fine")
})


app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
    
}) 
// // ---------------------End:53_6-(1) to () --------------------------------
// // -----------------------------Start: 53_7 ---------------------------------------
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require('express')
const dotenv = require('dotenv')

const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

dotenv.config()

const uri = process.env.MONGODB_URI;
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    
    await client.connect();

    // create database for mongodb
    const db = client.db("wanderlust");
    const destinationCollection = db.collection("destinations")

    
    const bookingCollection = db.collection("bookings")
    // ---------------------------
    //create API for data get/display
    app.get("/destination", async(req, res) => {
      const result = await destinationCollection.find().toArray();
      res.json(result);
    })

    // or
    // app.get('/destination', async(req, res) =>{
    //     const cursor = destinationCollection.find();
    //     const result = await cursor.toArray();
    //     res.send(result);
    // })
  //  ----------------------------

    // create API for data add/post
    app.post('/destination', async (req, res) => {
      const destinationData= req.body
      // console.log(destinationData);
      const result = await destinationCollection.insertOne(destinationData)
      res.json(result)// or res.send(result)
    })
    // ----------------------------
// create API for details data display
app.get("/destination/:id", async(req, res) => {
  const {id} = req.params
  const result = await destinationCollection.findOne({_id: new ObjectId(id)})
  res.json(result)
})
// or
// app.get('/destination/:id', async(req, res) =>{
//         const id = req.params.id;        
//         const query ={
//             _id: new ObjectId(id)
//         }
//         const result = await destinationCollection.findOne(query)        
//         console.log('user id', id);        
//         res.send(result);
//     })
// --------------------------------------
// create API for data edit
app.patch("/destination/:id", async (req, res) => {
  const {id} = req.params
  const updatedData = req.body

  const result = await destinationCollection.updateOne(
    {_id: new ObjectId(id)}, 
    {$set: updatedData}
  )
  res.json(result)

})

// ------
// or
// app.patch('/users/:id', async(req, res) =>{
//           const id = req.params.id;
//           // (6)st
//           const filter = {
//             _id: new ObjectId(id)
//           }
//           const modifiedUser = req.body;

//           const updatedDocument = {
//             $set: {
//               name: modifiedUser.name,
//               email: modifiedUser.email,
//               role: modifiedUser.role
//             }
//           }
//           const result = await userCollection.updateOne(filter, updatedDocument);
//           res.send(result);
// -------------------------------------------
// create API for data delete
app.delete('/destination/:id', async (req, res) =>{
  const {id} = req.params;
  const result = await destinationCollection.deleteOne({_id: new ObjectId(id)})
  res.json(result)
})
// -----------
// or
// app.delete('/users/:id', async(req, res) =>{
//         const id = req.params.id;
//         const query = {
//             _id: new ObjectId(id)
//         }
//         const result = await userCollection.deleteOne(query)
//         res.send(result);
//     })
// ---------------------------------------

// (3)st create API for booking dat display
app.get("/booking/:userId", async (req, res) => {
  const {userId} = req.params;
  // const result = await bookingCollection.find({userId: userId});
  // (4) then go to client MyBookingPage
  const result = await bookingCollection.find({userId: userId}).toArray();
  res.json(result);
})
// (3)en then check browser localhost:5000/booking/any id


// create API for booking add data
app.post("/booking", async(req, res) => {
  const bookingData = req.body;
  const result = await bookingCollection.insertOne(bookingData)
  res.json(result);
})  
// --------------------------------


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfuly connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);
// --------------

app.get('/', (req, res) =>{
    res.send("Server is running fine")
})


app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
    
}) 
// // ---------------------End:53_7-(1) to () --------------------------------
// // -----------------------------Start: 53_8 ---------------------------------------
// const dns = require("node:dns");
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// const express = require('express')
// const dotenv = require('dotenv')

// const cors = require('cors')
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// dotenv.config()

// const uri = process.env.MONGODB_URI;
// const app = express()
// const PORT = process.env.PORT

// app.use(cors())
// app.use(express.json());

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });


// async function run() {
//   try {
    
//     await client.connect();

//     // create database for mongodb
//     const db = client.db("wanderlust");
//     const destinationCollection = db.collection("destinations")

    
//     const bookingCollection = db.collection("bookings")
//     // ---------------------------
//     //create API for data get/display
//     app.get("/destination", async(req, res) => {
//       const result = await destinationCollection.find().toArray();
//       res.json(result);
//     })

//     // or
//     // app.get('/destination', async(req, res) =>{
//     //     const cursor = destinationCollection.find();
//     //     const result = await cursor.toArray();
//     //     res.send(result);
//     // })
//   //  ----------------------------

//     // create API for data add/post
//     app.post('/destination', async (req, res) => {
//       const destinationData= req.body
//       // console.log(destinationData);
//       const result = await destinationCollection.insertOne(destinationData)
//       res.json(result)// or res.send(result)
//     })
//     // ----------------------------
// // create API for details data display
// app.get("/destination/:id", async(req, res) => {
//   const {id} = req.params
//   const result = await destinationCollection.findOne({_id: new ObjectId(id)})
//   res.json(result)
// })
// // or
// // app.get('/destination/:id', async(req, res) =>{
// //         const id = req.params.id;        
// //         const query ={
// //             _id: new ObjectId(id)
// //         }
// //         const result = await destinationCollection.findOne(query)        
// //         console.log('user id', id);        
// //         res.send(result);
// //     })
// // --------------------------------------
// // create API for data edit
// app.patch("/destination/:id", async (req, res) => {
//   const {id} = req.params
//   const updatedData = req.body

//   const result = await destinationCollection.updateOne(
//     {_id: new ObjectId(id)}, 
//     {$set: updatedData}
//   )
//   res.json(result)

// })

// // ------
// // or
// // app.patch('/users/:id', async(req, res) =>{
// //           const id = req.params.id;
// //           
// //           const filter = {
// //             _id: new ObjectId(id)
// //           }
// //           const modifiedUser = req.body;

// //           const updatedDocument = {
// //             $set: {
// //               name: modifiedUser.name,
// //               email: modifiedUser.email,
// //               role: modifiedUser.role
// //             }
// //           }
// //           const result = await userCollection.updateOne(filter, updatedDocument);
//  //           res.send(result);
// // -------------------------------------------
// // create API for data delete
// app.delete('/destination/:id', async (req, res) =>{
//   const {id} = req.params;
//   const result = await destinationCollection.deleteOne({_id: new ObjectId(id)})
//   res.json(result)
// })
// // -----------
// // or
// // app.delete('/users/:id', async(req, res) =>{
// //         const id = req.params.id;
// //         const query = {
// //             _id: new ObjectId(id)
// //         }
// //         const result = await userCollection.deleteOne(query)
// //         res.send(result);
// //     })
// // ---------------------------------------

// // create API for booking dat display
// app.get("/booking/:userId", async (req, res) => {
//   const {userId} = req.params;
  
//   const result = await bookingCollection.find({userId: userId}).toArray();
//   res.json(result);
// })



// // create API for booking add data
// app.post("/booking", async(req, res) => {
//   const bookingData = req.body;
//   const result = await bookingCollection.insertOne(bookingData)
//   res.json(result);
// })  
// // --------------------------------
// // (4)st create API for delete booking data
// app.delete('/booking/:bookingId', async (req, res) => {
//   const {bookingId} = req.params;
//   const result = await bookingCollection.deleteOne({_id: new ObjectId(bookingId)})

//   res.json(result)
// })
// // (4)en then create components/BookingCancelAlert.jsx in client-------------------------------
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfuly connected to MongoDB!");
//   } finally {
    
//     // await client.close();
//   }
// }
// run().catch(console.dir);
// // --------------

// app.get('/', (req, res) =>{
//     res.send("Server is running fine")
// })


// app.listen(PORT, ()=> {
//     console.log(`Server running on port ${PORT}`);
    
// }) 
// // ---------------------End:53_7-(1) to () --------------------------------
// // -----------------------------Start: 54_2 ---------------------------------------
// const dns = require("node:dns");
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// const express = require('express')
// const dotenv = require('dotenv')

// const cors = require('cors')
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// dotenv.config()

// const uri = process.env.MONGODB_URI;
// const app = express()
// const PORT = process.env.PORT

// app.use(cors())
// app.use(express.json());

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });


// async function run() {
//   try {
    
//     await client.connect();

//     // create database for mongodb
//     const db = client.db("wanderlust");
//     const destinationCollection = db.collection("destinations")

    
//     const bookingCollection = db.collection("bookings")
//     // ---------------------------
//     //create API for data get/display
//     app.get("/destination", async(req, res) => {
//       const result = await destinationCollection.find().toArray();
//       res.json(result);
//     })

//     // or
//     // app.get('/destination', async(req, res) =>{
//     //     const cursor = destinationCollection.find();
//     //     const result = await cursor.toArray();
//     //     res.send(result);
//     // })
//   //  ----------------------------

//     // create API for data add/post
//     app.post('/destination', async (req, res) => {
//       const destinationData= req.body
//       // console.log(destinationData);
//       const result = await destinationCollection.insertOne(destinationData)
//       res.json(result)// or res.send(result)
//     })
//     // ----------------------------
// // create API for details data display
// // app.get("/destination/:id", async(req, res) => {
  // (2)st middleware
  app.get("/destination/:id", (req, res, next)=>{
    const header = req.headers.authorization
    // console.log(header)
    // next()
    // (3)st commit previous two
    if(header === "logged in"){
      next()
    } else {
      res.status(401), json({message: "Unauthorized"})
    }
    // (3)en then (start: 54_4) then go auth.js in client
    
  }, async(req, res) => {
  // (2)en
//   const {id} = req.params
//   const result = await destinationCollection.findOne({_id: new ObjectId(id)})
//   res.json(result)
// })
// // or
// // app.get('/destination/:id', async(req, res) =>{
// //         const id = req.params.id;        
// //         const query ={
// //             _id: new ObjectId(id)
// //         }
// //         const result = await destinationCollection.findOne(query)        
// //         console.log('user id', id);        
// //         res.send(result);
// //     })
// // --------------------------------------
// // create API for data edit
// app.patch("/destination/:id", async (req, res) => {
//   const {id} = req.params
//   const updatedData = req.body

//   const result = await destinationCollection.updateOne(
//     {_id: new ObjectId(id)}, 
//     {$set: updatedData}
//   )
//   res.json(result)

// })

// // ------
// // or
// // app.patch('/users/:id', async(req, res) =>{
// //           const id = req.params.id;
// //           
// //           const filter = {
// //             _id: new ObjectId(id)
// //           }
// //           const modifiedUser = req.body;

// //           const updatedDocument = {
// //             $set: {
// //               name: modifiedUser.name,
// //               email: modifiedUser.email,
// //               role: modifiedUser.role
// //             }
// //           }
// //           const result = await userCollection.updateOne(filter, updatedDocument);
//  //           res.send(result);
// // -------------------------------------------
// // create API for data delete
// app.delete('/destination/:id', async (req, res) =>{
//   const {id} = req.params;
//   const result = await destinationCollection.deleteOne({_id: new ObjectId(id)})
//   res.json(result)
// })
// // -----------
// // or
// // app.delete('/users/:id', async(req, res) =>{
// //         const id = req.params.id;
// //         const query = {
// //             _id: new ObjectId(id)
// //         }
// //         const result = await userCollection.deleteOne(query)
// //         res.send(result);
// //     })
// // ---------------------------------------

// // create API for booking dat display
// app.get("/booking/:userId", async (req, res) => {
//   const {userId} = req.params;
  
//   const result = await bookingCollection.find({userId: userId}).toArray();
//   res.json(result);
// })



// // create API for booking add data
// app.post("/booking", async(req, res) => {
//   const bookingData = req.body;
//   const result = await bookingCollection.insertOne(bookingData)
//   res.json(result);
// })  
// // --------------------------------
// // create API for delete booking data
// app.delete('/booking/:bookingId', async (req, res) => {
//   const {bookingId} = req.params;
//   const result = await bookingCollection.deleteOne({_id: new ObjectId(bookingId)})

//   res.json(result)
// })
// //-------------------------------
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfuly connected to MongoDB!");
//   } finally {
    
//     // await client.close();
//   }
// }
// run().catch(console.dir);
// // --------------

// app.get('/', (req, res) =>{
//     res.send("Server is running fine")
// })


// app.listen(PORT, ()=> {
//     console.log(`Server running on port ${PORT}`);
    
// }) 
// // ---------------------End:54_2-(1) to () --------------------------------
// // -----------------------------Start: 54_4 ---------------------------------------
// const dns = require("node:dns");
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// const express = require('express')
// const dotenv = require('dotenv')

// const cors = require('cors')
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// dotenv.config()

// const uri = process.env.MONGODB_URI;
// const app = express()
// const PORT = process.env.PORT

// app.use(cors())
// app.use(express.json());

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });


// async function run() {
//   try {
    
//     await client.connect();

//     // create database for mongodb
//     const db = client.db("wanderlust");
//     const destinationCollection = db.collection("destinations")

    
//     const bookingCollection = db.collection("bookings")
//     // ---------------------------
//     //create API for data get/display
//     app.get("/destination", async(req, res) => {
//       const result = await destinationCollection.find().toArray();
//       res.json(result);
//     })

//     // or
//     // app.get('/destination', async(req, res) =>{
//     //     const cursor = destinationCollection.find();
//     //     const result = await cursor.toArray();
//     //     res.send(result);
//     // })
//   //  ----------------------------

//     // create API for data add/post
//     app.post('/destination', async (req, res) => {
//       const destinationData= req.body
//       // console.log(destinationData);
//       const result = await destinationCollection.insertOne(destinationData)
//       res.json(result)// or res.send(result)
//     })
//     // ----------------------------
// // create API for details data display
// // app.get("/destination/:id", async(req, res) => {
//   // middleware
//   app.get("/destination/:id", (req, res, next)=>{
//     const header = req.headers.authorization
    
//     // if(header === "logged in"){
//     //   next()
//     // } else {
//     //   res.status(401), json({message: "Unauthorized"})
//     // }
//     // (7)st commit previous
//     console.log(header)
//      next()
//     // (7)en then (start: 54_5) in this page
    
    
//   }, async(req, res) => {
  
//   const {id} = req.params
//   const result = await destinationCollection.findOne({_id: new ObjectId(id)})
//   res.json(result)
// })
// // or
// // app.get('/destination/:id', async(req, res) =>{
// //         const id = req.params.id;        
// //         const query ={
// //             _id: new ObjectId(id)
// //         }
// //         const result = await destinationCollection.findOne(query)        
// //         console.log('user id', id);        
// //         res.send(result);
// //     })
// // --------------------------------------
// // create API for data edit
// app.patch("/destination/:id", async (req, res) => {
//   const {id} = req.params
//   const updatedData = req.body

//   const result = await destinationCollection.updateOne(
//     {_id: new ObjectId(id)}, 
//     {$set: updatedData}
//   )
//   res.json(result)

// })

// // ------
// // or
// // app.patch('/users/:id', async(req, res) =>{
// //           const id = req.params.id;
// //           
// //           const filter = {
// //             _id: new ObjectId(id)
// //           }
// //           const modifiedUser = req.body;

// //           const updatedDocument = {
// //             $set: {
// //               name: modifiedUser.name,
// //               email: modifiedUser.email,
// //               role: modifiedUser.role
// //             }
// //           }
// //           const result = await userCollection.updateOne(filter, updatedDocument);
//  //           res.send(result);
// // -------------------------------------------
// // create API for data delete
// app.delete('/destination/:id', async (req, res) =>{
//   const {id} = req.params;
//   const result = await destinationCollection.deleteOne({_id: new ObjectId(id)})
//   res.json(result)
// })
// // -----------
// // or
// // app.delete('/users/:id', async(req, res) =>{
// //         const id = req.params.id;
// //         const query = {
// //             _id: new ObjectId(id)
// //         }
// //         const result = await userCollection.deleteOne(query)
// //         res.send(result);
// //     })
// // ---------------------------------------

// // create API for booking dat display
// app.get("/booking/:userId", async (req, res) => {
//   const {userId} = req.params;
  
//   const result = await bookingCollection.find({userId: userId}).toArray();
//   res.json(result);
// })



// // create API for booking add data
// app.post("/booking", async(req, res) => {
//   const bookingData = req.body;
//   const result = await bookingCollection.insertOne(bookingData)
//   res.json(result);
// })  
// // --------------------------------
// // create API for delete booking data
// app.delete('/booking/:bookingId', async (req, res) => {
//   const {bookingId} = req.params;
//   const result = await bookingCollection.deleteOne({_id: new ObjectId(bookingId)})

//   res.json(result)
// })
// //-------------------------------
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfuly connected to MongoDB!");
//   } finally {
    
//     // await client.close();
//   }
// }
// run().catch(console.dir);
// // --------------

// app.get('/', (req, res) =>{
//     res.send("Server is running fine")
// })


// app.listen(PORT, ()=> {
//     console.log(`Server running on port ${PORT}`);
    
// }) 
// // ---------------------End:54_4-(1) to () --------------------------------
// // -----------------------------Start: 54_5 ---------------------------------------
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require('express')
const dotenv = require('dotenv')

const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");

dotenv.config()

const uri = process.env.MONGODB_URI;
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// (5)st
const JWKS = createRemoteJWKSet(
  new URL("http://localhost:3000/api/auth/jwks")
)
// (5)en

// (1)st
// const verifyToken = (req, res, next) => {
  // (8) then (start: 54_6) in this page
const verifyToken = async(req, res, next) => {
  const authHeader = req?.headers.authorization
  // (3)st
  if(!authHeader) {
    return res.status(401).json({ message: "Unauthorized"});
  }
  // (3)en
  // console.log(authHeader)
  // (2)st
  const token = authHeader.split(" ")[1];
  // (4)st
  if(!token) {
    return res.status(401).json({message: "Unauthorized"})
  }
  // (4)en then check in browser: http://localhost:3000/api/auth/jwks and install by cmd: npm i jose-cjs
  // console.log(token)
  // (6)st from better-auth documentation
// const {payload} = await jwtVerify(token, JWKS)
// console.log(payload)
  // (6)en

  // (7)st commit (6)
  try {
const {payload} = await jwtVerify(token, JWKS)
console.log(payload)
next()
  } catch (error){
    return res.status(403).json({message: "Forbidden"})
  }
  // (7)en
  
  // (2)en
  // next()
}
// (1)en
async function run() {
  try {
    
    await client.connect();

    // create database for mongodb
    const db = client.db("wanderlust");
    const destinationCollection = db.collection("destinations")

    
    const bookingCollection = db.collection("bookings")
    // ---------------------------
    //create API for data get/display
    app.get("/destination", async(req, res) => {
      const result = await destinationCollection.find().toArray();
      res.json(result);
    })

    // or
    // app.get('/destination', async(req, res) =>{
    //     const cursor = destinationCollection.find();
    //     const result = await cursor.toArray();
    //     res.send(result);
    // })
  //  ----------------------------

    // create API for data add/post
    app.post('/destination', async (req, res) => {
      const destinationData= req.body
      // console.log(destinationData);
      const result = await destinationCollection.insertOne(destinationData)
      res.json(result)// or res.send(result)
    })
    // ----------------------------
// create API for details data display

  // middleware
  // (2)st
//   app.get("/destination/:id", (req, res, next)=>{
//     const header = req.headers.authorization
    
//     console.log(header)
//      next()
    
//   }, async(req, res) => {
  
//   const {id} = req.params
//   const result = await destinationCollection.findOne({_id: new ObjectId(id)})
//   res.json(result)
// })
// (2)en

// (3)st commit (2)
app.get("/destination/:id", verifyToken, async(req, res) => {
  
  const {id} = req.params
  const result = await destinationCollection.findOne({_id: new ObjectId(id)})
  res.json(result)
})
// (3)en

// or
// app.get('/destination/:id', async(req, res) =>{
//         const id = req.params.id;        
//         const query ={
//             _id: new ObjectId(id)
//         }
//         const result = await destinationCollection.findOne(query)        
//         console.log('user id', id);        
//         res.send(result);
//     })
// --------------------------------------
// create API for data edit
app.patch("/destination/:id", async (req, res) => {
  const {id} = req.params
  const updatedData = req.body

  const result = await destinationCollection.updateOne(
    {_id: new ObjectId(id)}, 
    {$set: updatedData}
  )
  res.json(result)

})

// ------
// or
// app.patch('/users/:id', async(req, res) =>{
//           const id = req.params.id;
//           
//           const filter = {
//             _id: new ObjectId(id)
//           }
//           const modifiedUser = req.body;

//           const updatedDocument = {
//             $set: {
//               name: modifiedUser.name,
//               email: modifiedUser.email,
//               role: modifiedUser.role
//             }
//           }
//           const result = await userCollection.updateOne(filter, updatedDocument);
 //           res.send(result);
// -------------------------------------------
// create API for data delete
app.delete('/destination/:id', async (req, res) =>{
  const {id} = req.params;
  const result = await destinationCollection.deleteOne({_id: new ObjectId(id)})
  res.json(result)
})
// -----------
// or
// app.delete('/users/:id', async(req, res) =>{
//         const id = req.params.id;
//         const query = {
//             _id: new ObjectId(id)
//         }
//         const result = await userCollection.deleteOne(query)
//         res.send(result);
//     })
// ---------------------------------------

// create API for booking dat display
app.get("/booking/:userId", async (req, res) => {
  const {userId} = req.params;
  
  const result = await bookingCollection.find({userId: userId}).toArray();
  res.json(result);
})

// create API for booking add data
app.post("/booking", async(req, res) => {
  const bookingData = req.body;
  const result = await bookingCollection.insertOne(bookingData)
  res.json(result);
})  
// --------------------------------
// create API for delete booking data
app.delete('/booking/:bookingId', async (req, res) => {
  const {bookingId} = req.params;
  const result = await bookingCollection.deleteOne({_id: new ObjectId(bookingId)})

  res.json(result)
})
//-------------------------------
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfuly connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);
// --------------

app.get('/', (req, res) =>{
    res.send("Server is running fine")
})

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
    
}) 
// // ---------------------End:54_5-(1) to () --------------------------------
// // -----------------------------Start: 54_6 ---------------------------------------
// const dns = require("node:dns");
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// const express = require('express')
// const dotenv = require('dotenv')

// const cors = require('cors')
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");

// dotenv.config()

// const uri = process.env.MONGODB_URI;
// const app = express()
// const PORT = process.env.PORT

// app.use(cors())
// app.use(express.json());

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });


// const JWKS = createRemoteJWKSet(
//   new URL("http://localhost:3000/api/auth/jwks")
// )

// const verifyToken = async(req, res, next) => {
//   const authHeader = req?.headers.authorization
  
//   if(!authHeader) {
//     return res.status(401).json({ message: "Unauthorized"});
//   }
  
//   const token = authHeader.split(" ")[1];
  
//   if(!token) {
//     return res.status(401).json({message: "Unauthorized"})
//   }
  
//   try {
// const {payload} = await jwtVerify(token, JWKS)
// console.log(payload)
// next()
//   } catch (error){
//     return res.status(403).json({message: "Forbidden"})
//   }
  
// }

// async function run() {
//   try {
    
//     await client.connect();

//     // create database for mongodb
//     const db = client.db("wanderlust");
//     const destinationCollection = db.collection("destinations")

    
//     const bookingCollection = db.collection("bookings")
//     // ---------------------------
//     //create API for data get/display
//     app.get("/destination", async(req, res) => {
//       const result = await destinationCollection.find().toArray();
//       res.json(result);
//     })
//   //  ----------------------------

//     // create API for data add/post
//     app.post('/destination', async (req, res) => {
//       const destinationData= req.body
//       // console.log(destinationData);
//       const result = await destinationCollection.insertOne(destinationData)
//       res.json(result)// or res.send(result)
//     })
//     // ----------------------------
// // create API for details data display
// // middleware
// app.get("/destination/:id", verifyToken, async(req, res) => {
  
//   const {id} = req.params
//   const result = await destinationCollection.findOne({_id: new ObjectId(id)})
//   res.json(result)
// })
// // --------------------------------------
// // create API for data edit
// app.patch("/destination/:id", async (req, res) => {
//   const {id} = req.params
//   const updatedData = req.body

//   const result = await destinationCollection.updateOne(
//     {_id: new ObjectId(id)}, 
//     {$set: updatedData}
//   )
//   res.json(result)

// })

// // -------------------------------------------
// // create API for data delete
// app.delete('/destination/:id', async (req, res) =>{
//   const {id} = req.params;
//   const result = await destinationCollection.deleteOne({_id: new ObjectId(id)})
//   res.json(result)
// })

// // ---------------------------------------

// // create API for booking dat display
// app.get("/booking/:userId", async (req, res) => {
//   const {userId} = req.params;
  
//   const result = await bookingCollection.find({userId: userId}).toArray();
//   res.json(result);
// })

// // create API for booking add data
// // app.post("/booking", async(req, res) => {
//   // (1) then go to BookingCard file in client
// app.post("/booking", verifyToken, async(req, res) => {
//   const bookingData = req.body;
//   const result = await bookingCollection.insertOne(bookingData)
//   res.json(result);
// })  
// // --------------------------------
// // create API for delete booking data
// // app.delete('/booking/:bookingId', async (req, res) => {
// // (6) then check my bookings
// app.delete('/booking/:bookingId', verifyToken, async (req, res) => {
//   const {bookingId} = req.params;
//   const result = await bookingCollection.deleteOne({_id: new ObjectId(bookingId)})

//   res.json(result)
// })
// //-------------------------------
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfuly connected to MongoDB!");
//   } finally {
    
//   }
// }
// run().catch(console.dir);
// // --------------

// app.get('/', (req, res) =>{
//     res.send("Server is running fine")
// })

// app.listen(PORT, ()=> {
//     console.log(`Server running on port ${PORT}`);
    
// }) 
// // ---------------------End:54_6-(1) to () --------------------------------
// // -----------------------------Start: 54_7 ---------------------------------------
// const dns = require("node:dns");
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// const express = require('express')
// const dotenv = require('dotenv')

// const cors = require('cors')
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");

// dotenv.config()

// const uri = process.env.MONGODB_URI;
// const app = express()
// const PORT = process.env.PORT

// app.use(cors())
// app.use(express.json());

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });


// // const JWKS = createRemoteJWKSet(new URL("http://localhost:3000/api/auth/jwks")
// // (2)
// const JWKS = createRemoteJWKSet(new URL(`${process.env.CLIENT_URL}/api/auth/jwks`));

// const verifyToken = async(req, res, next) => {
//   const authHeader = req?.headers.authorization
  
//   if(!authHeader) {
//     return res.status(401).json({ message: "Unauthorized"});
//   }
  
//   const token = authHeader.split(" ")[1];
  
//   if(!token) {
//     return res.status(401).json({message: "Unauthorized"})
//   }
  
//   try {
// const {payload} = await jwtVerify(token, JWKS)
// console.log(payload)
// next()
//   } catch (error){
//     return res.status(403).json({message: "Forbidden"})
//   }
  
// }

// async function run() {
//   try {
//     // (3)COMMIT
//     // await client.connect();

//     // create database for mongodb
//     const db = client.db("wanderlust");
//     const destinationCollection = db.collection("destinations")

    
//     const bookingCollection = db.collection("bookings")
//     // ---------------------------
//     //create API for data get/display
//     app.get("/destination", async(req, res) => {
//       const result = await destinationCollection.find().toArray();
//       res.json(result);
//     })
//   //  ----------------------------

//     // create API for data add/post
//     app.post('/destination', async (req, res) => {
//       const destinationData= req.body
//       // console.log(destinationData);
//       const result = await destinationCollection.insertOne(destinationData)
//       res.json(result)// or res.send(result)
//     })
//     // ----------------------------
// // create API for details data display
// // middleware
// app.get("/destination/:id", verifyToken, async(req, res) => {
  
//   const {id} = req.params
//   const result = await destinationCollection.findOne({_id: new ObjectId(id)})
//   res.json(result)
// })
// // --------------------------------------
// // create API for data edit
// app.patch("/destination/:id", async (req, res) => {
//   const {id} = req.params
//   const updatedData = req.body

//   const result = await destinationCollection.updateOne(
//     {_id: new ObjectId(id)}, 
//     {$set: updatedData}
//   )
//   res.json(result)

// })

// // -------------------------------------------
// // create API for data delete
// app.delete('/destination/:id', async (req, res) =>{
//   const {id} = req.params;
//   const result = await destinationCollection.deleteOne({_id: new ObjectId(id)})
//   res.json(result)
// })

// // ---------------------------------------

// // create API for booking dat display
// app.get("/booking/:userId", async (req, res) => {
//   const {userId} = req.params;
  
//   const result = await bookingCollection.find({userId: userId}).toArray();
//   res.json(result);
// })

// // create API for booking add data

// app.post("/booking", verifyToken, async(req, res) => {
//   const bookingData = req.body;
//   const result = await bookingCollection.insertOne(bookingData)
//   res.json(result);
// })  
// // --------------------------------
// // create API for delete booking data

// app.delete('/booking/:bookingId', verifyToken, async (req, res) => {
//   const {bookingId} = req.params;
//   const result = await bookingCollection.deleteOne({_id: new ObjectId(bookingId)})

//   res.json(result)
// })
// //-------------------------------
// // (4)COMMIT then create vercel.json file and put some json and then deploy vercel  to vercel/by command and then (start: 54_8) to client .env file
//     // await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfuly connected to MongoDB!");
//   } finally {
    
//   }
// }
// run().catch(console.dir);
// // --------------

// app.get('/', (req, res) =>{
//     res.send("Server is running fine")
// })

// app.listen(PORT, ()=> {
//     console.log(`Server running on port ${PORT}`);
    
// }) 
// // ---------------------End:54_7-(1) to () --------------------------------
// -----------------------------Start: 54_9 ---------------------------------------
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require('express')
const dotenv = require('dotenv')

const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");

dotenv.config()

const uri = process.env.MONGODB_URI;
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const JWKS = createRemoteJWKSet(new URL(`${process.env.CLIENT_URL}/api/auth/jwks`));

const verifyToken = async(req, res, next) => {
  const authHeader = req?.headers.authorization
  
  if(!authHeader) {
    return res.status(401).json({ message: "Unauthorized"});
  }
  
  const token = authHeader.split(" ")[1];
  
  if(!token) {
    return res.status(401).json({message: "Unauthorized"})
  }
  
  try {
const {payload} = await jwtVerify(token, JWKS)
console.log(payload)
next()
  } catch (error){
    return res.status(403).json({message: "Forbidden"})
  }
  
}

async function run() {
  try {

    const db = client.db("wanderlust");
    const destinationCollection = db.collection("destinations")
    const bookingCollection = db.collection("bookings")
    // ---------------------------

    // (1)st create API for featured Display
    app.get("/featured", async (req, res) => {
      const result = await destinationCollection.find().limit(4).toArray()
      res.json(result)
    })
    // (1)en then create components/Featured.jsx in client
    //create API for data get/display
    app.get("/destination", async(req, res) => {
      const result = await destinationCollection.find().toArray();
      res.json(result);
    })
  //  ----------------------------

    // create API for data add/post
    app.post('/destination', async (req, res) => {
      const destinationData= req.body
      // console.log(destinationData);
      const result = await destinationCollection.insertOne(destinationData)
      res.json(result)// or res.send(result)
    })
    // ----------------------------
// create API for details data display
// middleware
app.get("/destination/:id", verifyToken, async(req, res) => {
  
  const {id} = req.params
  const result = await destinationCollection.findOne({_id: new ObjectId(id)})
  res.json(result)
})
// --------------------------------------
// create API for data edit
app.patch("/destination/:id", async (req, res) => {
  const {id} = req.params
  const updatedData = req.body

  const result = await destinationCollection.updateOne(
    {_id: new ObjectId(id)}, 
    {$set: updatedData}
  )
  res.json(result)

})

// -------------------------------------------
// create API for data delete
app.delete('/destination/:id', async (req, res) =>{
  const {id} = req.params;
  const result = await destinationCollection.deleteOne({_id: new ObjectId(id)})
  res.json(result)
})

// ---------------------------------------

// create API for booking dat display
app.get("/booking/:userId", async (req, res) => {
  const {userId} = req.params;
  
  const result = await bookingCollection.find({userId: userId}).toArray();
  res.json(result);
})

// create API for booking add data

app.post("/booking", verifyToken, async(req, res) => {
  const bookingData = req.body;
  const result = await bookingCollection.insertOne(bookingData)
  res.json(result);
})  
// --------------------------------
// create API for delete booking data

app.delete('/booking/:bookingId', verifyToken, async (req, res) => {
  const {bookingId} = req.params;
  const result = await bookingCollection.deleteOne({_id: new ObjectId(bookingId)})

  res.json(result)
})
//-------------------------------

    console.log("Pinged your deployment. You successfuly connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);
// --------------

app.get('/', (req, res) =>{
    res.send("Server is running fine")
})

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
    
}) 
// ---------------------End:54_9-(1) to () --------------------------------

