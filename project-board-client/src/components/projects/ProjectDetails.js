import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Redirect } from 'react-router-dom'


const ProjectDetails = (props) => {
  // console.log(props);
  // const id = props.match.params.id;  

  const { project, userId } = props

  // console.log('userId from here: ', userId);
  // Route Guarding
  // const {userId} = this.props
  if(!userId) return <Redirect to='/signin' />

  if (project) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <p>{project.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {project.firstName} {project.lastName}</div>
            <div>{moment(project.createdDateTime).format(('dddd, MMMM Do, YYYY h:mm:ss A'))}</div>
            
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log('state: ', state)
  const id = ownProps.match.params.id
  const projects = state.project
  const project = projects ?
    projects.find(project => project.projectsId == id) :
    null
  // console.log(project)

  const userId = (state.auth.length > 0) ? state.auth[0].userId : null
  // console.log('userId', userId);
  return {
    project: project,
    userId
  }
}

export default connect(mapStateToProps)(ProjectDetails)
