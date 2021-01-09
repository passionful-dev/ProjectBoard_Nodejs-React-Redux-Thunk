export const LIST_PROJECTS = 'LIST_PROJECTS'
export const CREATE_PROJECT = 'CREATE_PROJECT'

export const createProject = (project) => {
  return (dispatch, getState) => {
    // const project = getState().project
    // make async call to db
    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(project)
    })
      .then(() => {
        dispatch({ type: CREATE_PROJECT });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_PROJECT_ERROR', err });
      })
  }
};

export const listProjects = () => {
  return (dispatch) => {
    // make async call to db
    fetch('http://localhost:5000/projects/all/userFullname')
      .then(res => res.json())
      .then((projects) => {
        dispatch({ type: LIST_PROJECTS, payload: projects });
      })
      .catch((err) => {
        dispatch({ type: 'PROJECT_LIST_ERROR', err });
      })
  }
};
