import express from "express";
import MongoService from '../mongo'

const logsMiddleware = express.Router();
const db = MongoService.getDb();

logsMiddleware.use((req,_, next) => {
  if (!db){
    console.error("no mongodb connection");
    next();
    return;
  }

  const accessLogs = db.collection('accessLogs');
  accessLogs.insertOne(req);
  next();
})

export { logsMiddleware }
