import express from "express"
import MongoService from '../mongo'

const errorMiddleware = express.Router();
const db = MongoService.getDb();

errorMiddleware.use((req,res,next) => {
  if(!db){
    console.error("no mongodb connected");
    next();
    return;
  }
  try {
    next();
  } catch (err) {
    const errorLogs = db.collection("errorLogs");
    errorLogs.insertOne({
      request: req,
      response: res,
      error: err
    })
  }
})

export { errorMiddleware }
