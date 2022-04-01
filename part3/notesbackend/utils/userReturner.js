const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const usersReturner = (req, res, next) => {
  const token = getTokenFrom(req)
  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if(!decodedToken.id){
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const { id: userId } = decodedToken
  console.log(userId)
  req.userId = userId

  next()
}

module.exports = usersReturner