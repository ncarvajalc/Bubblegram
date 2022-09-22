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
      posts: [null],
    };
    const userModel = new User(userInformation);
    await DataStore.save(userModel);
  }
  static async loadUserInformation(userId) {
    const retrievedUser = await DataStore.query(User, userId);
    return retrievedUser;
  }
  static async deleteUserData(userToDelete) {
    const userModel = await DataStore.query(User, userToDelete.id);
    DataStore.delete(userModel);
  }
  static async loadAll() {
    const loadedValue = await DataStore.query(User);
    console.log(loadedValue);
  }
}
export class PostStorage {
  static async storePost(sender, post) {
    const newPost = {
      title: post.title,
      picture_url: post.picture_url,
      likes: 0,
      owner: sender,
    };
    const newPostModel = new Post(newPost);
    await DataStore.save(newPostModel);
    mapPostToUser(sender, newPostModel);
    async function mapPostToUser(sender, postModel) {
      const hasNoPost = typeof sender.posts == "undefined";
      let newPostHistory = sender.posts;
      if (hasNoPost) {
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
  static async sortPostById() {
    const getData = await DataStore.query(User);
    console.log(getData);
  }
  static async likePost(post) {
    const postToLike = await DataStore.query(Post, post.id);
    await DataStore.save(
      Post.copyOf(postToLike, (updated) => {
        updated.likes = postToLike.likes + 1;
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
