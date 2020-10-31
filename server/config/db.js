const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://fhesse:GmbMniVoPzrmGgz3@comp229books.fe9nw.mongodb.net/books?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
  