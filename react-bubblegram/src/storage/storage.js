import { DataStore, Amplify, API } from "aws-amplify";
import awsconfig from "../aws-exports";
import { Post, User } from "../models";

import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";
import * as subscriptions from "../graphql/subscriptions";

Amplify.configure(awsconfig);

export class UserStorage {
    static async createUserData(newUser) {
        const userInformation = {
            user_id: newUser.user_id,
            email: newUser.email,
            username: newUser.username,
        }
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
        const hasFriends = typeof(newFriendList) === 'undefined';
        if (!hasFriends) {
            newFriendList = [];
        }
        newFriendList.push(friendModel);
        updateFriendListRealTime(userId, newFriendList);
        updateFriendListOffline(userModel, newFriendList);

        /*=-=-=-=-=-=-= Helper functions =-=-=-=-=-=-=-=-=-=*/
        async function updateFriendListRealTime(userId, friendList) {
            const updatedFriendDetails = {
                id: userId,
                friends: friendList
            }
            await API.graphql(
                { query: mutations.updateUser, variables: { input: updatedFriendDetails }
            });
        }
        async function updateFriendListOffline(userModel, newFriendList) {
            await DataStore.save(
                User.copyOf(userModel, updated => {
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
            owner: sender
        };
        const newPostModel = new Post(newPost);
        mapPostToUser(sender, newPostModel);

        /*=-=-=-=-=-=-= Helper functions =-=-=-=-=-=-=-=-=-=*/
        async function mapPostToUser(sender, postModel) {
            const hasPost = typeof(sender.posts) == 'undefined';
            let newPostHistory = sender.posts;
            if (!hasPost) {
                newPostHistory = [];
            }
            newPostHistory.push(postModel);
            await DataStore.save(
                User.copyOf(sender, updated => {
                    updated.posts = newPostHistory;
                })
            )
        }
    }
    static async likePost(post) {
        const postModel = await DataStore.query(Post, post.id);
        console.log(postModel);
        const newLike = postModel.likes + 1;
        const updatedPost = await DataStore.save(
            Post.copyOf(postModel, updated => {
                updated.likes = newLike
            })
        );
    }
  static async retrieveLikes(post) {
    const postId = post.id;
    const postModel = await DataStore.query(Post, postId);
    const amountOfLikes = postModel.likes;
    console.log(postModel);
    return amountOfLikes;
  }
}
