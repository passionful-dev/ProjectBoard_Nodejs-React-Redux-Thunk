import React from 'react'
import moment from 'moment'

const ProjectSummary = ({project}) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        {/* <span className="card-title">Project Title</span> */}
        <span className="card-title">{project.title}</span>
        <p>Posted by {project.firstName} {project.lastName}</p>

        <p className="grey-text">{moment(project.createdDateTime).calendar()}</p>
      </div>
    </div>
  )
}

export default ProjectSummary
