/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      email
      username
      posts {
        nextToken
        startedAt
      }
      friends {
        nextToken
        startedAt
      }
      comments {
        nextToken
        startedAt
      }
      friend_requests {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userFriendsId
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      email
      username
      posts {
        nextToken
        startedAt
      }
      friends {
        nextToken
        startedAt
      }
      comments {
        nextToken
        startedAt
      }
      friend_requests {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userFriendsId
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      email
      username
      posts {
        nextToken
        startedAt
      }
      friends {
        nextToken
        startedAt
      }
      comments {
        nextToken
        startedAt
      }
      friend_requests {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userFriendsId
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      title
      picture_url
      likes
      owner {
        id
        email
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userFriendsId
      }
      comments {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userPostsId
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      title
      picture_url
      likes
      owner {
        id
        email
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userFriendsId
      }
      comments {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userPostsId
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      title
      picture_url
      likes
      owner {
        id
        email
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userFriendsId
      }
      comments {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userPostsId
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      post {
        id
        title
        picture_url
        likes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userPostsId
      }
      content
      creator {
        id
        email
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userFriendsId
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userCommentsId
      postCommentsId
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      post {
        id
        title
        picture_url
        likes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userPostsId
      }
      content
      creator {
        id
        email
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userFriendsId
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userCommentsId
      postCommentsId
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      post {
        id
        title
        picture_url
        likes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userPostsId
      }
      content
      creator {
        id
        email
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userFriendsId
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userCommentsId
      postCommentsId
    }
  }
`;
export const createFriendRequest = /* GraphQL */ `
  mutation CreateFriendRequest(
    $input: CreateFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    createFriendRequest(input: $input, condition: $condition) {
      id
      sender {
        id
        email
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userFriendsId
      }
      receiver {
        id
        email
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userFriendsId
      }
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userFriend_requestsId
    }
  }
`;
export const updateFriendRequest = /* GraphQL */ `
  mutation UpdateFriendRequest(
    $input: UpdateFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    updateFriendRequest(input: $input, condition: $condition) {
      id
      sender {
        id
        email
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userFriendsId
      }
      receiver {
        id
        email
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userFriendsId
      }
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userFriend_requestsId
    }
  }
`;
export const deleteFriendRequest = /* GraphQL */ `
  mutation DeleteFriendRequest(
    $input: DeleteFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    deleteFriendRequest(input: $input, condition: $condition) {
      id
      sender {
        id
        email
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userFriendsId
      }
      receiver {
        id
        email
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userFriendsId
      }
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userFriend_requestsId
    }
  }
`;