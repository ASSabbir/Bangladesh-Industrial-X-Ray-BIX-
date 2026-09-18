// Vercel serverless entry point. Vercel treats any exported function with
// the (req, res) signature as a request handler — an Express app already
// matches that signature, so exporting it directly is enough; no extra
// adapter library needed.
const app = require("../app");

module.exports = app;