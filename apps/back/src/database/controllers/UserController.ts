import UserModel from "../models/UserModel";

// User controller
export namespace UserController {
  export async function findById(id: number) {
    return UserModel.findOne({ id }, { _id: 0, __v: 0 });
  }

  export async function findByUsername(username: string) {
    return UserModel.findOne({ username }, { _id: 0, __v: 0 });
  }

  export async function findByScope(scope: string) {
    return UserModel.findOne({ scope }, { _id: 0, __v: 0 });
  }
}
