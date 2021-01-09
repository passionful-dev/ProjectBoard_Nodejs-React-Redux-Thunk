const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const projectRoutes = require('./routes/projectRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
var session = require('express-session');

const app = express()


// middleware and static files
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use(cors())
app.use(express.json())


// Session Setup 
app.use(session({ 
  
  // It holds the secret key for session 
  secret: 'A_Secret_Key', 

  // Forces the session to be saved 
  // back to the session store 
  resave: true, 

  // Forces a session that is "uninitialized" 
  // to be saved to the store 
  saveUninitialized: true
})) 


app.listen(5000, () => {
  console.log("server has started on port 5000")
})


// routes
app.use('/users', userRoutes)
app.use('/projects', projectRoutes)
app.use('/notifications', notificationRoutes)

app.use(async (req, res) => {
  try {
    res.status(404)
    res.json("Unrecognized address!")
  } catch (err) {
    console.error(err.message)
  }
})
