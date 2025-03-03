import mongoose from 'mongoose';
import { ENV_VARS } from './env';
import { Logger } from './logger';

/**
 * Singleton pattern for Database connection
 */
class Database {
  private static instance: Database;
  private connection: mongoose.Connection | null = null;

  private constructor() {}

  /**
   * Returns the single database instance
   */
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    if (!this.connection) {
      try {
        await mongoose.connect(ENV_VARS.DB_CONN_STRING as string, {
          dbName: ENV_VARS.DB_NAME,
        });
        this.connection = mongoose.connection;
        Logger.info('MongoDB connected.');
      } catch (error) {
        Logger.error('MongoDB connection error:', error);
        throw error;
      }
    } else {
      Logger.info('Already connected to MongoDB.');
    }
  }

  public getConnection(): mongoose.Connection | null {
    return this.connection;
  }
}

export default Database;
