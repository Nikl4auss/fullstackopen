const _ = require('lodash')

const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
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