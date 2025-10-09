import http from "http";
import { URLSearchParams } from "url";
import { writeFile, readFile, readdirSync } from "fs";
import { lookup } from "mime-types";

const host = "localhost";
const port = 8000;

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "", `http://${req.headers.host}`);
  switch (url.pathname) {
    case "/get_params":
      const search = new URLSearchParams(url.search);
      writeFile(
        `params_${new Date().toISOString()}.json`,
        JSON.stringify(Object.fromEntries(search.entries())),
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
            return;
          }
        }
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: "ok" }));
      break;
    default:
      const files = readdirSync("./assets", {
        recursive: true,
        encoding: "utf-8",
      });
      const file = files.find((f) => {
        const fileName = f.split(".").slice(0, -1).join(".");
        return fileName === url.pathname.slice(1);
      });
      readFile(`./assets/${file}`, (err, data) => {
        if (!file || !data) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ error: "No file found in assets directory" })
          );
          return;
        }
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Internal Server Error" }));
          return;
        }

        const contentType = lookup(file);
        res.writeHead(200, {
          "content-type": contentType || "application/octet-stream",
        });
        res.end(data);
      });
  }
});

server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
