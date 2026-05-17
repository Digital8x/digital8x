const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

// Always run Next.js in production mode on the server
const dev = false;
const hostname = "localhost";
const port = process.env.PORT || 3000;

console.log(`Starting Next.js production server on port ${port}...`);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error occurred handling", req.url, err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    })
      .once("error", (err) => {
        console.error("Server error:", err);
        process.exit(1);
      })
      .listen(port, () => {
        console.log(`> Next.js Server ready on port ${port}`);
      });
  })
  .catch((err) => {
    console.error("Next.js preparation failed:", err);
    process.exit(1);
  });
