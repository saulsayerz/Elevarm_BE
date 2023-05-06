const { ObjectId } = require('mongodb');

const uri = "mongodb+srv://test:saul@cluster0.sbzqnvj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function insertRestaurant(restaurant) {
    try {
      await client.connect();
      const database = client.db("elevarm");
      const collection = database.collection("restaurant");
      const result = await collection.insertOne({
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
      });
      return result;
    } finally {
      await client.close();
    }
  }
  
  async function findAllRestaurants() {
    try {
      await client.connect();
      const database = client.db("elevarm");
      const collection = database.collection("restaurant");
      const result = await collection.find({}).toArray();
      return result;
    } finally {
      await client.close();
    }
  }
  
  async function deleteRestaurant(restaurantId) {
    try {
      await client.connect();
      const database = client.db("elevarm");
      const restaurantCollection = database.collection("restaurant");
      const menuCollection = database.collection("menu");
      
      // Find all menu items associated with the restaurant to be deleted
      const menuItems = await menuCollection.find({ restaurantId: ObjectId(restaurantId) }).toArray();
  
      // Delete all menu items
      for (const menuItem of menuItems) {
        await menuCollection.deleteOne({ _id: menuItem._id });
      }
  
      // Delete the restaurant
      const result = await restaurantCollection.deleteOne({ _id: ObjectId(restaurantId) });
      return result;
    } finally {
      await client.close();
    }
  }
  
  
  async function updateRestaurant(restaurantId, restaurant) {
    try {
      await client.connect();
      const database = client.db("elevarm");
      const collection = database.collection("restaurant");
      const result = await collection.updateOne({ _id: ObjectId(restaurantId) }, { $set: restaurant });
      return result;
    } finally {
      await client.close();
    }
  }

  module.exports = {
    insertRestaurant,
    findAllRestaurants,
    deleteRestaurant,  
    updateRestaurant,
  };