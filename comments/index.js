const express = require('express')
const app = express()
const { randomBytes } = require('crypto')
const { default: axios } = require('axios')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(require('cors')())
const commentsByPostId = {}
app.get('/posts/:id/comments', (req, res) => {
  return res.send(commentsByPostId[req.params.id] || [])
})
app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex')
  const { content } = req.body
  const comments = commentsByPostId[req.params.id] || []
  comments.push({
    id: commentId,
    content,
    status: 'pending',
  })
  commentsByPostId[req.params.id] = comments
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      postId: req.params.id,
      content,
      status: 'pending',
    },
  })
  return res.status(201).send(comments)
})
app.post('/events', async (req, res) => {
  const { type, data } = req.body
  switch (type) {
    case 'CommentModerated':
      {
        const { postId, id, status } = data
        const comments = commentsByPostId[postId]
        const comment = comments.find(comment => comment.id == id)
        comment.status = status
        await axios.post('http://localhost:4005/events', {
          type: 'CommentUpdated',
          data: {
            ...comment,
            postId,
            id,
            status,
          },
        })
      }

      break

    default:
      break
  }
})

app.listen(4001, () => {
  console.log('Listening on 4001')
})
