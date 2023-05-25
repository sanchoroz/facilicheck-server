import mongoose from 'mongoose';
import Garden from './models/garden-model.js'
import 'dotenv/config';

const dburl = process.env.DBHOST

mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const setupDatabase = async () => {
  try {
    await Garden.deleteMany();

    // const users = [
    //   { name: 'John Doe', email: 'john@example.com', password: 'password1' },
    //   { name: 'Jane Smith', email: 'jane@example.com', password: 'password2' },
    // ];

    // // Insert test data into the 'users' collection
    // await Garden.insertMany(users);
    console.log('dburl: ',dburl);
    console.log('Database setup completed successfully.');
  } catch (error) {
    console.error('Database setup error:', error);
  } finally {
    mongoose.connection.close();
  }
};

setupDatabase();