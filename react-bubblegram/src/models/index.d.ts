import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CommentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FriendRequestMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly email: string;
  readonly username: string;
  readonly posts?: (Post | null)[] | null;
  readonly friends?: (User | null)[] | null;
  readonly comments?: (Comment | null)[] | null;
  readonly friend_requests?: (FriendRequest | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userFriendsId?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Post {
  readonly id: string;
  readonly title?: string | null;
  readonly picture_url: string;
  readonly likes?: number | null;
  readonly owner?: User | null;
  readonly comments?: (Comment | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Post, PostMetaData>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}

export declare class Comment {
  readonly id: string;
  readonly post?: Post | null;
  readonly content: string;
  readonly creator?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Comment, CommentMetaData>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment, CommentMetaData>) => MutableModel<Comment, CommentMetaData> | void): Comment;
}

export declare class FriendRequest {
  readonly id: string;
  readonly sender: User;
  readonly receiver: User;
  readonly isAccepted?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<FriendRequest, FriendRequestMetaData>);
  static copyOf(source: FriendRequest, mutator: (draft: MutableModel<FriendRequest, FriendRequestMetaData>) => MutableModel<FriendRequest, FriendRequestMetaData> | void): FriendRequest;
}