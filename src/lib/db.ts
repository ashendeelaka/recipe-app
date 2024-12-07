import mongoose from 'mongoose';

const uri = process.env.MONGO_URL!;
const clientPromise = async() => {
 
    console.log("MongoDB status:", mongoose.connection.readyState);

    if ([1, 2].includes(mongoose.connection.readyState) == false) {
        await mongoose.connect(uri!)
            .then((res) => console.log('Connected to MongoDB'))
            .catch((err) => console.log(err));
    }
};
export default clientPromise;