import { useState, useEffect } from "react";
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../graphql/queries';
import "../styles/Feed.css"
import Bubble from "./Bubble"

export default function Feed() {

  const [user, setUser] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    async () => {
      const user = await API.graphql(graphqlOperation(getUser));
      console.log(user)
    }
  }, []);

  //sample data 
  let posts = [
    {id: 1, title: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae", picture_url: "https://picsum.photos/200/300", likes: 24},
    {id: 2, title: "aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui", picture_url: "https://picsum.photos/200/300", likes: 62},
    {id: 3, title: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?", picture_url: "https://picsum.photos/200/300", likes: 36},
    {id: 4, title: "uis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur", picture_url: "https://picsum.photos/200/300", likes: 91},
    {id: 5, title: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium", picture_url: "https://picsum.photos/200/300", likes: 122},
    {id: 6, title: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.", picture_url: "https://picsum.photos/200/300", likes: 37},
    ]
  //sample data

  const userFeed = posts.map(post => {
    return <Bubble 
      key={post.id}
      post={post}
    />
  })

  return (
    <div className="user-feed">
      {userFeed}
    </div>
  );
}
