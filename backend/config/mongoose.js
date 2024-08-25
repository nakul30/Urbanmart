const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI_CLOUD);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});
module.exports = db; 

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://karanbansal:karanbansal@karanscluster.zjrb9.mongodb.net/?retryWrites=true&w=majority&appName=KaransCluster";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("Urbanmart").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
