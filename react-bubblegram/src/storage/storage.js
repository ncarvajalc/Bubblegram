import { DataStore, Amplify, Predicates } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { Post, User } from '../models';


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
            friend_requests: []
        }
        const userModel = new User(userInformation);
        await DataStore.save(userModel);
    }
    static async loadUserInformation() {
        const data = await DataStore.query(User);
        console.log(data);
    }
    static async deleteUserData(userToDelete) {
        const userModel = await DataStore.query(User, userToDelete.id);   
        DataStore.delete(userModel);
    }
}
export class PostStorage {
    static async upload(newUserPost) {
        const newPost = {
            title: newUserPost.title,
            picture_url: newUserPost.picture_url,
            likes: 0,
            owner: newUserPost.ownerId,
            comments: []
        };
        await DataStore.save(new Post(newPost));
        trackPost(newUserPost);
        function trackPost(post) {
            const original = DataStore.query(User, post.owner);
            DataStore.save(
                User.copyOf(original, updated => {
                    updated.posts.push(post);
                })
            )
        }
    }
}
