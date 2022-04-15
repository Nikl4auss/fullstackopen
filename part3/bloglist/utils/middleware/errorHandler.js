const errorHandler = (error, request, response, next) => {
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
    else if (error.name === 'MongoServerError' && error.code === 11000) {
      return response
        .status(500)
        .send({ success: false, message: 'Username already exists!' })
    }
  
    next(error)
}

module.exports = errorHandler