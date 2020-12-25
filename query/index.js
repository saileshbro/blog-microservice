const express = require('express')
const { default: axios } = require('axios')
const bodyParser = require('body-parser')
const app = express()
app.use(require('cors')())
app.use(bodyParser.json())
const posts = {}
const handleEvent = (type, data) => {
  switch (type) {
    case 'PostCreated':
      {
        const { id, title } = data
        posts[id] = { id, title, comments: [] }
      }
      break
    case 'CommentCreated':
      {
        const { id, content, postId, status } = data
        posts[postId].comments.push({
          id,
          content,
          status,
        })
      }
      break
    case 'CommentUpdated':
      {
        const { id, content, postId, status } = data
        const post = posts[postId]
        const comment = post.comments.find(comment => comment.id == id)
        comment.status = status
        comment.content = content
      }
      break
    default:
      break
  }
}
app.get('/posts', (req, res) => {
  return res.send(posts)
})
app.post('/events', (req, res) => {
  const { type, data } = req.body
  handleEvent(type, data)
  return res.send({})
})
app.listen(4002, async () => {
  console.log('Listening on 4002')
  const res = await axios.get('http://event-bus-srv:4005/events')
  for (const { type, data } of res.data) {
    console.log(`Processing Event: ${type}`)
    handleEvent(type, data)
  }
})
