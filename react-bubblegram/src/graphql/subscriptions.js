/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
export const onCreateFriendRequest = /* GraphQL */ `
  subscription OnCreateFriendRequest {
    onCreateFriendRequest {
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
export const onUpdateFriendRequest = /* GraphQL */ `
  subscription OnUpdateFriendRequest {
    onUpdateFriendRequest {
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
export const onDeleteFriendRequest = /* GraphQL */ `
  subscription OnDeleteFriendRequest {
    onDeleteFriendRequest {
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
