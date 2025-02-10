import mongoose from "mongoose";
import dotenv from "dotenv";
import { ENV_VARS } from "./env";

// Load environment variables
dotenv.config();

// src/config/database.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  private static instance: Database;
  private connection: mongoose.Connection | null = null;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    if (!this.connection) {
      try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            dbName
            useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        this.connection = mongoose.connection;
        console.log('✅ MongoDB connected');
      } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        throw error;
      }
    } else {
      console.log('✅ Already connected to MongoDB');
    }
  }

  public getConnection(): mongoose.Connection | null {
    return this.connection;
  }
}

export default Database;

