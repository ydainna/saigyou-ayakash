import { Document, model, Schema } from "mongoose";

// Interface for the User model (type of the document)
interface IUser {
  username: string;
  password: string;
  displayName: string;
}

// User schema
const UserSchema = new Schema<IUser & Document>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
});

// User model
const UserModel = model<IUser & Document>("User", UserSchema);

export default UserModel;
export { IUser };
