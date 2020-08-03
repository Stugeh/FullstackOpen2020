const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17ff",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        user: "5a422a851b54a676234d17f7",
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17fd",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        user: "5a422a851b54a676234d17f8",
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17af",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        user: "5a422a851b54a676234d17f7",
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
        likes: 10,
        user: "5a422a851b54a676234d17f7",
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        user: "5a422a851b54a676234d17f9",
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        user: "5a422a851b54a676234d17f8",
        __v: 0
    }
]

const initialUsers = [
    {
        _id: "5a422a851b54a676234d17f7",
        username: 'Stugeh',
        name: 'Tuukka',
        passwordHash: '$2y$10$zT20Mnpv3DSB0.L4eeb/OOrV.urp2/GZQOEeov4L98P8BSW9nsOvm',
        blogs: ["5a422a851b54a676234d17ff", "5a422b3a1b54a676234d17af", "5a422b891b54a676234d17fa"]
    },
    {
        _id: "5a422a851b54a676234d17f8",
        username: 'AnotherUser',
        name: 'Name',
        passwordHash: '$2y$10$zT20Mnpv3DSB0.L4eeb/OOrV.urp2/GZQOEeov4L98P8BSW9nsOvm',
        blogs: ["5a422aa71b54a676234d17fd", "5a422bc61b54a676234d17fc"]
    },
    {
        _id: "5a422a851b54a676234d17f9",
        username: 'ThirdOne',
        name: 'Steve',
        passwordHash: '$2y$10$zT20Mnpv3DSB0.L4eeb/OOrV.urp2/GZQOEeov4L98P8BSW9nsOvm',
        blogs: ["5a422ba71b54a676234d17fb"]
    }
]

module.exports = { initialBlogs, initialUsers }
