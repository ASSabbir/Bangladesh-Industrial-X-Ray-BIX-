const mongoose = require("mongoose");

// Disable command buffering so a query fails immediately with the REAL
// underlying error (auth failure, DNS issue, cluster paused, etc.) instead
// of Mongoose silently queueing it and only reporting a generic "buffering
// timed out" after 10s. Once the actual cause is fixed, this can stay off
// permanently — it's safe, just less forgiving of a slow first connection.
mongoose.set("bufferCommands", false);

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error(
      "MONGO_URI environment variable is missing. If deploying on Vercel, check " +
        "Settings -> Environment Variables and make sure it's enabled for the " +
        "Production environment, then redeploy."
    );
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000, // fail fast with a real error instead of hanging
    });
    cachedConnection = conn;
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    // Log the ACTUAL reason (bad credentials, DNS failure, cluster paused,
    // IP block, etc.) — this is what you want to see in Vercel's function
    // logs instead of a generic timeout.
    console.error("MongoDB connection failed:", err.message);
    throw err;
  }
};

module.exports = connectDB;