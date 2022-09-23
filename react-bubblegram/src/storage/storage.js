import { DataStore, Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
import { Post, User } from "../models";

Amplify.configure(awsconfig);
export class UserStorage {
  static async createUserData(newUser) {
    const userInformation = {
      user_id: newUser.user_id,
      email: newUser.email,
      username: newUser.username,
    };
    const userModel = new User(userInformation);
    await DataStore.save(userModel);
  }
  static async loadUserInformation(userId) {
    const retrievedUser = await DataStore.query(User, userId);
    return retrievedUser;
  }
  static async deleteUserData() {
    // TODO: implement this code if have time
  }
  static async addFriendToFriendList(userId, friendId) {
    const userModel = await DataStore.query(User, userId);
    const friendModel = await DataStore.query(User, friendId);

    let newFriendList = userModel.friends;
    // checks if the data exists
    if (!newFriendList) {
      newFriendList = [];
    }
    const friendList = [...newFriendList, friendModel.id];

    await updateChanges(userModel, friendList);
    return friendList;
    /*=-=-=-=-=-=-= Helper Function =-=-=-=-=-=-=*/
    async function updateChanges(userModel, newFriendList) {
      await DataStore.save(
        User.copyOf(userModel, (updated) => {
          updated.friends = newFriendList;
        })
      );
    }
  }
  static async close() {
    DataStore.clear();
  }
}
export class PostStorage {
  static async storePostToOwnerData(sender, post) {
    const newPost = {
      title: post.title,
      picture_url: post.picture_url,
      likes: 0,
      owner: sender,
    };
    const newPostModel = new Post(newPost);
    mapPostToUser(sender, newPostModel);

    /*=-=-=-=-=-=-= Helper functions =-=-=-=-=-=-=-=-=-=*/
    async function mapPostToUser(sender, postModel) {
      const hasPost = typeof sender.posts == "undefined";
      let newPostHistory = sender.posts;
      if (!hasPost) {
        newPostHistory = [];
      }
      newPostHistory.push(postModel);
      await DataStore.save(
        User.copyOf(sender, (updated) => {
          updated.posts = newPostHistory;
        })
      );
    }
  }
  static async likePost(post) {
    const postModel = await DataStore.query(Post, post.id);
    const newLike = postModel.likes + 1;
    await DataStore.save(
      Post.copyOf(postModel, (updated) => {
        updated.likes = newLike;
      })
    );
  }
  static async retrieveLikes(post) {
    const postId = post.id;
    const postModel = await DataStore.query(Post, postId);
    const amountOfLikes = postModel.likes;
    return amountOfLikes;
  }
}
