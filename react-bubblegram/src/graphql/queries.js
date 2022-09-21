/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      username
      posts {
        items {
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
        nextToken
        startedAt
      }
      friends {
        items {
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
        nextToken
        startedAt
      }
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userCommentsId
          postCommentsId
        }
        nextToken
        startedAt
      }
      friend_requests {
        items {
          id
          isAccepted
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userFriend_requestsId
        }
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      picture_url
      likes
      owner {
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
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userCommentsId
          postCommentsId
        }
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncPosts = /* GraphQL */ `
  query SyncPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPosts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      post {
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
      content
      creator {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncComments = /* GraphQL */ `
  query SyncComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncComments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getFriendRequest = /* GraphQL */ `
  query GetFriendRequest($id: ID!) {
    getFriendRequest(id: $id) {
      id
      sender {
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
      receiver {
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
      isAccepted
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userFriend_requestsId
    }
  }
`;
export const listFriendRequests = /* GraphQL */ `
  query ListFriendRequests(
    $filter: ModelFriendRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriendRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        isAccepted
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userFriend_requestsId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncFriendRequests = /* GraphQL */ `
  query SyncFriendRequests(
    $filter: ModelFriendRequestFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFriendRequests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
        isAccepted
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userFriend_requestsId
      }
      nextToken
      startedAt
    }
  }
`;
