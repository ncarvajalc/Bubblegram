import React from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../styles/Bubble.css"

function Bubble({ post }) {

  function handleLike () {
    console.log(`liked post #${post.id}`)
  }

  function handlePop () {
    console.log(`popped post #${post.id}`)
  }

  return (
    <div className="bubble">
      <div className="img-background">
        <img className="bubble-img" src={post.picture_url}/>
      </div>
      <div className="card-content">
        <Typography variant="body2" color="text.secondary">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.likes} likes
        </Typography>
      </div>
      <div className="card-actions">
        <Button size="small" onClick={handleLike}>Like</Button>
        <Button size="small" onClick={handlePop}>Pop</Button>
      </div>
    </div>
  )
}

export default Bubble