import { DataStore, Amplify, API } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { Post, User } from '../models';

import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';

Amplify.configure(awsconfig);

export class UserStorage {
    static async createUserData(newUser) {
        const userInformation = {
            user_id: newUser.user_id,
            email: newUser.email,
            username: newUser.username,
            posts: [null]
        }
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
    static async addFriendToFriendList(user, friend) {

    }
}
export class PostStorage {
    static async storePost(sender, post) {
        const newPost = {
            title: post.title,
            picture_url: post.picture_url,
            likes: 0,
            owner: sender
        };
        const newPostModel = new Post(newPost);
        await DataStore.save(newPostModel);
        mapPostToUser(sender, newPostModel);
        async function mapPostToUser(sender, postModel) {
            const hasNoPost = typeof(sender.posts) == 'undefined';
            let newPostHistory = sender.posts;
            if (hasNoPost) {
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
        const updateDetails = {
            id: post.id,
            likes: post.likes + 1
        }
        const updatePostDetails = await API.graphql(
            { query: mutations.updatePost, variables: { input: updateDetails}}
        )
        updateOffline(post);
        async function updateOffline(post) {
            const postModel = await DataStore.query(Post, post.id);
            const newLikes = postModel.likes + 1;
            const updatedPost = await DataStore.save(
                Post.copyOf(postModel, updated => {
                    updated.likes = newLikes
                })
            );
        }
    }
    static async retrieveLikes(post) {
        const postId = post.id;
        const postModel = await DataStore.query(Post, postId);
        const amountOfLikes = postModel.likes;
        return amountOfLikes;
    }
}