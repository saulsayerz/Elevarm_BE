const { ObjectId } = require('mongodb');

const uri = "mongodb+srv://test:saul@cluster0.sbzqnvj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function insertMenu(menu) {
  try {
    await client.connect();
    const database = client.db("elevarm");
    const collection = database.collection("menu");
    const result = await collection.insertOne({
      itemName: menu.itemName,
      restaurantId: menu.restaurantId,
      price: menu.price,
    });
    return result;
  } finally {
    await client.close();
  }
}

async function findAllMenus() {
  try {
    await client.connect();
    const database = client.db("elevarm");
    const collection = database.collection("menu");
    const result = await collection.find({}).toArray();
    return result;
  } finally {
    await client.close();
  }
}

async function findMenusByRestaurantId(restaurantId) {
  try {
    await client.connect();
    const database = client.db("elevarm");
    const collection = database.collection("menu");
    const result = await collection.find({ restaurantId: ObjectId(restaurantId) }).toArray();
    return result;
  } finally {
    await client.close();
  }
}

async function deleteMenu(menuId) {
  try {
    await client.connect();
    const database = client.db("elevarm");
    const collection = database.collection("menu");
    const result = await collection.deleteOne({ _id: ObjectId(menuId) });
    return result;
  } finally {
    await client.close();
  }
}

async function updateMenu(menuId, menu) {
  try {
    await client.connect();
    const database = client.db("elevarm");
    const collection = database.collection("menu");
    const result = await collection.updateOne({ _id: ObjectId(menuId) }, { $set: menu });
    return result;
  } finally {
    await client.close();
  }
}

async function findMenuItemById(menuItemId) {
    try {
      await client.connect();
      const database = client.db("elevarm");
      const collection = database.collection("menu");
      const result = await collection.findOne({ _id: ObjectId(menuItemId) });
      return result;
    } finally {
      await client.close();
    }
  }

module.exports = {
  insertMenu,
  findAllMenus,
  findMenusByRestaurantId,
  deleteMenu,
  updateMenu,
  findMenuItemById,
};
