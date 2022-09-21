import { DataStore, Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
import { User } from "../models";

Amplify.configure(awsconfig);

export class UserStorage {
  static async createUserData(newUser) {
    const userInformation = {
      user_id: newUser.user_id,
      email: newUser.email,
      username: newUser.username,
      posts: [],
      friends: [],
      comments: [],
      friend_requests: [],
    };
    const userModel = new User(userInformation);
    await DataStore.save(userModel);
  }
  static async loadUserInformation() {
    const data = await DataStore.query(User);
    return data;
  }
  static async deleteUserData(userToDelete) {
    // TODO: Test delete method
    const userModel = await DataStore.query(User, userToDelete.id);
    DataStore.delete(userModel);
  }
}
