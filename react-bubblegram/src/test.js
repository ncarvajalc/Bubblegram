import { UserStorage, PostStorage } from './storage/storage';
import { User, Post } from './models';
import { DataStore } from 'aws-amplify';

export class TestRunner {
    static async run() {
        const testData = {
            title: "test",
            picture_url: "test@test.com"
        }
        const testModel = new Post(testData);
        const place = [];
        const testPost = await DataStore.query(Post);
        console.log(testPost);
        //PostStorage.likePost(testPost);
    }
}