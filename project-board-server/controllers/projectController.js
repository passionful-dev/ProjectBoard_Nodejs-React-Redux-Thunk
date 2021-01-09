const express = require('express')
const pool = require('../database/db')
const { DateTime } = require('luxon')
const { v4: uuidv4 } = require('uuid')
const router = express.Router()

const app = express()


// add project
//localhost:5000/projects/
const create = async (req, res) => {
  try {
    projectsId = uuidv4()

    // For current timestamp
    createdDateTime = DateTime.utc().toLocal().toString() //2021-01-05T17:36:36.497+01:00
    
    const { title, content, userId } = req.body 

    const newProject = await pool.query(
      "INSERT INTO projects (projectsId, title, content, userId, createdDateTime) VALUES (?, ?, ?, ?, ?)",
      [projectsId, title, content, userId, createdDateTime]
    )
    
    res.json({'projectsId': projectsId, 
              'title': title, 
              'content': content, 
              'userId': userId, 
              'createdDateTime': createdDateTime
            })
    
  } catch (err) {
    console.error(err.message)
  }
}

// get all project
//localhost:5000/projects/
const all = async (req, res) => {
  try {
    const projects = await pool.query(
      "SELECT * FROM projects ORDER BY createdDateTime DESC"
    )
    res.json(projects[0])
  } catch (err) {
    console.error(err.message)
  }
}

// single project
//localhost:5000/projects/:id
const single = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await pool.query(
      "SELECT * FROM projects WHERE projectsId = ?", [id]
    )
    res.json(project[0])
  } catch (err) {
    console.error(err.message)
  }
}

// update project
//localhost:5000/projects/:id
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, userId } = req.body 

    const project = await pool.query(
      "UPDATE projects SET title = ?, content = ?, userId = ? WHERE projectsId = ?", 
      [title, content, userId, id]
    )
    
    res.json({'projectsId': id, 
              'title': title, 
              'content': content, 
              'userId': userId
            })
    // res.json(req.body)
    // res.json("Project updated!")
  } catch (err) {
    console.error(err.message)
  }
}

// delete project
//localhost:5000/projects/:id
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    
    const project = await pool.query(
      "DELETE FROM projects WHERE projectsId = ?", 
      [id]
    )
    res.json(`Project id: ${id} is deleted!`)
  } catch (err) {
    console.error(err.message)
  }
}

// get all projects with user full name
//localhost:5000/projects/all/userFullname
const allProjectsWithUserFullname = async (req, res) => {
  try {
    const projects = await pool.query(
      "SELECT \
      projectsId, title, content, firstName, lastName, t1.createdDateTime \
      FROM projects t1 \
      INNER JOIN siteusers t2 \
      ON t1.userId = t2.userId \
      ORDER BY t1.createdDateTime DESC \
      LIMIT 7"
    )
    res.json(projects[0])
  } catch (err) {
    console.error(err.message)
  }
}

// get particular project with user full name
//localhost:5000/projects/:id/user/:userId/userFullname
const singleProjectWithUserFullname = async (req, res) => {
  try {
    const { id, userId } = req.params;

    const project = await pool.query(
      "SELECT \
      projectsId, title, content, firstName, lastName, t1.createdDateTime \
      FROM projects t1 \
      INNER JOIN siteusers t2 \
      ON t1.userId = t2.userId \
      WHERE t1.projectsId = ? \
      AND t2.userId = ?", 
      [id, userId]
    )
    res.json(project[0])
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
  allProjectsWithUserFullname,
  singleProjectWithUserFullname
}