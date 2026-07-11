const { MongoMemoryServer } = require("mongodb-memory-server");

(async () => {
  const mongo = await MongoMemoryServer.create({ instance: { port: 27018, dbName: "foodrescue" } });
  process.env.MONGO_URI = mongo.getUri();
  console.log("MongoDB en memoria en:", process.env.MONGO_URI);
  require("./src/server.js");
})();
