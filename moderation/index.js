const express = require('express')
const app = express()
const { default: axios } = require('axios')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.post('/events', async (req, res) => {
  const { type, data } = req.body
  switch (type) {
    case 'CommentCreated':
      {
        const status = data.content.includes('orange') ? 'rejected' : 'approved'
        await axios.post('http://localhost:4005/events', {
          type: 'CommentModerated',
          data: {
            ...data,
            status,
          },
        })
      }
      break
    default:
      break
  }
  return res.send({})
})

app.listen(4003, () => {
  console.log('Listening on 4003')
})
