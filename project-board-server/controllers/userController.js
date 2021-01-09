const express = require('express')
const bcrypt = require('bcrypt')
const pool = require('../database/db')
const { DateTime } = require('luxon')
const { v4: uuidv4 } = require('uuid')


const app = express()

// add user
//localhost:5000/users/
const create = async (req, res) => {
  try {
    userId = uuidv4()

    // For current timestamp
    // createdDateTime = DateTime.utc().toLocal().toLocaleString(DateTime.DATETIME_SHORT) // 21/12/2020, 12:12 PM
    createdDateTime = DateTime.utc().toLocal().toString()

    const { firstName, lastName, email, userPassword } = req.body

    // For password hashing
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(userPassword, saltRounds)

    const newUser = await pool.query(
      "INSERT INTO siteusers (userId, firstName, lastName, email, userPassword, createdDateTime) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, firstName, lastName, email, hashedPassword, createdDateTime]
    )

    res.json({
      'userId': userId,
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'createdDateTime': createdDateTime
    })
    // res.json("New user added!")

  } catch (err) {
    console.error(err.message)
  }
}

// get all user
//localhost:5000/users/
const all = async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT * FROM siteusers ORDER BY createdDateTime DESC"
    )
    res.json(users[0])
  } catch (err) {
    console.error(err.message)
  }
}

// single user
//localhost:5000/users/:id
const single = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await pool.query(
      "SELECT * FROM siteusers WHERE userId = ?", [id]
    )
    res.json(user[0])
  } catch (err) {
    console.error(err.message)
  }
}

// update user
//localhost:5000/users/:id
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, userPassword } = req.body

    // For password hashing
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(userPassword, saltRounds)

    const user = await pool.query(
      "UPDATE siteusers SET firstName = ?, lastName = ?, email = ?, userPassword = ? WHERE userId = ?",
      [firstName, lastName, email, hashedPassword, id]
    )
    res.json({
      'userId': id,
      'firstName': firstName,
      'lastName': lastName,
      'email': email
    })
    // res.json("User updated!")
  } catch (err) {
    console.error(err.message)
  }
}

// delete user
//localhost:5000/users/:id
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await pool.query(
      "DELETE FROM siteusers WHERE userId = ?",
      [id]
    )
    res.json(`User id: ${id}, is deleted!`)
  } catch (err) {
    console.error(err.message)
  }
}

// signInWithAllUserInfo
//localhost:5000/users/all/signIn
const signIn = async (req, res, next) => {
  try {
    const { email, userPassword } = req.body;

    const data = await pool.query(
      "SELECT * FROM siteusers \
      WHERE email = ?", email
    )

    // check if the email is in db
    if (data[0].length > 0) {

      const compareUserPasswordToHashedPassword = await bcrypt.compare(userPassword, data[0][0].userPassword)

      // if the password is correct
      if (compareUserPasswordToHashedPassword) {
        // res.json(userHashedPassword[0])
        
        //send all data except password
        res.json({'userId': data[0][0].userId,
        'firstName': data[0][0].firstName,
        'lastName': data[0][0].lastName,
        'email': data[0][0].email,
        'createdDateTime': data[0][0].createdDateTime})
        
        // session data
        sess = req.session
        sess.loggedin = true
        sess.userId = data[0][0].userId
        // console.log('sess.userId: ', req.session.userId)
        sess.save()
        
        // res.json("login success")
        console.log("login success")
      }
      else {
        res.status(401).end()
        console.log('password incorrect')
        // res.error('password incorrect')
        // res.json('password incorrect') 
        // throw new Error('password incorrect')       
      }
    }
    else {
      res.status(401).end()
      console.log('email or password incorrect')
      // res.json('email or password incorrect')
      // throw new Error('email or password incorrect')
    }

  } catch (err) {
    console.error(err.message)
  }
}

// sign Out user
//localhost:5000/users/all/signOut
const signOut = async (req, res) => {
  try {

    // session data
    req.session.destroy(() => {
      console.log("User logged out.")
      res.json("User is logged out!")
    });
        
  } catch (err) {
    console.error(err.message)
  }
}


module.exports = {
  all,
  create,
  single,
  update,
  remove,
  signIn,
  signOut
}