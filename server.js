const https = require("https");
const fs = require("fs");
const path = require("path");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  https
    .createServer(
      {
        key: fs.readFileSync(path.join(__dirname, "certs", "localhost.key")),
        cert: fs.readFileSync(path.join(__dirname, "certs", "localhost.crt")),
      },
      (req, res) => {
        handle(req, res);
      }
    )
    .listen(3000, () => {
      console.log("Server is running on https://localhost:3000");
    });
});
