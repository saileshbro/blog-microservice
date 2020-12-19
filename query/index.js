const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(require('cors')())
app.use(bodyParser.json())
const posts = {}
app.get('/posts', (req, res) => {
  return res.send(posts)
})
app.post('/events', (req, res) => {
  const { type, data } = req.body
  switch (type) {
    case 'PostCreated':
      {
        const { id, title } = data
        posts[id] = { id, title, comments: [] }
      }
      break
    case 'CommentCreated':
      {
        const { id, content, postId } = data
        posts[postId].comments.push({
          id,
          content,
        })
      }
      break
    default:
      break
  }
  return res.send({})
})
app.listen(4002, () => console.log('Listening on 4002'))
