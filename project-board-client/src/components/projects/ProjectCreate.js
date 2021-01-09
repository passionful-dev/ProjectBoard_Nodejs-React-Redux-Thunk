import React, { Component } from 'react'
import { connect } from "react-redux";
import { createProject } from '../../store/actions/projectActions';
import { Redirect } from 'react-router-dom'
import { createNotification } from '../../store/actions/notificationActions';

export class ProjectCreate extends Component {
  state = {
    title: '',
    content: ''
    // ,
    // userId: 2 //put this value from login
  }

  componentDidMount() {
    this.setState({ userId: this.props.userId })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();    
    this.props.createProject(this.state);

    let notification = {
      content: 'Added a new project!!!!',
      userIdOrEmail: this.props.userId
    }
    this.props.createNotification(notification)
    this.props.history.push('/')
  }

  render() {
    // Route Guarding
    const { userId } = this.props
    if (!userId) return <Redirect to='/signin' />

    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create new Project</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="content">Project Content</label>
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
          </div>
          <div className="input-field">
            <button className="btn pink accent-3 z-depth-0">Create</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('state', state)
  const userId = (state.auth.length > 0) ? state.auth[0].userId : null
  // console.log('userId', userId);
  return {
    userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project)),
    createNotification: (notification) => dispatch(createNotification(notification))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreate)
