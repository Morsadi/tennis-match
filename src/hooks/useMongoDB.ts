
import mongoose, { ConnectOptions } from 'mongoose';
import { useState, useEffect } from 'react';

function useMongoDB() {
  const [db, setDb] = useState<mongoose.Connection | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function connectToDB() {
      const uri = 'mongodb+srv://bmorsadi:myLOVEbree24@cluster0.jfgzivg.mongodb.net/?retryWrites=true&w=majority';
      const options: ConnectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
      };

      try {
        const connection = await mongoose.createConnection(uri, options);
        setDb(connection);
      } catch (err) {
        setError(err);
      }
    }

    connectToDB();
  }, []);

  return [db, error];
}

function useInsertDocument(collectionName: string) {
  const [db, error] = useMongoDB();

  async function insertDocument(document: any) {
    if (!db) {
      throw new Error('Database connection not established');
    }

    try {
      const collection = db.collection(collectionName);
      await collection.insertOne(document);
      console.log('Document inserted successfully');
    } catch (err) {
      console.error('Failed to insert document', err);
      throw err;
    }
  }

  return insertDocument;
}

export { useMongoDB, useInsertDocument };
