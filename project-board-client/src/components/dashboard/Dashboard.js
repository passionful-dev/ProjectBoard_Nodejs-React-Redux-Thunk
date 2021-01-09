import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
import Notifications from './Notifications'
import { connect } from 'react-redux'
import { listProjects } from '../../store/actions/projectActions';
import { listNotifications } from '../../store/actions/notificationActions';
import { bindActionCreators } from 'redux';
// import { Redirect } from 'react-router-dom';

export class Dashboard extends Component {
  componentDidMount() {
    this.props.listProjects()
    this.props.listNotifications()
    // console.log(this.props)
  }
  render() {
    // console.log("this.props: ", this.props);

    // const { projects, auth, notifications } = this.props;
    const { projects, notifications } = this.props;

    // if(!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            {/* <ProjectList /> */}
            <ProjectList projects={projects} />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let auth;
  if (state.auth.length > 0) { auth= state.auth[0].userId }
  else { auth= state.auth }
  
  return {
    // projects: state.project.projects
    projects: state.project,
    auth: auth,
    notifications: state.notification
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // listProjects: () => { dispatch(listProjects())}
    listProjects: bindActionCreators(listProjects, dispatch),
    listNotifications: bindActionCreators(listNotifications, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)