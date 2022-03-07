const _ = require('lodash')

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

const dummy = (array) => {
    return 1
}

const totalLikes = array => {
    return array.length === 0
    ? 0
    : array.reduce((acc, ele) => acc + ele.likes, 0)
}

const favoriteBlog = array => {
    let maxLikes = Math.max(...array.map(ele => ele.likes))
    return array.find(ele => ele.likes === maxLikes)
}


const most = (array, value, counterName) => {
    const authors = _.countBy(array, value)
    const max = Math.max(...Object.values(authors))
    for(let author in authors){
        if(authors[author] === max){
            return {
                author,
                [counterName]: authors[author]
            }
        }
    }
}

const mostBlogs = array => {
    return most(array, 'author', 'blogs')
 }

const mostLikes = array => {
    const authors = _.groupBy(array, 'author')
    for(let author in authors){
        authors[author] = authors[author].reduce((acc, ele) => acc + ele.likes, 0)
    }
    const max = Math.max(...Object.values(authors))
    for(let author in authors){
      if(authors[author] === max){
        return {
          author,
          likes: max
        }
      }
    }
}

console.log(mostLikes(blogs))
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}