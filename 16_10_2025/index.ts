import express from "express";
import path from "path";
import fs from "fs";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/json", (req, res) => {
  res.json({ message: "Hello, JSON!" });
});

app.get("/html1", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send("<!DOCTYPE html><html><body><h1>Hello, XD!</h1></body></html>");
});

app.get("/html2", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/get_params", (req, res) => {
  const params = req.query;
  fs.writeFile(
    `params_${new Date().toISOString()}.json`,
    JSON.stringify(params),
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
        res.status(500).json({ error: "Failed to write file" });
      }
    }
  );
  res.json({
    ok: "ok",
  });
});

app.get("/*", (req, res) => {
  const files = fs.readdirSync("./assets", {
    recursive: true,
    encoding: "utf-8",
  });
  const file = files.find((f) => {
    const fileName = f.split(".").slice(0, -1).join(".");
    return fileName === req.path.slice(1);
  });
  if (!file) {
    res.status(404).json({ error: "No file found in assets directory" });
    return;
  }
  res.sendFile(path.join(__dirname, "assets", file), (err) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
