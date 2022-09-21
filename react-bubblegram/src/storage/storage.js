import { DataStore, Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { Post, User } from '../models';


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
    static async loadUserInformation() {
        const retrievedUser = await DataStore.query(User);
        return retrievedUser;
    }
    static async deleteUserData(userToDelete) {
        const userModel = await DataStore.query(User, userToDelete.id);   
        DataStore.delete(userModel);
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
    static async show() {
        const userData = DataStore.query(Post);
        console.log(userData);
    }
}