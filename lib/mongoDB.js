import mongoose from 'mongoose'

global.mongoose = {
  conn:null,
  promise:null,
}

export async function connectDb() {
  if(global.mongoose && global.mongoose.conn){
    console.log("connected from previous");
    return global.mongoose.conn;
  }
  else{
    const conString = process.env.MONGODB_URL;
    const promise = mongoose.connect(conString,{
      autoIndex: true
    });

    global.mongoose = {
      conn: await promise,
      promise,
    }
    console.log("Newly connected");

    return await promise;
  }
}

export default connectDb;
// export const connectDb = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL);
//     console.log('DB Connected');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// }

// export default connectDb

