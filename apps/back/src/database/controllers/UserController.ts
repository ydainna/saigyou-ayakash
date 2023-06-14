import UserModel from "../models/UserModel";

// User controller
export namespace UserController {
  export async function findById(id: number) {
    return UserModel.findOne({ id }, { _id: 0, __v: 0 });
  }
}
