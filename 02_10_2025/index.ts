import http from "http";
import { URLSearchParams } from "url";
import { writeFile } from "fs";

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
  }
});

server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
