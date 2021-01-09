import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list section">
      {/* <ProjectSummary />
      <ProjectSummary />
      <ProjectSummary />
      <ProjectSummary />       */}

      {/* {projects && projects.map(project => {
        return (
          <ProjectSummary project={project} key={project.id}/>
        )
      })} */}

      {
        projects.length ? (
          projects.map(project => {  
            
            return (
              
              <Link to={'/projects/' + project.projectsId} key={project.projectsId}>
                <ProjectSummary project={project} />                    
              </Link>
            )
          })
        ) : (
            <p>Loading...</p>
          )
      }

    </div>
  )
}

export default ProjectList
