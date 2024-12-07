import mongoose, { Document, Model, Schema } from "mongoose";
import { UserModel } from "../entities";


const UserSchema: Schema = new Schema<UserModel>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: false },
        email: { type: String, required: true, unique: true },
        phone: {type: String, required: true},
        password: { type: String, required: true },
        favourite: { type: [String], default: [], required:false }
    }, { timestamps: true }
)
const UserDBModel: Model<UserModel> = mongoose.models.User || mongoose.model('User',UserSchema);
export default UserDBModel;