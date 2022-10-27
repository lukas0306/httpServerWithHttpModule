import http from 'http'

const IP = '127.0.0.1'
const PORT = 8000
const users = [
  {
    id: 1,
    name: 'Rebekah Johnson',
    email: 'Glover12345@gmail.com',
    password: '123qwe'
  },
  {
    id: 2,
    name: 'Fabian Predovic',
    email: 'Connell29@gmail.com',
    password: 'password'
  }
]

const posts = [
  {
    id: 1,
    title: '간단한 HTTP API 개발 시작!',
    content: 'Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.',
    userId: 1
  },
  {
    id: 2,
    title: 'HTTP의 특성',
    content: 'Request/Response와 Stateless!!',
    userId: 1
  }
]
const server = http.createServer()

const httpRequestListener = (req, res) => {
  const { url, method } = req

  if (url === '/ping') {
    if (method === 'GET') {
      console.log(123)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'pong' }))
    }
  } else if (url === '/users/signup') {
    if (method === 'POST') {
      let body = ''

      req.on('data', (signupData) => {
        body += signupData
      })

      req.on('end', () => {
        const user = JSON.parse(body)

        users.push({
          id: user.id,
          name: user.name,
          email: user.eamil,
          passwrod: user.passwrod
        })
      })
      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'userCreated' }))
    }
  }
}

server.on('request', httpRequestListener)

server.listen(PORT, IP, () => {
  console.log(`Listening to requests on ip ${IP} & port ${PORT}`)
})
