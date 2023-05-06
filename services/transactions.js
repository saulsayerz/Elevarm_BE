const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://test:saul@cluster0.sbzqnvj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function insertTransaction(transaction) {
    try {
      await client.connect();
      const database = client.db("elevarm");
      const collection = database.collection("transaction");
      const menuCollection = database.collection("menu");
  
      let transactionObj = {
        id_user: transaction.id_user,
        id_driver: transaction.id_driver,
        shipping_cost: transaction.shipping_cost, //if gofood ini ongkir, if goride ini transport
        transaction_type: transaction.transaction_type,
      };
  
      if (transaction.transaction_type === "gofood") {
        transactionObj.id_restaurant = transaction.id_restaurant;
        transactionObj.food_items = transaction.food_items;
        // Fetch base prices for each food item
        const foodItemIds = transaction.food_items.map((item) => item.id_food);
        const menuItems = await menuCollection.find({ _id: { $in: foodItemIds } }).toArray();
        if (menuItems.length !== foodItemIds.length) {
          throw new Error("Invalid food item(s)");
        }
        const basePrices = {};
        menuItems.forEach((item) => {
          basePrices[item._id] = item.base_price;
        });
        // Calculate total food price
        let totalFoodPrice = 0;
        transaction.food_items.forEach((item) => {
          if (!basePrices.hasOwnProperty(item.id_food)) {
            throw new Error("Invalid food item(s)");
          }
          totalFoodPrice += basePrices[item.id_food] * item.quantity;
        });
        transactionObj.total_food_price = totalFoodPrice;
      } else if (transaction.transaction_type === "goride") {
        transactionObj.id_restaurant = null;
        transactionObj.food_items = null;
        transactionObj.total_food_price = null;
      } else {
        throw new Error("Invalid transaction type");
      }
  
      const result = await collection.insertOne(transactionObj);
      return result;
    } finally {
      await client.close();
    }
  }
  
  

async function findAllTransactions() {
  try {
    await client.connect();
    const database = client.db("elevarm");
    const collection = database.collection("transaction");
    const result = await collection.find({}).toArray();
    return result;
  } finally {
    await client.close();
  }
}

async function deleteTransaction(transactionId) {
  try {
    await client.connect();
    const database = client.db("elevarm");
    const collection = database.collection("transaction");
    const result = await collection.deleteOne({ _id: ObjectId(transactionId) });
    return result;
  } finally {
    await client.close();
  }
}

async function updateTransaction(transactionId, transaction) {
  try {
    await client.connect();
    const database = client.db("elevarm");
    const collection = database.collection("transaction");
    const result = await collection.updateOne({ _id: ObjectId(transactionId) }, { $set: transaction });
    return result;
  } finally {
    await client.close();
  }
}

module.exports = {
    insertTransaction,
    findAllTransactions,
    deleteTransaction,
    updateTransaction
  };
  