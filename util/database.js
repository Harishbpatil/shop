const mongodb = require("mongodb");
require('dotenv').config();
const { MongoClient } = mongodb;

let _db;

const mongoConnect = (callback) => {
  const uri = process.env.MONGODB_URI; 
  if (!uri) {
    throw new Error("MongoDB URI not found in environment variables.");
  }

  MongoClient.connect(uri)
    .then((client) => {
      console.log("Connected to MongoDB!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error("No database found!");
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;