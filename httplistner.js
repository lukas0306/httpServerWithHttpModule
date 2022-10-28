
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
    userId: 2
  }
]

const usersData = users.map(user => {
  const post = posts.find(post => post.userId === user.id)
  // console.log(post)
  return {
    userId: user.id,
    userName: user.name,
    postingId: post?.id,
    postingTitle: post?.title,
    postingContent: post?.content
  }
})

console.log(usersData)

const httpRequestListener = (req,res) => {
    const { url, method } = req

    if (url === '/ping') {
      if (method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ 'message': 'pong' }))
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
        res.end(JSON.stringify({ 'message': 'userCreated' }))
      }
    }else if (url === '/posts') {
      if (method === 'POST') {
        let body = ''
  
        req.on('data', (postsData) => {
          body += postsData
        })
  
        req.on('end', () => {
          const post = JSON.parse(body)
  
          posts.push({
            id: post.id,
            title: post.title,
            content: post.content,
            userId: post.userId
          })
        })
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ 'message': 'postCreated' }))
      }
    }else if (method === 'POST'){
      if (url === '/userData'){
        let body = ""

        req.on('data', (userData) =>{
          body += userData
        })

        req.on('end', () => {
          const userData = JSON.parse(body)

          usersData.push({ 
            userId: userData.userId,
            userName: userData.userName,
            postingId: userData.postingId,
            postingTitle: userData.postingTitle,
            postingContent: userData.postingContent
          })
        })
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ 'message': usersData}))
      }
    }
}

module.exports = httpRequestListener