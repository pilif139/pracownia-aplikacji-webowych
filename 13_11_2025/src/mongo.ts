import { Db, MongoClient } from "mongodb";

class MongoService{
  private static instance: MongoService
  private isConnected = false
  private client: MongoClient | null = null;
  private dbName = "database";

  public static getInstance(): MongoService{
    if(!MongoService.instance){
      MongoService.instance = new MongoService();
    }
    return MongoService.instance
  }

  public async connect(uri?: string) : Promise<Db>{
    if(this.isConnected && this.client !== null){
      console.log("already connected");
      return this.client.db(this.dbName);
    }
    const mongoUri = uri || process.env.MONGO_URI as string;

    this.client = new MongoClient(mongoUri);

    try {
      await this.client.connect();
      this.isConnected = true;
      console.log("connected to mongodb");
      return this.client.db(this.dbName);
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error)
      throw error
    }
  }

  public async disconnect(){
    if (!this.isConnected || !this.client) return;

    try{
      await this.client.close();
      this.isConnected = false;
      console.log("mongodb disconnect")
    } catch(err){
      console.error("error disconnecting mongodb");
      throw err;
    }
  }

  public getDb(){
    return this.client?.db(this.dbName);
  }
}

export default MongoService.getInstance();
