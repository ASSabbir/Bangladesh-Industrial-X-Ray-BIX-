// Local development entry point only. Vercel (or any other serverless
// host) does NOT use this file — it uses api/index.js instead, which
// imports the same app.js but skips app.listen() since serverless
// platforms manage the request lifecycle themselves.
const app = require("./app");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`BIX backend server running on port ${PORT}`);
});